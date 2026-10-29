## 2026-10-29 - Filter Pill ARIA & Focus Navigation
**Learning:** Filter pill buttons acting as toggles/selection triggers in chat sidebars require `aria-pressed` state attributes and distinct `focus-visible` ring indicators to properly communicate active filter context to screen reader users and keyboard navigators.
**Action:** Always add `aria-pressed` and `focus-visible:ring-2` to pill button components used for tab/filter switching.
