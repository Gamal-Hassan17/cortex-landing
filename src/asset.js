// Builds a URL for a file in /public that works both locally and on GitHub Pages
// (where the site lives under /repo-name/ instead of /).
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
