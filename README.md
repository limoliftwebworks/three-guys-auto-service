# Davis Tree Service - Employee Setup

## 🔗 Essential Links

- **Config Editor**: http://localhost:3000/config-editor?section=infoBar
- **Local Config File**: `src/config/localConfig.ts`
- **Live Site**: http://localhost:3000
- **Color Hex Finder**: https://www.color-hex.com/color-palette/1294
- **Backup Delete Script**: node scripts/fix-config-types.js
- **Automation Copy Script**: ./setup-new-project.sh
- **NPM Script**: npm run generate-cursor-prompt
- **🚀 ENHANCED Cursor Project Setup**: npm install node-fetch ------>>> npm run generate-automotive-redesign

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

## 🚀 FULLY AUTOMATED AUTOMOTIVE REDESIGN SCRIPT

### ✅ 100% AUTOMATED - ZERO MANUAL INPUT REQUIRED:

**🔒 SAFE AUTOMATION FEATURES:**

- **Preserves Existing Services**: Never modifies or removes existing service sections
- **Preserves Guarantees**: Never touches existing warranty/guarantee content
- **Smart Missing Data Handling**: Skips missing phone/email, keeps existing localConfig values
- **No Data Loss Risk**: Only updates fields that have extracted data

**🔍 Advanced Data Extraction (7+ Sources):**

- **Google Business/Maps**: Business info, hours, services, reviews, contact details
- **Yelp**: Categories, reviews, ratings, business details, hours
- **Facebook**: Company description, contact info, business name
- **Better Business Bureau**: BBB rating, years in business, accreditation
- **LinkedIn**: Company profiles, descriptions, business information
- **Automotive Marketplaces**: CarGurus, AutoTrader, Cars.com dealer info
- **General Websites**: Enhanced pattern matching for all business data

**📊 Automatically Extracted (No Manual Input):**

- Business name, address, phone, email (when available)
- Business hours and emergency service availability
- Services and specialties (enhanced automotive keyword detection)
- Customer reviews and ratings
- BBB ratings and years in business
- Emergency/24-hour services, mobile services, roadside assistance
- Automotive-specific services (tire, oil, brake, transmission, engine, etc.)
- Certifications and warranties

### 🎯 How to Use the FULLY AUTOMATED Script:

```bash
npm run generate-automotive-redesign
```

**What it does:**

1. **Comprehensive Web Scraping** - Automatically extracts detailed business information from:

   - Google Business profiles and Google Maps
   - Yelp business pages
   - Facebook business pages
   - BBB profiles
   - LinkedIn company pages
   - Automotive marketplace listings
   - General business websites

2. **Smart Automotive Detection** - Identifies automotive-specific:

   - Services (tire, brake, oil change, transmission, etc.)
   - Emergency services (24-hour, roadside assistance, mobile service)
   - Specialties and certifications

3. **Enhanced Data Processing** - Collects and deduplicates:

   - Business contact information
   - Operating hours
   - Customer reviews
   - Service offerings
   - Emergency capabilities

4. **Generates Comprehensive Cursor AI Prompt** - Creates detailed instructions for:
   - Complete website redesign using localConfig.ts
   - Page-by-page content updates
   - Automotive business branding
   - Service alignment and emergency service highlighting

### 🔧 Previous Script (Basic Image Fixing):

1. **`scripts/fix-hardcoded-images.js`** - Basic script for generating Cursor AI prompts to fix hardcoded image issues
2. **`scripts/README.md`** - Documentation explaining how to use the basic script
3. **Updated `package.json`** - Added `"fix-images": "node scripts/fix-hardcoded-images.js"` script

## 📈 PERFORMANCE COMPARISON:

**Before (Manual Input Required):**

- ❌ Required manual input for every field
- ❌ Risk of modifying existing services/guarantees
- ❌ Time-consuming data entry process
- ❌ Only extracted 2-3 basic data points from URLs

**After (Fully Automated + Safe):**

- ✅ 100% automated - zero manual input required
- ✅ Preserves existing services & guarantee sections
- ✅ Smart handling of missing data (keeps existing values)
- ✅ Extracts 15+ comprehensive data points per website
- ✅ Real-time content scraping from 7+ website types
- ✅ Automotive-specific service detection
- ✅ Emergency service identification
- ✅ BBB ratings and business credibility data
- ✅ Auto-extracted customer reviews when available

### 🚗 Perfect For:

- **Automotive Businesses**: Tire shops, auto repair, mobile mechanics
- **Emergency Services**: 24-hour roadside assistance, mobile service
- **Service Centers**: Oil change, brake repair, transmission shops
- **Comprehensive Redesigns**: Full website overhaul with real business data

🎯 **Result**: The AI now gets comprehensive, real business information instead of just basic URL patterns, enabling much more accurate and detailed website redesigns!
