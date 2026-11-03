# Palette's Journal

## 2025-05-18 - Search Inputs & Escape Clear Shortcut Pattern
**Learning:** In chat list interfaces with high-density navigation, users frequently filter and clear search queries. Missing quick-clear buttons or `Escape` key handlers forces manual deletion via backspace/select-all, which hinders fast keyboard-driven navigation. Additionally, empty states should provide an inline action to reset the search and automatically refocus the input.
**Action:** Always pair search filter inputs with an accessible clear button (`aria-label="Clear search"`, `title="Clear search"`), support `Escape` key clearance with input refocus, and provide a clear action button in empty state results.
