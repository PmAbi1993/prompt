# Project: Prompt Builder Web App (Vite + GitHub Pages)

## 1) Summary
A fast, static web app where users pick a prompt category from a dashboard, fill a short form on that page, hit **Create Prompt**, and the app **copies the generated prompt to the clipboard** (with a confirmation toast). Built with **Vite**, deployed to **GitHub Pages**, no backend required.

## 2) Goals & Non‑Goals
**Goals**
- Let users quickly generate high-quality prompts via simple forms.
- One-click copy-to-clipboard with clear success/failure feedback.
- “Awesome” but standard, accessible UI with dark/light mode.
- Easy to add/edit prompt pages with minimal code changes (ideally config-driven).
- Host as a static site on GitHub Pages; fast loads, mobile-friendly.

**Non‑Goals (v1)**
- No user accounts/auth, no server or database.
- No third-party API calls for prompt quality or AI inference.
- No drag‑and‑drop prompt composer (that’s a future nice-to‑have).

## 3) Success Metrics
- Time-to-first-copy: < 10 seconds for a new user to generate any prompt.
- CLS/LCP/TTI: Lighthouse Performance ≥ 90 on mobile.
- Copy success rate ≥ 99% (navigator.clipboard where available; fallback handled).
- Zero 404s on GitHub Pages routing.

## 4) Users & Use Cases
**Primary user**: Anyone who reuses prompts (developers, writers, marketers, educators).

**Core use cases**
- “I want a blog-outline prompt with my topic and tone.”
- “I want a code-review prompt specifying language and constraints.”
- “I want a marketing email prompt with audience and product details.”

## 5) Information Architecture
- **/ (Dashboard)** — grid of icon cards (each opens a Prompt Builder page).
- **/builder/:id** — a single prompt builder page with form + preview + copy.
- **/about** — short app blurb, how to add prompts, credits.
- **/settings** — theme toggle (light/dark/system), clipboard tips.

**Routing note:** Use **hash-based routing** to avoid GH Pages refresh issues (`/#/builder/...`). Alternatively, use 404.html SPA fallback—hash routing is simpler.

## 6) UX & Visual Design

**Layout**
- **App shell**: Left sidebar (compact) on desktop with icons + labels on hover; top app bar on mobile.
- **Dashboard**: Responsive grid of cards (icon + title + short blurb).
- **Builder page**: 
  - Header: Title, short description.
  - Form: Minimal fields with clear labels/placeholders, inline validation.
  - Actions: [Create Prompt] (primary), [Reset].
  - Output: Read‑only preview box, [Copy] repeats action, small “Copied!” toast.
- **Theme**: Light/dark with system preference default.
- **Motion**: Subtle hover and focus states (no heavy animations).

**Design tokens (example)**
- Radius: 10–12px; Shadow: soft md; Spacing scale: 4px base.
- Typography: System stack; sizes: 14/16/20/24/32.
- Colors: Neutral background, primary accent for CTAs; high-contrast focus rings.

**Accessibility**
- WCAG 2.1 AA contrast.
- Visible focus, keyboard navigable (Tab/Shift+Tab).
- ARIA for toasts, form errors, and copy result announcements.

**Wireframe (textual)**

```
[Top Bar: App Name | Theme Toggle]

[Sidebar: Icons]
[Dashboard Grid]
+--------------------------------------------+
|  [📝 Blog Prompt]  [💻 Code Review]  [📣 Ad] |
|  [🎓 Lesson Plan]  [🧪 Test Cases]  [🗞️ PR] |
+--------------------------------------------+

Builder Page:
Title + short description
----------------------------------------------
Form (2–8 fields)            Preview (readonly)
[Create Prompt] [Reset]      [Copy]  Copied! ✓
```

## 7) Functional Requirements

### 7.1 Dashboard
- Displays cards for all available prompt builders (icon, name, description).
- Clicking a card navigates to `/builder/:id`.
- Search (optional v1.1): filter by title or tags.

**Acceptance**
- [ ] Cards render from config and route correctly.
- [ ] Keyboard users can reach and activate each card.

### 7.2 Prompt Builder Page
- Loads metadata and field schema from config by `:id`.
- Renders form fields (text, textarea, select, checkbox, radio, number, tags).
- Real-time preview (optional; v1 can be on button click).
- **Create Prompt**:
  - Validates required fields.
  - Compiles template with form inputs into final string.
  - Copies to clipboard via `navigator.clipboard.writeText`.
  - On success: toast “Copied to clipboard.”; on failure: toast with guidance.
- Buttons: **Reset** clears the form. **Copy** in preview repeats copy.
- Optional: “Share prefilled link” (query params).

**Acceptance**
- [ ] Required validations prevent generation with missing fields.
- [ ] Generated string exactly matches template with substitutions.
- [ ] Clipboard copy works on secure origins; fallback offered if blocked.

### 7.3 Settings
- Theme toggle (light/dark/system), persisted in `localStorage`.

**Acceptance**
- [ ] Theme applies instantly and persists across reloads.

### 7.4 Error & Empty States
- Invalid route `/builder/:id` → friendly 404-in-app page.
- Clipboard permission denied → show manual select-all/copy guidance with a button to focus preview.

**Acceptance**
- [ ] All errors announce to screen readers and present clear next steps.

## 8) Configuration-Driven Prompts (Key to scale)
Define all prompts in a single JSON (or TS) config to avoid editing component code.

**Example: `prompts.config.json`**
```json
[
  {
    "id": "blog-outline",
    "title": "Blog Outline",
    "icon": "📝",
    "description": "Create a structured blog outline.",
    "template": "Create a detailed blog outline about {{topic}} for {{audience}} with a {{tone}} tone. Include {{sections}} sections and key takeaways.",
    "fields": [
      {"key": "topic", "label": "Topic", "type": "text", "required": true, "placeholder": "e.g., SwiftUI performance"},
      {"key": "audience", "label": "Audience", "type": "text", "required": true, "placeholder": "e.g., iOS devs"},
      {"key": "tone", "label": "Tone", "type": "select", "options": ["Professional", "Friendly", "Technical"], "required": true},
      {"key": "sections", "label": "Number of Sections", "type": "number", "min": 3, "max": 10, "required": true}
    ],
    "tags": ["writing", "content"]
  },
  {
    "id": "code-review",
    "title": "Code Review",
    "icon": "💻",
    "description": "Ask for a structured code review.",
    "template": "Review the following {{language}} code for {{focus}}. Be specific about {{constraints}}. Code:\n\n{{code}}",
    "fields": [
      {"key": "language", "label": "Language", "type": "select", "options": ["Swift", "Kotlin", "TypeScript", "Python"], "required": true},
      {"key": "focus", "label": "Focus Areas", "type": "text", "placeholder": "e.g., performance, readability", "required": true},
      {"key": "constraints", "label": "Constraints", "type": "text", "placeholder": "e.g., iOS 16 minimum"},
      {"key": "code", "label": "Code", "type": "textarea", "required": true}
    ],
    "tags": ["dev", "review"]
  }
]
```

**Template rules**
- `{{var}}` placeholders replaced with sanitized field values.
- Optional sections: support `{{#if var}}...{{/if}}` (v1.1).
- Newlines preserved; preview shows monospace block for readability.

## 9) Technical Architecture

**Stack**
- **Vite + React + TypeScript** (fast dev, static build).
- **Router**: React Router with **HashRouter**.
- **State**: React Context + useReducer (lightweight). (Zustand optional.)
- **Styling**: CSS variables + utility classes (Tailwind optional).
- **Icons**: Emoji in config (simple) or Heroicons/Lucide (optional).
- **Toasts**: Small custom component or minimal library.
- **Clipboard**: `navigator.clipboard.writeText` with fallback.

**Directory structure**
```
/src
  /components
    Button.tsx
    Field.tsx            // renders by type (text, select, textarea, etc.)
    Toast.tsx
    Preview.tsx
    Card.tsx
  /pages
    Dashboard.tsx
    Builder.tsx
    Settings.tsx
    NotFound.tsx
  /lib
    compileTemplate.ts   // replaces {{var}} from fields
    clipboard.ts         // writeText + fallback
    storage.ts           // theme persistence, form draft (optional)
    validation.ts
  /config
    prompts.config.json
  main.tsx
  App.tsx
index.html
```

**Build & deploy**
- `vite.config.ts` set `base: '/<repo-name>/'`.
- Use **HashRouter** to avoid GH Pages 404s.
- GitHub Actions: on `push` to `main`, run build and deploy `dist/` to `gh-pages` branch.
- Add `CNAME` if using a custom domain.

## 10) Non‑Functional Requirements
- **Performance**: First load ≤ 100KB JS (pre-optimization target). Code-split routes.
- **Accessibility**: ARIA roles for alerts/toasts; labels tied to inputs; escape to close toasts.
- **Responsiveness**: 320px–wide phones upward; grid collapses to one column.
- **Privacy**: All processing client-side; no telemetry in v1. (If analytics added later, provide opt‑out.)
- **Security**: HTTPS only (GH Pages provides). Clipboard only on user action (button click).

## 11) Validation & Edge Cases
- **Clipboard not available**: Show modal with instructions: “Select prompt below, press Ctrl/Cmd+C”. Place focus in preview and auto-select text.
- **Empty required fields**: Disable Create Prompt or show inline error text.
- **Very long inputs**: Truncate preview height with scroll; max length per field (e.g., 1000 chars).
- **Unsafe HTML**: Treat user input as text; never render as HTML (escape output).

## 12) Example Prompts (v1 set)
- Blog Outline (📝)
- Code Review (💻)
- Marketing Ad Copy (📣)
- PR/Press Release (🗞️)
- Lesson Plan (🎓)
- Test Case Generator (🧪)

(You can swap or add easily in `prompts.config.json`.)

## 13) Acceptance Criteria (End‑to‑End)

**Dashboard**
- [ ] All configured prompts appear with correct icon/title/desc.
- [ ] Navigating via keyboard + Enter works.
- [ ] Selecting a card lands on the correct Builder route.

**Builder**
- [ ] Fields render as described by config schema.
- [ ] Required validation: shows error and prevents generation.
- [ ] Clicking **Create Prompt**:
  - [ ] Compiles template correctly.
  - [ ] Copies to clipboard (visible toast & screenreader alert).
  - [ ] Preview updates (if not already).
- [ ] Clipboard denied → graceful fallback with manual copy flow.

**Settings**
- [ ] Theme toggles and persists across sessions.

**General**
- [ ] Works offline after first load (optional PWA in v1.1).
- [ ] Mobile layout usable on 320px width.
- [ ] Lighthouse Performance ≥ 90 (mobile).

## 14) Implementation Notes

**Clipboard helper**
```ts
export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return { ok: true };
  } catch {
    // Fallback: create a hidden textarea, select, execCommand('copy')
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return { ok };
  }
}
```

**Template compiler (simple)**
- Replace `{{key}}` with stringified field value.
- Trim trailing spaces and collapse multiple newlines (optional).
- For v1.1, add conditional blocks.

**Form renderer**
- Map `type` → component: `text`, `textarea`, `select`, `number`, `checkbox`, `radio`, `tags`.
- Support `min`, `max`, `pattern`, `placeholder`, `helpText`.

**Persisting drafts (optional)**
- Save current form values to `localStorage` under `prompt:<id>`; restore on return.

## 15) QA Test Plan (high level)
- Unit tests for `compileTemplate`, `validation`, `clipboard`.
- Component tests for Field, Toast, Preview.
- E2E (Playwright/Cypress): 
  - Navigate dashboard → builder → fill form → create → copy success.
  - Simulate clipboard denial and confirm fallback path.
  - Hash routing works on page refresh for `/#/builder/blog-outline`.

## 16) Deployment Plan
1. Create repo.
2. Add Vite + React + TS template.
3. Add config file and base pages/components.
4. Set `vite.config.ts` `base` correctly.
5. Add GitHub Action to build & deploy to `gh-pages`.
6. Set Pages to serve from `gh-pages` branch.
7. Verify routing on refresh and mobile Lighthouse.

## 17) Risks & Mitigations
- **Routing 404s on GH Pages** → Use **HashRouter**.
- **Clipboard blocked** → Fallback + clear instructions.
- **Config mistakes** → Validate `prompts.config.json` against a JSON schema at build time.

## 18) Roadmap (Beyond v1)
- v1.1: Conditional template sections, search on dashboard, tags input, PWA (offline), import/export prompt configs.
- v1.2: Share links with prefilled params; “favorites”.
- v1.3: Modular plugin system for custom field types; theming controls.
- v2.0: Optional backend for user accounts, cloud sync, team sharing.
