# Prompt World — Starter Website

A responsive, static AI image prompt library starter built with HTML, CSS and vanilla JavaScript.

## Included
- White and green premium design
- Six categories: Kids, Young Men, Seniors, Women, Photo Restoration, Islamic
- Search, category filters, sorting, favorites (saved in the visitor's browser)
- One-click copy prompt button
- Responsive mobile layout
- 12 starter prompt records in `prompts.js`

## Important
This is a working starter/demo, not a finished 5,000-prompt production library.
The current prompt cards use sample external image URLs for layout demonstration. Replace these with images you own or have permission to use, ideally AI-generated example images that match each prompt. Do not hotlink images without checking their usage rights.

The category labels show the planned target counts. They are not claims that 5,000 prompts are already included.

## Run locally
Open `index.html` in a modern browser. For best results, use a local static server (for example VS Code Live Server).

## Add more prompts
Open `prompts.js`. Add objects to the `window.PROMPTS` array using this shape:

{
  "id": "kids-003",
  "title": "Prompt title",
  "category": "Kids",
  "tag": "3D Cartoon",
  "description": "Short card description.",
  "prompt": "Full English prompt text...",
  "image": "assets/your-example-image.webp"
}

Allowed category values:
- Kids
- Young Men
- Seniors
- Women
- Photo Restoration
- Islamic

Use unique IDs. Keep image files compressed (WebP is recommended) to keep the site fast.

## Publish free with Cloudflare Pages
1. Create a GitHub account and a new repository.
2. Upload all files and the `assets` folder.
3. Create/sign in to a Cloudflare account.
4. In Cloudflare Pages, choose Create a project → Connect to Git.
5. Select the repository.
6. For a plain HTML site, leave the build command empty and set the output directory to `/` (or the repository root, depending on the dashboard prompt).
7. Deploy. Cloudflare will provide a `*.pages.dev` address.

Free-plan quotas and dashboard labels can change; check the current Cloudflare Pages documentation before deployment.

## Before applying for ads
Add real, original, useful content; create accurate About, Contact, Privacy Policy and Terms pages; test every prompt and image; ensure the site follows the current Google AdSense policies. Never click your own ads or buy fake traffic.
