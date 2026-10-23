# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-05-18 - Chat Input Accessibility
**Learning:** Text inputs inside messaging applications with placeholder-only text lack accessible names for screen readers when `aria-label` or `<label>` is missing.
**Action:** Always provide an explicit `aria-label` matching or describing the input's purpose on chat text inputs.
