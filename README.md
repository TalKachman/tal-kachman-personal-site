# Tal Kachman

A quiet personal site for notes, travel fragments, photography plans, and the parts of life that sit outside the academic homepage.

## Local Preview

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Structure

- `index.html` — landing page
- `about.html` — personal background and links
- `papers-that-influenced-me.html` — a minimal, discipline-based collection linked from Blog's Sticky Things
- `blog.html` — notes with search, tags, pinned posts, and dated entries
- `travel.html` and `photos.html` — hidden for now, reserved for the future Atlas/photo experience

Google Analytics is wired through `scripts/analytics.js`; add the GA4 measurement ID there when the site is ready to track traffic.
