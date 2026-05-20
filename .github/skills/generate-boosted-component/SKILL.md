---
name: generate-boosted-component
description: "Generate an HTML component following Orange Boosted 5.3 design system (dark mode, WCAG AA, French text)."
user-invocable: true
---

# Generate Orange Boosted Component

Create an HTML component following Orange Boosted 5.3 design system.

## Requirements
- Use Boosted CSS classes (based on Bootstrap 5)
- Follow Orange brand colors (primary: #ff7900)
- Support dark mode via `data-bs-theme`
- Ensure WCAG AA accessibility (proper labels, ARIA attributes)
- All text in French

## Available Components
- Cards, Modals, Accordions, Navbars
- Forms with validation states
- Badges, Alerts, Toasts
- Lists, Tables with sorting

## Example Card
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Titre</h5>
    <p class="card-text">Description</p>
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

## CDN References
- CSS: `https://cdn.jsdelivr.net/npm/boosted@5.3.8/dist/css/boosted.min.css`
- JS: `https://cdn.jsdelivr.net/npm/boosted@5.3.8/dist/js/boosted.bundle.min.js`
