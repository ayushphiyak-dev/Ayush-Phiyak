# Ayush Phiyak — Portfolio

Static portfolio built with HTML, CSS and vanilla JavaScript. All runtime assets are included; no API keys, package installation, or build step are required.

## Deploy on Vercel

Import this GitHub repository into Vercel. Use the repository root as Root Directory and the Other framework preset. The included `vercel.json` sets the output directory to `dist` and disables the build command. Deploy the PR branch for a preview, or merge the PR and deploy `main`.

Configuration reference: https://vercel.com/docs/project-configuration

## Local preview

Run `python -m http.server 4174 --directory dist`, then visit http://localhost:4174.

## Files

- `dist/index.html`: page structure, copy and contact form.
- `dist/style.css` and `dist/refinements.css`: responsive layout and visual styling.
- `dist/app.js`: galleries, navigation, portrait/button interactions and meeting requests.
- `dist/assets/`: supplied portfolio artwork optimized as WebP.

## Meetings

Visitors select a date and time and enter their details. Request a meeting opens Gmail compose with recipient, subject and body filled in. Gmail sign-in may be required. The visitor reviews and sends the email; no booking is automatically confirmed. Direct Gmail, email-app (mailto), and copy-details fallbacks remain available. No backend stores the form. Opening Gmail passes the draft to Google.

Recipient: ayushphiyakwork@gmail.com

## Accessibility and motion

Keyboard controls, focus indicators, reduced-motion support, labelled fields, and native image previews are included. The portrait rim rotates independently; the face and Logofolio logos stay stationary. Posters retain their full artwork without cropping.

Artwork and portfolio content belong to Ayush Phiyak. Web Design / UX/UI is intentionally marked Coming soon.
