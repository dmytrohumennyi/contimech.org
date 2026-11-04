# ContiMech website (rebuild, November 2026)

Plain static HTML/CSS. No build step and no framework; open `index.html` locally or serve the folder as is.

## Structure

- `index.html` — positioning, focus, method, selected cases, ecosystem, standards
- `services.html` — 1 Research (1.1 prototyping, 1.2 analysis, 1.3 modelling), 2 Software (2.1 protocols, 2.2 requirements, 2.3 firmware)
- `case-studies/` — case index and 8 cases
- `blog/` — notes index and 2 technical notes
- `contact.html`, `404.html`
- Old public URLs are kept as small redirect pages (meta refresh + canonical) so external links keep working.
- `assets/css/site.css` — the whole design system (tokens at the top, light and dark theme).

## Deploy

Replace the old deployment completely; do not copy on top of it, otherwise removed pages stay public.

GitHub Pages: commit the folder content to the Pages branch root; `CNAME` is included.

nginx on Ubuntu:

```
server {
    server_name contimech.org www.contimech.org;
    root /var/www/contimech;
    index index.html;
    error_page 404 /404.html;
    location / { try_files $uri $uri/ =404; }
}
```
