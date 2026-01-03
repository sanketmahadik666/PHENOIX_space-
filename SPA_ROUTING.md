# SPA Routing Configuration

To fix the 404 issue on non-home routes during development, we rely on Vite's built-in SPA support.
Vite automatically handles SPA routing by serving `index.html` for any 404s on the dev server.

### Why you might see issues on restart:
When the dev server restarts, the browser might attempt to request a resource (like a `.js` chunk) that was part of the *previous* build session before the new session is fully ready, leading to temporary load errors.

### Solution:
1. **Wait for the server:** Ensure the "Start application" workflow shows "VITE ready".
2. **Hard Refresh:** If you see a "module not found" or 404 error on a subpage after restart, use `Cmd+Shift+R` (or `Ctrl+F5`) to force the browser to fetch the new build manifest.
3. **Browser History:** The Replit proxy correctly maps sub-routes to `index.html` as long as the dev server is running on port 5000.

For production/publishing, the deployment configuration handles URL rewrites.
