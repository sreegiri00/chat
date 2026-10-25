## 2025-03-01 - Icon-Only Button ARIA Accessibility Pattern
**Learning:** Icon-only buttons using Lucide React icons in WhatsApp Web clone components (Sidebar and ChatArea) lacked ARIA labels and toggle states (`aria-pressed`), making them inaccessible to screen readers.
**Action:** Always complement `title` tooltips on icon-only buttons with explicit `aria-label` and `aria-pressed` attributes across all chat interface header and control bars.
