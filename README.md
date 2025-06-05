# Davis Tree Service - Employee Setup

## 🔗 Essential Links

- **Config Editor**: http://localhost:3000/config-editor?section=infoBar
- **Local Config File**: `src/config/localConfig.ts`
- **Live Site**: http://localhost:3000
- **Color Hex Finder**: https://www.color-hex.com/color-palette/1294
- **Backup Delete Script**: node scripts/fix-config-types.js
- **Automation Copy Script**: ./setup-new-project.sh
- **NPM Script**: npm run generate-cursor-prompt
- **Cursor Project Setup**: npm run generate-cursor-prompt
  ./setup-new-project.sh

## 📋 Setup Instructions

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Navigate to: http://localhost:3000

## 🎨 Editing Site Content

**Use the Config Editor**: http://localhost:3000/config-editor

- Make changes in any section
- Press `Ctrl+S` to save
- Or click "Save Changes" button
- Page stays on your current section after saving

## 🤝 Team Collaboration

**Push Your Changes**:

```bash
 push in github desktop
```

**Get Partner's Changes**:

```bash
git pull origin julien
```

**First Time Setup**:

```bash
./collaborate.sh setup
```

## 🛠️ File Structure

- `src/config/localConfig.ts` - Main site configuration
- `src/app/config-editor/` - Visual config editor
- `collaborate.sh` - Team collaboration script

## ⚠️ Important Notes

- Always use `Ctrl+S` in config editor (no auto-save)
- Run `./collaborate.sh pull` before starting work
- Run `./collaborate.sh push` when finished
- Config editor URL: http://localhost:3000/config-editor

## ✅ Created Files:

1. **`scripts/fix-hardcoded-images.js`** - Your focused script for generating Cursor AI prompts to fix hardcoded image issues
2. **`scripts/README.md`** - Documentation explaining how to use the script
3. **Updated `package.json`** - Added `"fix-images": "node scripts/fix-hardcoded-images.js"` script

## 🚀 How to Use:

```bash
npm run fix-images
```

## 📋 What the Script Does:

1. **Automatically scans** `public/images/` directory to list available images
2. **Collects business context** (company name, website type, location)
3. **Gathers reference links** (Google Business, Yelp, etc.)
4. **Asks for image usage preferences**
5. **Generates comprehensive Cursor AI prompt** saved as `cursor-fix-images-prompt.md`

## 🎯 Perfect For:

- Fixing 404 image errors
- Converting hardcoded CSS background images to configuration-driven ones
- Ensuring all image references point to existing files
- Making websites easily customizable through config files

Your script is much more focused than my previous version - it specifically targets the hardcoded image problem we solved in this project, making it perfect for similar situations where websites have broken image references that need systematic fixing!
