# Image Support in Tooltips Extension

## Overview

The Tooltips Extension supports two types of images:
1. **Block Images** - Using standard markdown syntax for centered, large images
2. **Inline Images** - Using custom syntax for emoji-style images within text

## Features

### Block Image Display
Use standard markdown syntax to display centered block images:
```
![Alt text](https://example.com/image.png)
```

### Inline Images (Emoji-Style)
Use custom syntax to display small images inline with text:
```
{img:https://example.com/icon.png}
```
With optional alt text:
```
{img:https://example.com/icon.png:Description}
```

**Examples:**
```
Hello {img:wave.png} how are you?
I love {img:heart.png:heart} coding!
Press {img:space.png} to jump
```

### Clickable Images
Wrap block images in markdown links to make them clickable:
```
[![Alt text](https://example.com/image.png)](https://example.com/link)
```
- Images wrapped in links open the URL in a new tab when clicked
- Maintains all image styling properties

### Image Styling Blocks

Four blocks for controlling image appearance:

1. **`set tooltip image max width to [WIDTH]px`**
   - Controls the maximum width of block images in pixels
   - Set to 0 for auto/no limit (default)
   - Images scale proportionally

2. **`set tooltip image max height to [HEIGHT]px`**
   - Controls the maximum height of block images in pixels
   - Set to 0 for auto/no limit (default)
   - Images scale proportionally

3. **`set tooltip image border radius to [RADIUS]px`**
   - Controls the border radius (rounded corners) of block images
   - Default: 4px
   - Use 50px+ for circular images (great for avatars)

4. **`set tooltip inline image size to [SIZE]px`**
   - Controls the height of inline images in pixels
   - Width scales automatically to maintain aspect ratio
   - Default: 20px
   - Recommended range: 12-24px for most use cases

## Examples

### Example 1: Character Profile
```scratch
When sprite clicked
set tooltip image max width to [150]px
set tooltip image border radius to [8]px
show tooltip [# Character Info

![Hero Avatar](https://example.com/hero.png)

**Name:** Brave Hero
**Level:** 25
**HP:** 100/100] at x: [0] y: [0]
```

### Example 2: Clickable Logo
```scratch
When green flag clicked
set tooltip image max width to [200]px
show tooltip [## Visit Our Website

[![Logo](https://example.com/logo.png)](https://example.com)

*Click the logo to visit*] following cursor
```

### Example 3: Circular Avatar
```scratch
When this sprite clicked
set tooltip image max width to [100]px
set tooltip image border radius to [50]px
show tooltip [![Avatar](https://example.com/avatar.png)

**Username:** Player123
**Status:** Online] at x: [100] y: [80]
```

### Example 4: Image Gallery
```scratch
When green flag clicked
set tooltip image max width to [120]px
set tooltip max width to [400]px
show tooltip [## Item Shop

![Sword](https://example.com/sword.png)
![Shield](https://example.com/shield.png)
![Potion](https://example.com/potion.png)

*Available items*] at x: [0] y: [0]
```

### Example 5: Inline Images in Text
```scratch
When green flag clicked
set tooltip inline image size to [20]px
show tooltip [Welcome {img:https://example.com/wave.png} to the game!

Press {img:https://example.com/space.png:Space bar} to jump
Use {img:https://example.com/arrows.png:Arrow keys} to move

Good luck {img:https://example.com/thumbs-up.png}!] at x: [0] y: [0]
```

### Example 6: Status Bar with Icons
```scratch
When this sprite clicked
set tooltip inline image size to [16]px
show tooltip [## Player Stats

{img:https://example.com/heart.png} HP: 100/100
{img:https://example.com/mana.png} Mana: 75/100
{img:https://example.com/gold.png} Gold: 500

{img:https://example.com/check.png} Quest Complete!] following cursor
```

### Example 7: Mixed Block and Inline Images
```scratch
When sprite clicked
set tooltip image max width to [150]px
set tooltip inline image size to [18]px
show tooltip [# Hero Profile

![Avatar](https://example.com/hero-avatar.png)

**Name:** Hero {img:https://example.com/star.png}
**Level:** 25 {img:https://example.com/level-up.png}
**Status:** Online {img:https://example.com/online.png}] at x: [0] y: [0]
```

### Example 8: Using Scratch Costumes
```scratch
When sprite clicked
set tooltip image max width to [100]px
set tooltip inline image size to [20]px
show tooltip [# Sprite Info

![Preview](costume1)

Using costume: **costume1**
Status: {img:costume2} Ready!] at x: [0] y: [0]
```

### Example 9: Data URL Images (Base64)
```scratch
When green flag clicked
set variable [base64image] to [data:image/png;base64,iVBORw0KG...]
show tooltip [![Embedded](join(base64image)())] at x: [0] y: [0]
```

## Technical Details

### Block Image Rendering
- Block images are displayed as centered block elements
- Images maintain their aspect ratio automatically
- `object-fit: contain` ensures images scale properly
- Images have 8px top and bottom margins for spacing
- Controlled by max-width, max-height, and border-radius settings

### Inline Image Rendering
- Inline images display inline with text (like emojis)
- Height is set by `inline image size` setting (default 20px)
- Width scales automatically to maintain aspect ratio
- Vertically aligned to middle of text line
- 2px left and right margins for spacing
- No border radius applied (displays as-is)

### Alt Text
- Alt text is used for accessibility
- Shows as native HTML tooltip on image hover
- Important for describing images to users

### Supported Formats
- PNG, JPG, JPEG
- GIF (including animated)
- SVG
- WebP
- Any format supported by the `<img>` tag

### Supported Image Sources
The extension now supports multiple image source types:

1. **Web URLs** - Standard HTTP/HTTPS URLs
   ```
   ![Image](https://example.com/image.png)
   {img:https://example.com/icon.png}
   ```

2. **Data URLs** - Base64 encoded images
   ```
   ![Image](data:image/png;base64,iVBORw0KGg...)
   {img:data:image/png;base64,iVBORw0KGg...}
   ```

3. **Blob URLs** - From FileReader or Canvas
   ```
   ![Image](blob:http://localhost/...)
   {img:blob:http://localhost/...}
   ```

4. **Scratch Costume Names** - Reference costumes from any sprite
   ```
   ![Avatar](costume1)
   {img:my-sprite-costume}
   ```
   - Automatically searches all sprites for matching costume names
   - Case-insensitive matching
   - Converts costume to data URL automatically

5. **Relative URLs** - Relative paths (browser-dependent)
   ```
   ![Image](./images/photo.png)
   {img:../assets/icon.png}
   ```

### Image Loading
- Images load asynchronously
- Tooltip displays immediately; images appear when loaded
- Failed image loads show broken image icon
- Scratch costumes are converted to data URLs for universal compatibility

## Best Practices

### Block Images
1. **Set sizing before showing** - Call image styling blocks before showing the tooltip
2. **Use descriptive alt text** - Always provide meaningful alt text for images
3. **Consider dimensions** - Pre-size images appropriately to avoid large downloads
4. **Circular avatars** - Use border-radius of 50px or higher for circular profile pictures

### Inline Images
5. **Keep them small** - Use small icon/emoji images (typically 16-24px height)
6. **Consistent sizing** - Set inline image size once per tooltip for visual consistency
7. **Use for icons** - Perfect for status indicators, controls, and emoji-like graphics
8. **Alt text optional** - Use `{img:url:alt}` syntax if needed, but often not necessary for icons

### General
9. **Test image URLs** - Ensure images are publicly accessible
10. **CORS considerations** - Some images may be blocked by CORS policies
11. **Optimize images** - Use compressed/optimized images for better performance
12. **Fallback content** - Include text content alongside images
13. **Mix types** - Combine block and inline images for rich tooltips
14. **Use Scratch costumes** - For portability, reference costume names instead of external URLs
15. **Data URLs for embedding** - Use data URLs to embed images directly in your project (no external dependencies)

## Troubleshooting

**Images not displaying:**
- Verify the image URL is correct and accessible
- Check browser console for CORS errors
- Ensure the image format is supported
- Try using a direct image URL (ending in .png, .jpg, etc.)
- For Scratch costumes: verify the costume name matches exactly (case-insensitive)
- For data URLs: ensure the data URL is properly formatted and not truncated
- For blob URLs: ensure the blob is still valid (not revoked)

**Images too large:**
- Use `set tooltip image max width to [pixels]px` to constrain size
- Use `set tooltip image max height to [pixels]px` if needed
- Both width and height can be set simultaneously

**Images distorted:**
- Images automatically maintain aspect ratio
- If distorted, check the source image dimensions
- Try setting only width OR height, not both

**Clickable images not working:**
- Verify the link syntax: `[![alt](image.png)](link.com)`
- Check that brackets are properly nested
- Ensure the URL includes protocol (https://)

## Syntax Reference

### Block Images (Markdown)

**Simple block image:**
```
![Alt text](image-url)
```

**Clickable block image:**
```
[![Alt text](image-url)](link-url)
```

**Multiple block images:**
```
![Image 1](url1)
![Image 2](url2)
![Image 3](url3)
```

### Inline Images (Custom Syntax)

**Simple inline image:**
```
{img:image-url}
```

**Inline image with alt text:**
```
{img:image-url:Alt description}
```

**Multiple inline images in text:**
```
Hello {img:wave.png} how are you {img:smile.png}?
```

### Mixed Usage

**Block image with inline icons:**
```
# Profile

![Avatar](avatar.png)

**Status:** {img:online.png} Online
**Level:** 25 {img:star.png}
```

## Version History

- **v1.3.0** - Added support for multiple image sources: data URLs, blob URLs, Scratch costume names, and relative paths. Images can now be loaded from anywhere, not just web URLs.
- **v1.2.0** - Added block and inline image support with markdown and custom syntax, clickable images, and image styling blocks
