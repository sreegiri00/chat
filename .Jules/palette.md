# Palette's Journal

Critical UX and accessibility learnings for the WhatsApp Web clone.

## 2026-11-05 - Search Quick-Clear and Keyboard Dismissal Pattern
**Learning:** In chat list sidebars, typing a search query filters the conversation list rapidly. When no chats match, users often get stuck without an obvious one-click way to restore all chats, and relying only on manual backspacing slows down chat navigation. Pairing an in-input clear icon button with keyboard `Escape` dismissal and an empty-state action button creates a seamless recovery pattern for zero-result states.
**Action:** Always provide both an explicit clear button and `Escape` keyboard dismissal for search inputs, accompanied by an actionable recovery link in empty filter results.
