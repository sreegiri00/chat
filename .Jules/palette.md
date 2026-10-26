## 2024-10-26 - Accessible Popovers & Keyboard Dismissal
**Learning:** Icon-only toggle buttons for popovers (like emoji pickers and attachment menus) need explicit `aria-label` and `aria-expanded` attributes, alongside a global `Escape` key listener for screen reader and keyboard accessibility.
**Action:** Always pair popover state with `aria-expanded` and register `Escape` key handling to ensure seamless keyboard navigation.
