# GitHub Pages Deployment Guide

## ✅ Yes! This project is ready for GitHub Pages deployment.

## Prerequisites
- GitHub repository
- GitHub Pages enabled in repository settings

## Setup Instructions

### Step 1: Update Vite Configuration
✅ **DONE** - The `vite.config.js` has been updated with the `base` path.

**Important**: Make sure the `base` path matches your repository name:
```javascript
base: '/military-projects-hub/', // Change if your repo name is different
```

If your repository name is different, update this line in `vite.config.js`.

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** → **Pages**
3. Under **Source**, select:
   - Source: **GitHub Actions**
   
That's it! The workflow will handle everything else.

### Step 3: Push Changes

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Add GitHub Pages deployment workflow"

# Push to GitHub
git push origin main
```

### Step 4: Wait for Deployment

1. Go to the **Actions** tab in your GitHub repository
2. Watch the "Deploy to GitHub Pages" workflow run
3. Once completed (green checkmark), your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/military-projects-hub/
   ```

## Automatic Deployments

Every time you push to the `main` branch, the site will automatically rebuild and redeploy. This includes:
- Code changes
- Data updates to `src/data/projects.json`
- Configuration changes

## Manual Deployment

You can also trigger a deployment manually:
1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## Troubleshooting

### Issue: 404 Page Not Found
**Solution**: Check that the `base` path in `vite.config.js` matches your repository name exactly.

### Issue: Assets not loading (images, CSS, JS)
**Solution**: Ensure the `base` path ends with a `/` in `vite.config.js`.

### Issue: Workflow fails
**Solution**: Check the Actions tab for error logs. Common issues:
- Node modules cache issues (clear cache and retry)
- Permissions not set correctly (check repository settings)

### Issue: Changes not reflected
**Solution**: 
1. Hard refresh your browser (Ctrl+Shift+R)
2. Clear browser cache
3. Wait a few minutes for CDN to update

## Local Testing with GitHub Pages Base Path

To test locally with the same base path:

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

The preview will use the base path configured in `vite.config.js`.

## Comparing with Netlify

Both Netlify and GitHub Pages will work for this project:

| Feature | GitHub Pages | Netlify (Current) |
|---------|-------------|-------------------|
| **Cost** | Free | Free (with limits) |
| **Setup** | Automatic via Actions | Connected via Git |
| **Build Time** | ~2-3 minutes | ~2-3 minutes |
| **Custom Domain** | ✅ Yes | ✅ Yes |
| **HTTPS** | ✅ Automatic | ✅ Automatic |
| **Redirects** | Limited | Full support |
| **Headers** | Limited | Full support |
| **Deploy Previews** | ❌ No | ✅ Yes (on PRs) |

**Recommendation**: You can use both! Keep Netlify for production and use GitHub Pages for staging/testing.

## Switching Repository Names

If you want to deploy at the root path (e.g., `username.github.io`):

1. Rename your repository to: `YOUR-USERNAME.github.io`
2. Update `vite.config.js`:
   ```javascript
   base: '/', // Root path instead of /military-projects-hub/
   ```
3. Push changes

## Environment-Specific Base Path

If you want different base paths for development and production:

```javascript
// vite.config.js
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/military-projects-hub/' : '/',
  // ... rest of config
}));
```

## Custom Domain Setup

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `public/` directory:
   ```
   yourdomain.com
   ```

2. Configure DNS at your domain provider:
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record pointing to `YOUR-USERNAME.github.io`

3. Enable custom domain in repository Settings → Pages

## Security Considerations

- ✅ No secrets or API keys needed (using JSON data)
- ✅ All data is public (suitable for GitHub Pages)
- ✅ HTTPS automatically enabled
- ✅ No server-side code (static site only)

## Monitoring Deployments

Watch deployments in real-time:
1. Go to **Actions** tab
2. Click on the latest workflow run
3. Expand the steps to see detailed logs

## Cost Analysis

**GitHub Pages**: 
- ✅ Completely FREE
- Storage: 1 GB limit (your project is ~5-10 MB)
- Bandwidth: 100 GB/month (soft limit)
- Build minutes: Unlimited for public repos

**Perfect for this project!** You won't hit any limits.

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Static Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Your site will be live at:**
```
https://YOUR-USERNAME.github.io/military-projects-hub/
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

Last Updated: October 12, 2025

