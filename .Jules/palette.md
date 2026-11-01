# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-05-18 - Search Input Usability & Empty States in WhatsApp Clone
**Learning:** In list filtering patterns like WhatsApp Web's chat search, users frequently need quick visual and keyboard affordances to dismiss filters (Escape key and one-click clear button). Without these, clearing searches requires manually backspacing all text, especially annoying when hitting empty results.
**Action:** Always provide an explicit accessible clear button (`aria-label="Clear search"`), Escape key shortcut handler, and an actionable empty state button to reset filters.
