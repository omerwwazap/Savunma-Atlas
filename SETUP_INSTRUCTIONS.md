# Setup Instructions - Military Projects Hub

## Overview
This project has been successfully migrated from Supabase to JSON-based data storage. All project data is now stored in `src/data/projects.json` and managed through Git.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## Installation

### Option 1: Windows (Native)
```powershell
# Navigate to project directory
cd C:\Users\leven\Desktop\Github-omerwwazap\military-projects-hub

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Option 2: Windows with WSL
```bash
# Navigate to project directory (WSL path)
cd /mnt/c/Users/leven/Desktop/Github-omerwwazap/military-projects-hub

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
military-projects-hub/
├── src/
│   ├── data/
│   │   └── projects.json          # Main data file (all project data)
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── MobileNav.jsx
│   │   ├── DesktopNav.jsx
│   │   ├── ExportCountryMap.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Index.jsx              # Home page
│   │   ├── Projects.jsx           # Projects listing page
│   │   ├── News.jsx               # News page
│   │   └── About.jsx              # About page
│   ├── DataContext.jsx            # Data provider (replaces SupabaseContext)
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # Entry point
├── public/                        # Static assets
├── package.json                   # Dependencies
└── vite.config.js                 # Vite configuration
```

## Key Features

1. **Project Management**
   - View all military projects
   - Filter by status, type, company
   - Sort by various fields
   - Search functionality
   - Pagination

2. **Project Details**
   - Detailed project information
   - Export country visualization
   - Company links

3. **Internationalization**
   - Multi-language support (Turkish/English)
   - Language switcher component

4. **Responsive Design**
   - Mobile-friendly navigation
   - Desktop navigation
   - Adaptive layouts

## Development Workflow

### 1. Running the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or another port if 5173 is busy)

### 2. Building for Production
```bash
npm run build
```
This creates an optimized build in the `dist/` directory.

### 3. Previewing Production Build
```bash
npm run preview
```

## Managing Data

### Adding a New Project

1. Open `src/data/projects.json`
2. Add a new project object to the `projects` array:
```json
{
  "id": 21,
  "created_at": "2024-10-12",
  "project_name": "New Project Name",
  "image_url": "https://example.com/image.jpg",
  "pstart_date": "2024-01-01",
  "service_date": "",
  "status": "In Progress",
  "company_name": "Company Name",
  "company_url": "https://company.com",
  "type": "Air",
  "p_scale": "Major",
  "Notes": "Project notes",
  "total_in_service": 0,
  "last_updated": "2024-10-12",
  "target_date": "2026-12-01",
  "is_exported": false,
  "export_country": []
}
```
3. Save the file
4. Commit to Git

### Updating a Project

1. Open `src/data/projects.json`
2. Find the project by `id`
3. Update the desired fields
4. Save and commit

### Deleting a Project

1. Open `src/data/projects.json`
2. Remove the project object from the array
3. Save and commit

## Common Issues and Solutions

### Issue: npm install fails
**Solution**: Try clearing npm cache and reinstalling
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5173 already in use
**Solution**: Vite will automatically use the next available port, or you can specify a different port:
```bash
npm run dev -- --port 3000
```

### Issue: Changes to JSON file not reflected
**Solution**: Hard refresh the browser (Ctrl+Shift+R) or restart the dev server

### Issue: Build warnings about chunk size
**Solution**: This is normal. For better performance, consider implementing code splitting in the future.

## Testing

The application has been tested with:
- ✅ Data loading from JSON file
- ✅ Project filtering and sorting
- ✅ Search functionality
- ✅ Project details modal
- ✅ Export country map
- ✅ Mobile navigation
- ✅ Language switching
- ✅ Production build

## Deployment

### Option 1: Netlify (Current)
The project is already configured for Netlify deployment. Push changes to the main branch, and Netlify will automatically build and deploy.

### Option 2: GitHub Pages
```bash
# Build the project
npm run build

# Deploy to GitHub Pages (requires gh-pages package)
npm install -g gh-pages
gh-pages -d dist
```

### Option 3: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Environment Variables

**No environment variables are required** for this project since we're using local JSON data storage.

If you had `.env` files with Supabase credentials, they are no longer needed and can be safely removed.

## Git Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Update project data"

# Push to GitHub
git push origin main
```

## Support

For issues or questions:
1. Check the `MIGRATION_NOTES.md` file for detailed migration information
2. Review this `SETUP_INSTRUCTIONS.md` file
3. Check the Git commit history for recent changes
4. Create an issue in the GitHub repository

## Next Steps

1. ✅ Data migrated from Supabase to JSON
2. ✅ Application tested and working
3. ✅ Build process verified
4. 🔄 Ready for deployment
5. 🔄 Ready for team collaboration

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

Last Updated: October 12, 2025

