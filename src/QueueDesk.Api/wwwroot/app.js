"use strict";

(() => {
  const byId = (id) => document.getElementById(id);
  const state = {
    features: null,
    allTickets: [],
    tickets: [],
    queue: "",
    search: "",
    expanded: null,
    listVersion: 0,
    detailVersion: 0,
    creating: false,
    resolving: new Set()
  };
  const featureNames = ["statusFilter", "search", "create", "resolve"];
  const priorityOrder = { high: 0, normal: 1, low: 2 };
  const queueButtons = [...document.querySelectorAll("[data-queue]")];

  class ApiError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
    }
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function icon(name, small = false) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", small ? "icon small" : "icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `#i-${name}`);
    svg.append(use);
    return svg;
  }

  const ticketCode = (id) => `QD-${String(id).padStart(3, "0")}`;
  const label = (value) => value[0].toUpperCase() + value.slice(1);

  function validateTicket(ticket) {
    if (!ticket || !Number.isSafeInteger(ticket.id) || ticket.id < 1 ||
        typeof ticket.title !== "string" ||
        !["open", "resolved"].includes(ticket.status) ||
        !["high", "normal", "low"].includes(ticket.priority)) {
      throw new Error("The API returned an unexpected ticket format. Check the ticket contract before continuing.");
    }
    return ticket;
  }

  function validateList(tickets) {
    if (!Array.isArray(tickets)) {
      throw new Error("The API must return a ticket array. Check the list endpoint and try again.");
    }
    tickets.forEach(validateTicket);
    if (new Set(tickets.map((ticket) => ticket.id)).size !== tickets.length) {
      throw new Error("The API returned duplicate ticket IDs. Check identity allocation before continuing.");
    }
    return tickets;
  }

  async function request(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: { Accept: "application/json", ...options.headers },
      cache: "no-store",
      signal: AbortSignal.timeout(12000)
    });
    const text = await response.text();
    let data;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        throw new ApiError(`The server returned a non-JSON response (${response.status}). Check the endpoint and API logs.`, response.status);
      }
    }
    if (!response.ok) {
      const reason = data?.detail || data?.title || `Request failed with HTTP ${response.status}.`;
      throw new ApiError(reason, response.status);
    }
    if (data === undefined) {
      throw new ApiError("The API returned an empty response where JSON was expected.", response.status);
    }
    return { data, status: response.status, location: response.headers.get("Location") };
  }

  function errorMessage(error) {
    if (error.name === "TimeoutError") return "The API took too long to respond. Check the running terminal, then try again.";
    if (error instanceof TypeError) return "We couldn’t reach your local API. Start the .NET app, then try again.";
    return error.message;
  }

  function featureError(error, feature) {
    if (error.status === 404 || error.status === 405) {
      return `${feature} is enabled in workshop.json, but its API endpoint is not available yet. Implement and test the endpoint, or turn the feature off.`;
    }
    return errorMessage(error);
  }

  function setNotice(message, error = false) {
    byId("notice").textContent = message;
    byId("notice").setAttribute("role", error ? "alert" : "status");
    byId("notice").hidden = !message;
  }

  function applyFeatures(features) {
    if (!features || featureNames.some((name) => typeof features[name] !== "boolean")) {
      throw new Error("The workshop feature configuration is invalid. Each feature in wwwroot/workshop.json must be true or false.");
    }
    state.features = features;
    for (const button of queueButtons) {
      button.disabled = button.dataset.queue !== "" && !features.statusFilter;
      button.title = button.disabled ? "Available after Lab 1" : "";
    }
    for (const option of byId("mobile-queue").options) {
      option.disabled = option.value !== "" && !features.statusFilter;
      option.textContent = option.value ? `${label(option.value)}${features.statusFilter ? "" : " · Lab 1"}` : "All tickets";
    }
    byId("search").disabled = !features.search;
    byId("search-submit").disabled = !features.search;
    byId("search").placeholder = features.search ? "Search ticket titles…" : "Search tickets · optional exercise";
    byId("new-ticket").disabled = !features.create;
    byId("new-ticket").title = features.create ? "" : "Ticket creation is participant work in Lab 4";
    byId("new-ticket").querySelector(".button-lab").hidden = features.create;
    byId("starter-note").hidden = featureNames.every((name) => features[name]);
    byId("starter-copy").textContent = featureNames.some((name) => features[name]) ?
      "Your implemented features are enabled. Remaining ticket actions unlock as you finish their API work." :
      "Viewing is ready. Filters, search, and ticket actions unlock as you build their API features.";
  }

  function statusBadge(status) {
    const badge = element("span", `badge status-${status}`);
    badge.append(icon(status === "open" ? "circle" : "check"), document.createTextNode(label(status)));
    return badge;
  }

  function priorityBadge(priority) {
    const badge = element("span", `priority priority-${priority}`);
    const bars = element("span", "priority-bars");
    bars.setAttribute("aria-hidden", "true");
    bars.append(element("i"), element("i"), element("i"));
    badge.append(bars, document.createTextNode(label(priority)));
    return badge;
  }

  function sortedTickets() {
    const sort = byId("sort").value;
    return [...state.tickets].sort((left, right) => {
      if (sort === "priority") return priorityOrder[left.priority] - priorityOrder[right.priority] || left.id - right.id;
      if (sort === "title") return left.title.localeCompare(right.title) || left.id - right.id;
      return left.id - right.id;
    });
  }

  function renderRows() {
    const body = byId("ticket-rows");
    body.replaceChildren();
    const tickets = sortedTickets();
    for (const ticket of tickets) {
      const expanded = state.expanded === ticket.id;
      const row = element("tr", `ticket-row${expanded ? " expanded" : ""}`);
      row.dataset.ticketId = ticket.id;
      const titleCell = element("td");
      const button = element("button", "ticket-title", ticket.title);
      button.setAttribute("aria-expanded", String(expanded));
      button.setAttribute("aria-controls", `details-${ticket.id}`);
      button.addEventListener("click", () => expandTicket(ticket.id));
      titleCell.append(button);
      const statusCell = element("td");
      statusCell.append(statusBadge(ticket.status));
      const priorityCell = element("td");
      priorityCell.append(priorityBadge(ticket.priority));
      const arrowCell = element("td", "row-arrow");
      arrowCell.append(icon("arrow", true));
      row.append(element("td", "ticket-code", ticketCode(ticket.id)), titleCell, statusCell, priorityCell, arrowCell);
      body.append(row);

      const details = element("tr", "details-row");
      details.id = `details-${ticket.id}`;
      details.hidden = !expanded;
      const detailsCell = element("td");
      detailsCell.colSpan = 5;
      if (expanded) detailsCell.append(element("p", "detail-loading", "Loading ticket details…"));
      details.append(detailsCell);
      body.append(details);
    }
    byId("empty").hidden = tickets.length !== 0;
    byId("ticket-table").hidden = tickets.length === 0;
    byId("result-count").textContent = `${tickets.length} ${tickets.length === 1 ? "ticket" : "tickets"}${state.queue || state.search ? " in this view" : " in your workspace"}`;
    if (state.expanded !== null) loadDetail(state.expanded);
  }

  async function loadTickets() {
    const version = ++state.listVersion;
    const selected = state.expanded;
    state.detailVersion++;
    const queue = state.queue;
    const search = state.search;
    byId("loading").hidden = false;
    byId("empty").hidden = true;
    byId("ticket-table").hidden = true;
    byId("queue-error").hidden = true;
    byId("refresh").disabled = true;
    byId("result-count").textContent = "Loading tickets…";
    byId("ticket-table").setAttribute("aria-busy", "true");
    const params = new URLSearchParams();
    if (queue) params.set("status", queue);
    if (search) params.set("q", search);
    try {
      const all = validateList((await request("/tickets")).data);
      const filtered = params.size ? validateList((await request(`/tickets?${params}`)).data) : all;
      if (version !== state.listVersion) return;
      if (queue && filtered.some((ticket) => ticket.status !== queue)) {
        throw new Error("The status filter is enabled, but the API returned tickets outside this queue. Complete Lab 1 or disable statusFilter in workshop.json.");
      }
      if (search && filtered.some((ticket) => !ticket.title.toLowerCase().includes(search.toLowerCase()))) {
        throw new Error("Search is enabled, but the API returned non-matching titles. Implement and check title search or disable search in workshop.json.");
      }
      state.allTickets = all;
      state.tickets = filtered;
      state.expanded = filtered.some((ticket) => ticket.id === selected) ? selected : null;
      byId("all-count").textContent = all.length;
      byId("open-count").textContent = all.filter((ticket) => ticket.status === "open").length;
      byId("resolved-count").textContent = all.filter((ticket) => ticket.status === "resolved").length;
      renderRows();
    } catch (error) {
      if (version !== state.listVersion) return;
      byId("queue-error-message").textContent = errorMessage(error);
      byId("queue-error").hidden = false;
      byId("ticket-table").hidden = true;
      byId("empty").hidden = true;
      byId("result-count").textContent = "Queue unavailable";
    } finally {
      if (version === state.listVersion) {
        byId("loading").hidden = true;
        byId("refresh").disabled = false;
        byId("ticket-table").setAttribute("aria-busy", "false");
      }
    }
  }

  function expandTicket(id) {
    state.expanded = state.expanded === id ? null : id;
    state.detailVersion++;
    renderRows();
    const selectedButton = document.querySelector(`[data-ticket-id="${id}"] .ticket-title`);
    selectedButton?.focus({ preventScroll: true });
  }

  async function loadDetail(id) {
    const version = ++state.detailVersion;
    try {
      const ticket = validateTicket((await request(`/tickets/${id}`)).data);
      if (version !== state.detailVersion || state.expanded !== id) return;
      if (ticket.id !== id) throw new Error("The detail endpoint returned a different ticket. Check the API contract.");
      const detail = element("div", "ticket-detail");
      const info = element("div");
      const heading = element("div", "detail-heading");
      heading.append(element("h2", "", "Ticket details"), element("span", "", "From the API"));
      const facts = element("dl", "detail-facts");
      for (const [name, value] of [["Ticket number", ticketCode(ticket.id)], ["Status", label(ticket.status)], ["Priority", label(ticket.priority)]]) {
        const fact = element("div");
        fact.append(element("dt", "", name), element("dd", "", value));
        facts.append(fact);
      }
      const link = element("a", "detail-link", "View API response");
      link.href = `/tickets/${ticket.id}`;
      link.target = "_blank";
      link.rel = "noopener";
      link.append(icon("code", true));
      info.append(heading, facts, link);
      const actions = element("div", "detail-actions");
      if (ticket.status === "resolved") {
        const resolved = element("div", "detail-resolved");
        resolved.append(icon("check"), document.createTextNode("This ticket is resolved"));
        actions.append(resolved, element("p", "", "No further action is needed in this queue."));
      } else {
        const resolve = element("button", "button secondary", "Resolve ticket");
        resolve.disabled = !state.features.resolve || state.resolving.has(id);
        resolve.textContent = state.resolving.has(id) ? "Resolving…" : "Resolve ticket";
        resolve.title = !state.features.resolve ? "Available after the optional resolve endpoint is implemented" : "";
        resolve.addEventListener("click", () => resolveTicket(ticket, resolve, actions));
        actions.append(resolve, element("p", "", state.features.resolve ? "Moves this ticket to the resolved queue." : "Resolution is optional future work. This action stays disabled until its API is ready."));
      }
      detail.append(info, actions);
      byId(`details-${id}`).firstElementChild.replaceChildren(detail);
    } catch (error) {
      if (version !== state.detailVersion || state.expanded !== id) return;
      const message = element("div", "ticket-detail");
      const text = element("div", "inline-error", errorMessage(error));
      text.setAttribute("role", "alert");
      const retry = element("button", "button secondary", "Retry ticket details");
      retry.addEventListener("click", () => loadDetail(id));
      message.append(text, retry);
      byId(`details-${id}`)?.firstElementChild.replaceChildren(message);
    }
  }

  async function resolveTicket(ticket, button, actions) {
    if (!state.features.resolve || state.resolving.has(ticket.id)) return;
    state.resolving.add(ticket.id);
    button.disabled = true;
    button.textContent = "Resolving…";
    actions.querySelector(".inline-error")?.remove();
    try {
      const result = await request(`/tickets/${ticket.id}/resolve`, { method: "POST" });
      const resolved = validateTicket(result.data);
      if (result.status !== 200 || resolved.id !== ticket.id || resolved.status !== "resolved" ||
          resolved.title !== ticket.title || resolved.priority !== ticket.priority) {
        throw new Error("The resolve response did not match the API contract. Refresh the queue and review the endpoint.");
      }
      setNotice(`${ticketCode(ticket.id)} is resolved.`);
      await loadTickets();
    } catch (error) {
      const message = element("p", "inline-error", featureError(error, "Ticket resolution"));
      message.setAttribute("role", "alert");
      actions.append(message);
      if (!actions.isConnected) setNotice(message.textContent, true);
      button.disabled = false;
      button.textContent = "Resolve ticket";
    } finally {
      state.resolving.delete(ticket.id);
      if (state.expanded === ticket.id && !button.isConnected) loadDetail(ticket.id);
    }
  }

  function showGuide(show = true) {
    byId("workshop-guide").hidden = !show;
    byId("guide-toggle").setAttribute("aria-expanded", String(show));
    byId("feature-guide").setAttribute("aria-expanded", String(show));
    if (show) byId("guide-close").focus();
  }

  function showCreate(show = true) {
    if (state.creating || (show && !state.features?.create)) return;
    byId("create-panel").hidden = !show;
    byId("create-error").hidden = true;
    if (show) byId("ticket-title").focus();
    else byId("new-ticket").focus();
  }

  function setCreating(creating) {
    state.creating = creating;
    for (const id of ["create-submit", "create-cancel", "create-close", "ticket-title", "ticket-priority", "new-ticket"]) {
      byId(id).disabled = creating;
    }
    byId("create-submit").textContent = creating ? "Creating…" : "Create ticket";
  }

  byId("create-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state.creating || !state.features?.create) return;
    const title = byId("ticket-title").value.trim();
    if (!title) {
      byId("create-error").textContent = "Add a title with at least one non-whitespace character.";
      byId("create-error").hidden = false;
      byId("ticket-title").focus();
      return;
    }
    setCreating(true);
    byId("create-error").hidden = true;
    try {
      const result = await request("/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, priority: byId("ticket-priority").value })
      });
      const created = validateTicket(result.data);
      if (result.status !== 201 || result.location !== `/tickets/${created.id}` ||
          created.title !== title || created.status !== "open" ||
          created.priority !== byId("ticket-priority").value) {
        throw new Error("The creation response did not match the API contract. Refresh the queue to check whether a ticket was created before retrying.");
      }
      state.expanded = created.id;
      state.queue = "";
      state.search = "";
      byId("search").value = "";
      updateQueue();
      byId("create-form").reset();
      setCreating(false);
      showCreate(false);
      setNotice(`${ticketCode(created.id)} created. Ready for your next step.`);
      await loadTickets();
    } catch (error) {
      byId("create-error").textContent = featureError(error, "Ticket creation");
      byId("create-error").hidden = false;
    } finally {
      setCreating(false);
    }
  });

  function updateQueue() {
    byId("mobile-queue").value = state.queue;
    byId("queue-title").textContent = state.queue ? `${label(state.queue)} tickets` : "All tickets";
    for (const button of queueButtons) {
      const selected = button.dataset.queue === state.queue;
      button.classList.toggle("selected", selected);
      if (selected) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    }
    byId("mobile-queue").addEventListener("change", () => {
      state.queue = byId("mobile-queue").value;
      state.expanded = null;
      updateQueue();
      setNotice("");
      loadTickets();
    });
  }

  for (const button of queueButtons) {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      state.queue = button.dataset.queue;
      state.expanded = null;
      updateQueue();
      setNotice("");
      loadTickets();
    });
  }
  byId("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.features?.search) return;
    state.search = byId("search").value.trim();
    state.expanded = null;
    setNotice("");
    loadTickets();
  });
  byId("sort").addEventListener("change", () => {
    if (byId("queue-error").hidden && byId("loading").hidden) renderRows();
  });
  byId("refresh").addEventListener("click", () => { setNotice(""); initialize(); });
  byId("retry").addEventListener("click", () => initialize());
  byId("reset").addEventListener("click", () => {
    state.queue = "";
    state.search = "";
    byId("search").value = "";
    updateQueue();
    loadTickets();
  });
  byId("new-ticket").addEventListener("click", () => showCreate());
  byId("create-close").addEventListener("click", () => showCreate(false));
  byId("create-cancel").addEventListener("click", () => showCreate(false));
  byId("guide-toggle").addEventListener("click", () => showGuide(byId("workshop-guide").hidden));
  byId("feature-guide").addEventListener("click", () => showGuide());
  byId("guide-close").addEventListener("click", () => {
    showGuide(false);
    byId("feature-guide").focus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!byId("create-panel").hidden) showCreate(false);
    else if (!byId("workshop-guide").hidden) { showGuide(false); byId("feature-guide").focus(); }
  });
  byId("theme-toggle").addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    const url = new URL(window.location.href);
    url.searchParams.set("scoutTheme", theme);
    history.replaceState(null, "", url);
    updateThemeLabel();
  });
  function updateThemeLabel() {
    byId("theme-toggle").setAttribute("aria-label", `Switch to ${document.documentElement.dataset.theme === "dark" ? "light" : "dark"} theme`);
  }

  async function initialize() {
    byId("refresh").disabled = true;
    try {
      const features = (await request("/workshop.json")).data;
      applyFeatures(features);
      if (!features.statusFilter) state.queue = "";
      if (!features.search) { state.search = ""; byId("search").value = ""; }
      updateQueue();
      await loadTickets();
    } catch (error) {
      byId("queue-error-message").textContent = errorMessage(error);
      byId("queue-error").hidden = false;
      byId("loading").hidden = true;
      byId("ticket-table").hidden = true;
      byId("empty").hidden = true;
      byId("result-count").textContent = "Workspace configuration unavailable";
    } finally {
      byId("refresh").disabled = false;
    }
  }
  updateThemeLabel();
  initialize();
})();
