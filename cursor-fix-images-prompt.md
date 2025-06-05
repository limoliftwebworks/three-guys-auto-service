
# 🔧 TASK: Fix All Hardcoded Image References and Implement Automatic Configuration Control

## 📋 OBJECTIVE
Remove all hardcoded image paths that cause 404 errors and implement a system where hero background images are automatically controlled by configuration files instead of being hardcoded in CSS.

## 🎯 BUSINESS CONTEXT
**Company:** 3 Guys
**Website Type:** 
**Location:** 

## 📚 REFERENCE LINKS


## 🖼️ AVAILABLE IMAGES IN /public/images/
- 1.png
- 2.png
- 3.png
- 4.png
- access.png
- auto-hero-mobile-blue.png
- calculator.png
- clock.png
- free.png
- logo.png
- shipping.png

## 🚀 IMPLEMENTATION STEPS

### Step 1: Remove Hardcoded CSS Background Images
- [ ] Check `src/app/main.css` and `src/app/globals.css` for hardcoded background images
- [ ] Remove specific image URLs from CSS `.hero-section` classes
- [ ] Keep only positioning and sizing properties in CSS

### Step 2: Implement Automatic Hero Image Support
- [ ] Ensure all page components check their configuration for `heroImage` property
- [ ] Update hero sections to use this pattern:
```javascript
style={{
  backgroundImage: pageConfig.heroImage 
    ? `linear-gradient(...), url(${pageConfig.heroImage.startsWith('/') ? pageConfig.heroImage : `/images/${pageConfig.heroImage}`})`
    : `linear-gradient(...)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}}
```

### Step 3: Fix Configuration File
- [ ] Remove any hardcoded `heroImage` paths that reference non-existent files
- [ ] Update service categories or content sections that reference missing images
- [ ] Replace with available images from the list above

### Step 4: Update Fallback Categories/Content
- [ ] Check for hardcoded fallback data in page components
- [ ] Replace any `/images/missing-file.jpg` references with available images
- [ ] Ensure fallback content uses existing images

### Step 5: Verify All Image References
- [ ] Search codebase for `/images/` references
- [ ] Verify each referenced image exists in `/public/images/`
- [ ] Replace missing images with available alternatives

## 🎨 PREFERRED IMAGE USAGE


## 🔍 SEARCH PATTERNS
Use these search patterns to find problematic references:
- `grep -r "/images/" src/`
- `grep -r "heroImage.*jpg\|png\|gif" src/`
- `grep -r "bgImage.*images" src/`

## ✅ SUCCESS CRITERIA
1. **No 404 errors** in browser console for image files
2. **Hero images controlled by configuration** - no hardcoded CSS background images
3. **Automatic fallbacks** - pages without configured images show gradients
4. **All image references point to existing files** in `/public/images/`
5. **Configuration-driven** - easy to change images by updating config files

## 🚨 CRITICAL REQUIREMENTS
- **DO NOT** create new image files or directories
- **ONLY USE** images from the available list above
- **MAINTAIN** existing functionality while removing hardcoded references
- **ENSURE** graceful fallbacks when no hero image is configured
- **TEST** that each page loads without 404 errors

## 📋 FINAL CHECKLIST
- [ ] All CSS background images removed from stylesheets
- [ ] Hero sections support automatic image configuration
- [ ] Configuration file cleaned of non-existent image references
- [ ] Fallback content updated with existing images
- [ ] All pages load without 404 image errors
- [ ] Images controlled entirely through configuration files

**Priority: HIGH** - This affects user experience and SEO due to 404 errors.

## 💡 IMPLEMENTATION NOTES
- Pages should automatically detect if `heroImage` is configured and use it
- If no `heroImage` is configured, fall back to gradient backgrounds
- Support both relative (`image.png`) and absolute (`/images/image.png`) paths
- Maintain existing color schemes and styling while fixing image issues

Please proceed to implement these fixes systematically, ensuring each step is completed before moving to the next.
