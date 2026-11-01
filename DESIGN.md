---
name: QueueDesk
description: A restrained warm-neutral and rose ticket workspace.
colors:
  cp-bg: "#f7f4ef"
  cp-bg-elevated: "#fcfbf8"
  cp-surface: "#ffffff"
  cp-surface-soft: "#f5f5f5"
  cp-border: "#dedede"
  cp-border-strong: "#919191"
  cp-text: "#242424"
  cp-text-muted: "#5c5c5c"
  cp-text-soft: "#6f6f6f"
  cp-accent: "#b11f4b"
  cp-accent-hover: "#9a1a41"
  cp-accent-soft: "rgba(177, 31, 75, 0.08)"
  cp-accent-fg: "#ffffff"
  cp-success: "#16a34a"
  cp-danger: "#dc2626"
  cp-warning: "#f59e0b"
  cp-link: "#0078d4"
  cp-overlay: "rgba(255, 255, 255, 0.8)"
  cp-panel: "rgba(255, 255, 255, 0.86)"
  cp-panel-strong: "rgba(255, 255, 255, 0.96)"
  cp-sheen: "rgba(255, 255, 255, 0.55)"
  cp-highlight: "rgba(177, 31, 75, 0.12)"
  cp-bg-dark: "#3d3b3a"
  cp-bg-elevated-dark: "#343231"
  cp-surface-dark: "#292929"
  cp-surface-soft-dark: "#2e2e2e"
  cp-border-dark: "#474747"
  cp-border-strong-dark: "#5f5f5f"
  cp-text-dark: "#dedede"
  cp-text-muted-dark: "#919191"
  cp-text-soft-dark: "#b0b0b0"
  cp-accent-dark: "#fd8ea1"
  cp-accent-hover-dark: "#fb7b91"
  cp-accent-soft-dark: "rgba(253, 142, 161, 0.14)"
  cp-accent-fg-dark: "#1a1a1a"
  cp-success-dark: "#4ade80"
  cp-danger-dark: "#f87171"
  cp-warning-dark: "#fbbf24"
  cp-link-dark: "#4da6ff"
  cp-overlay-dark: "rgba(41, 41, 41, 0.88)"
  cp-panel-dark: "rgba(41, 41, 41, 0.72)"
  cp-panel-strong-dark: "rgba(41, 41, 41, 0.96)"
  cp-sheen-dark: "rgba(255, 255, 255, 0.04)"
  cp-highlight-dark: "rgba(253, 142, 161, 0.12)"
typography:
  body:
    fontFamily: '"Segoe UI", Aptos, Calibri, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  headline:
    fontFamily: '"Segoe UI", Aptos, Calibri, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  headline-mobile:
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  label:
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.5
  metadata:
    fontSize: "0.75rem"
    lineHeight: 1.5
  fine-print:
    fontSize: "0.6875rem"
    lineHeight: 1.5
  ticket-code:
    fontFamily: 'Consolas, "Courier New", Courier, monospace'
    fontSize: "0.75rem"
    lineHeight: 1.5
rounded:
  priority-bar: "1px"
  title-focus: "3px"
  skeleton: "4px"
  avatar: "8px"
  control: "10px"
  container: "16px"
  indicator: "50%"
spacing:
  gap-status: "6px"
  gap-priority: "7px"
  gap-small: "8px"
  gap-control: "10px"
  gap-brand: "12px"
  gap-toolbar: "16px"
  gap-field: "20px"
  gap-section: "24px"
  inset-medium: "28px"
  inset-large: "32px"
  gap-detail: "40px"
  page-top: "48px"
  page-top-wide: "56px"
  footer-separation: "64px"
components:
  button-primary:
    backgroundColor: "{colors.cp-accent}"
    textColor: "{colors.cp-accent-fg}"
    rounded: "{rounded.control}"
    padding: "9px 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.cp-accent-hover}"
  button-primary-disabled:
    backgroundColor: "{colors.cp-surface}"
    textColor: "{colors.cp-text-muted}"
  button-secondary:
    backgroundColor: "{colors.cp-surface}"
    textColor: "{colors.cp-text}"
    rounded: "{rounded.control}"
    padding: "9px 16px"
    height: "40px"
  button-secondary-hover:
    backgroundColor: "{colors.cp-surface-soft}"
  text-input:
    backgroundColor: "{colors.cp-surface}"
    textColor: "{colors.cp-text}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
    width: "100%"
  navigation-item:
    textColor: "{colors.cp-text-muted}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "44px"
    width: "100%"
  navigation-item-selected:
    backgroundColor: "{colors.cp-accent-soft}"
    textColor: "{colors.cp-accent}"
  navigation-item-selected-dark:
    backgroundColor: "{colors.cp-accent-soft-dark}"
    textColor: "{colors.cp-text-dark}"
  status-indicator:
    textColor: "{colors.cp-text}"
    typography: "{typography.metadata}"
  ledger-container:
    backgroundColor: "{colors.cp-surface}"
    rounded: "{rounded.container}"
    width: "100%"
---

# Design System: QueueDesk

## Overview

**Creative North Star: "Restrained warm-neutral and rose workspace"**

A modern, clean, realistic workspace with quiet controls, fine rules and readable ticket records. The confirmed direction is a slim navigation rail and a full-width expandable ledger, not a marketing page.

**Key Characteristics:**
- Warm-neutral surfaces and restrained rose accents.
- Native controls and inline ticket inspection.
- Explicit unfinished lab features.

## Colors

### Primary
Rose `cp-accent` identifies primary actions, open-status icons and detail links; `cp-accent-hover` supplies button hover, and `cp-accent-soft` supplies selection backgrounds.

### Neutral
Use `cp-bg` for the workspace, `cp-bg-elevated` for rail, header and detail surfaces, and `cp-surface` for controls and the ledger. Fine dividers use `cp-border`; stronger control hover borders use `cp-border-strong`.

Dark readable secondary text uses `cp-text-soft`, not `cp-text-muted`, on the implementation's secondary labels and content. Dark selected navigation uses `cp-text` foreground over `cp-accent-soft` with `cp-accent` icons; light selected navigation uses `cp-accent` foreground. Detail links use `cp-accent` in both themes; general anchors retain `cp-link`.

Status icons use `cp-success` for resolved tickets; error borders and icons use `cp-danger`. Warning, overlay, panel and sheen values are supplied Clawpilot tokens, not additional patterns currently used by this workspace. The `-dark` frontmatter entries document the corresponding custom-property overrides, not new runtime variables.

## Typography

The system UI stack is Segoe UI, Aptos, Calibri, Apple system and BlinkMacSystemFont, then sans-serif. Ticket identifiers and inline code use Consolas with Courier fallbacks. There are no downloaded fonts.

Use the headline role for the queue heading, title for panel headings, body for workspace copy, and smaller metadata and fine-print roles for supporting content. Root sizing is (16px); paragraphs cap at (72ch). Ticket counts use tabular numerals. Buttons inherit body sizing with weight (600).

## Layout

Desktop uses a fixed (232px) rail, a (72px) topbar and centered content capped at (1440px), with main padding (48px 40px 24px). At widths up to (1180px), the rail becomes (208px); up to (900px), it becomes an icon-only (76px) rail.

At widths up to (640px), the rail becomes a static brand header, native queue selection replaces rail navigation, toolbar and form fields stack, and table rows become two-column records with full-width titles. Flexible controls, wrapping titles and stacked records accommodate the (320px) mobile target without a separate breakpoint. Main mobile padding is (28px 20px 20px). At widths from (1600px), main top padding becomes (56px).

## Elevation & Depth

The workspace uses flat tonal layering and single-pixel borders, not rendered shadows. The exact `cp-shadow` values remain declared by Clawpilot but are unused here; translucent panel and overlay tokens likewise do not establish a glass treatment.

## Shapes

Controls and navigation have gently rounded corners (10px); ledger and panels use (16px), avatars (8px), skeletons (4px), and the local indicator is circular. The ledger clips its contents. Outline icons use rounded caps and joins with stroke width (1.6), normally (20px), with smaller (16px) variants.

## Components

Primary buttons pair `cp-accent` with `cp-accent-fg`, padding (9px 16px), and minimum height (40px). Secondary buttons use `cp-surface` and `cp-text`; hover uses `cp-surface-soft` and stronger borders. Disabled primary actions use neutral surface, muted text and a lab availability label rather than implying success.

Text inputs use a single-pixel border, surface background and height (44px). Search uses a (40px) input inside a rounded wrapper. Global keyboard focus is a (2px) `cp-accent` outline offset (4px); search-wrapper focus offsets (2px). Form fields have explicit labels.

Navigation uses minimum height (44px) with quiet neutral hover. Icon-only rail controls retain accessible names via labels. Status indicators combine a readable word with an outline icon, not color alone.

The ledger has fixed desktop columns and inline expandable details. Row hover uses `cp-bg-elevated`; expanded rows use `cp-accent-soft`. Details reveal through clip-path over (180ms) with `cubic-bezier(0.16,1,0.3,1)`; reduced-motion preference removes animation and transitions. Loading, empty, error and unavailable-feature states remain distinct. Representative sidecar data is synthetic.

## Do's and Don'ts

- Do preserve the exact Clawpilot theme values and use their custom properties.
- Do use readable dark secondary text, explicit labels and accent focus outlines.
- Do keep native mobile queue selection and stacked ticket records.
- Do expose unfinished lab features without simulating API success.
- Don't replace the restrained workspace with a marketing page.
- Don't add unobserved fonts, shadows, tonal ramps or operational claims.
