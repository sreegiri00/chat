## 2025-05-10 - Sidebar Accessibility and Focus States
**Learning:** Icon-only buttons and tab filters in custom React chat list interfaces lack explicit ARIA labels and focus-visible indicators by default, impairing screen reader and keyboard accessibility.
**Action:** Always include `aria-label`, proper tab roles (`role="tab"`, `aria-selected`), and explicit `focus-visible:ring-2` ring classes for icon buttons and navigation pills.
