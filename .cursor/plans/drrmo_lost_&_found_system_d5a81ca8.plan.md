---
name: DRRMO Lost & Found System
overview: Build a complete 4-file frontend prototype for a "DRRMO Integrated Lost & Found and Announcement System" with a User Portal (index.html), Admin Dashboard (admin.html), shared stylesheet (css/style.css), and shared JS module (js/app.js) — all vanilla, no frameworks, no database.
todos:
  - id: css-setup
    content: "Create css/style.css with full design system: CSS variables, reset, layout, priority color classes, ticker animation, responsive breakpoints"
    status: completed
  - id: app-js
    content: Create js/app.js with MockData, State, all render/CRUD functions, page-detection init, live preview, tag system, FileReader image preview, toast notifications
    status: completed
  - id: index-html
    content: "Create index.html (User Portal): header with live clock, emergency ticker, announcement board with filter tabs, lost & found search with tag pills and item grid, footer"
    status: completed
  - id: admin-html
    content: "Create admin.html (Admin Dashboard): sidebar nav, top bar, overview stat cards, announcements tab with create form + live preview + list, lost items tab with upload form + inventory grid"
    status: completed
isProject: false
---

# DRRMO Integrated Lost & Found and Announcement System

## File Structure

```
Website/
├── index.html        ← User Portal
├── admin.html        ← Admin Dashboard
├── css/
│   └── style.css     ← All styles, CSS variables, priority colors
└── js/
    └── app.js        ← All logic, mock data, DOM manipulation
```

## Design System (css/style.css)

**Color Palette via CSS custom properties:**

- `--navy: #0d1b2a` (primary dark background)
- `--blue: #1565c0` (brand accent)
- `--surface: #f0f4f8` (page background)
- Priority colors declared as root variables:
  - `--priority-general: #2e7d32` (Green — General/Drills/Holidays)
  - `--priority-warning: #e65100` (Amber/Orange — Warnings)
  - `--priority-critical: #b71c1c` (Red — Critical Emergencies)
- CSS classes `.priority-general`, `.priority-warning`, `.priority-critical` used everywhere

**Layout:**

- User Portal: full-width single-column with header, sticky ticker, two-column sections on desktop
- Admin Dashboard: fixed sidebar (240px) + scrollable main content area
- Both fully responsive via `@media (max-width: 768px)` collapsing sidebar and stacking columns

## User Portal — index.html

Sections (top to bottom):

1. **Header** — DRRMO seal/icon, institution name, live clock (updated every second via `setInterval`)
2. **Emergency Ticker** — CSS `@keyframes` marquee showing all active announcement titles; border color = highest current priority
3. **Announcements Board** — filter tabs (All / Critical / Warning / General), color-coded cards with event type badge, priority ribbon, timestamp, and custom note text
4. **Lost & Found Search** — search `<input>` + tag filter pills (e.g., Blue Bag, Red Wallet, Black Phone, Gray Laptop, Yellow Umbrella...), CSS grid of item cards showing mock image via `https://placehold.co/300x200` with color label, item name, date found, location, tag pills
5. **Footer** — office address, hotline, emergency contacts

## Admin Dashboard — admin.html

Layout:

- **Left Sidebar** — DRRMO logo, nav links: Overview, Announcements, Lost Items, (simulated) Settings; active link highlight
- **Top Bar** — page title, admin badge, simulated logout button
- **Overview Tab** — 4 stat cards (Total Lost Items, Active Announcements, Pending Claims, Items Returned), recent activity feed
- **Announcements Tab** — Create form with:
  - `<select>` dropdown: Earthquake Drill / Fire Drill / Typhoon Warning / Class Suspension / Holiday / General Info / Campus Emergency
  - `<textarea>` for custom note
  - Priority radio buttons (General / Warning / Critical) with live color preview swatch
  - Live preview card updates in real-time as admin types
  - Submit adds announcement to top of the list below the form
  - Each list item has Edit / Delete buttons with instant DOM feedback
- **Lost Items Tab** — Add Item form with:
  - Name, Description, Date Found, Location fields
  - `<input type="file" accept="image/*">` — FileReader API shows actual image preview before "submission"
  - Keyword tag input with `+` button to add tag pills (e.g., type "Blue" + click = blue pill added)
  - Submit adds item to inventory grid below
  - Each card has Delete button

## JavaScript (js/app.js)

Structure:

```js
const MockData = { items: [...], announcements: [...] }  // seed data
const State = { items: [], announcements: [] }           // live runtime state
const PriorityMap = { general: {...}, warning: {...}, critical: {...} }
const EventTypeMap = { ... }                             // event → default priority

// Page detection
if (document.getElementById('user-portal')) initUserPortal()
if (document.getElementById('admin-dashboard')) initAdminDashboard()
```

Key functions:

- `renderAnnouncements(filter)` — builds and injects announcement cards, applies CSS priority classes
- `renderLostItems(query, tags)` — filters `State.items` by search text AND active tag, re-renders grid
- `renderTicker()` — joins all active announcement titles into one scrolling string
- `createAnnouncement(formData)` — pushes to `State.announcements`, calls render, shows toast notification
- `addLostItem(formData)` — reads FileReader result for image preview, pushes to `State.items`, re-renders
- `deleteItem(id)` / `deleteAnnouncement(id)` — splices state, re-renders, shows undo toast
- `livePreview()` — on every `input` event on the admin form, updates a preview card in real-time
- `handleTagInput()` — Enter or + button adds tag pill to form state; clicking a pill removes it

## Mock Seed Data

**10 Lost Items:** Blue Backpack, Red Wallet, Black Android Phone, Gray Laptop, Yellow Umbrella, White Earphones, Green Jacket, Brown Leather Shoes, Silver Watch, Purple Notebook — each with a location, date, description, and 1–3 tag keywords, image via `placehold.co` with matching background color

**5 Announcements:**

- (Critical) Campus Emergency: Active fire alarm in Building C — evacuate immediately
- (Warning) Typhoon Warning: Signal No. 2 expected; classes may be suspended
- (Warning) Earthquake Drill: Scheduled drop-cover-hold drill on March 5
- (General) Holiday Notice: No classes on March 10 — Araw ng Kagitingan
- (General) General Info: Lost & Found office now open 7AM–6PM daily

## Interaction Flow

```mermaid
flowchart TD
    AdminForm["Admin: Fill Announcement Form"] --> LivePreview["Live Preview Card Updates"]
    LivePreview --> Submit["Submit"]
    Submit --> StateUpdate["State.announcements.push()"]
    StateUpdate --> RenderAdmin["Re-render Admin List"]
    StateUpdate --> RenderUser["User Portal: renderAnnouncements()"]
    StateUpdate --> RenderTicker["renderTicker() updates marquee"]

    UserSearch["User: Type in Search Box"] --> FilterItems["filterItems(query, tags)"]
    TagClick["User: Click Tag Pill"] --> FilterItems
    FilterItems --> RenderGrid["Re-render Lost Items Grid"]
```



