# Image Support in Tooltips Extension

## Overview

The Tooltips Extension now supports displaying images within tooltips using standard markdown syntax, with additional support for clickable images that link to URLs.

## Features

### Basic Image Display
Use standard markdown syntax to display images:
```
![Alt text](https://example.com/image.png)
```

### Clickable Images
Wrap images in markdown links to make them clickable:
```
[![Alt text](https://example.com/image.png)](https://example.com/link)
```
- Images wrapped in links open the URL in a new tab when clicked
- Maintains all image styling properties

### Image Styling Blocks

Three new blocks for controlling image appearance:

1. **`set tooltip image max width to [WIDTH]px`**
   - Controls the maximum width of images in pixels
   - Set to 0 for auto/no limit (default)
   - Images scale proportionally

2. **`set tooltip image max height to [HEIGHT]px`**
   - Controls the maximum height of images in pixels
   - Set to 0 for auto/no limit (default)
   - Images scale proportionally

3. **`set tooltip image border radius to [RADIUS]px`**
   - Controls the border radius (rounded corners) of images
   - Default: 4px
   - Use 50px+ for circular images (great for avatars)

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

## Technical Details

### Image Rendering
- Images are displayed as block elements, centered within the tooltip
- Images maintain their aspect ratio automatically
- `object-fit: contain` ensures images scale properly
- Images have 8px top and bottom margins for spacing

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

### Image Loading
- Images load asynchronously
- Tooltip displays immediately; images appear when loaded
- Failed image loads show broken image icon

## Best Practices

1. **Set image sizing before showing tooltip** - Call image styling blocks before showing the tooltip
2. **Use descriptive alt text** - Always provide meaningful alt text for images
3. **Consider image dimensions** - Pre-size images appropriately to avoid large downloads
4. **Test image URLs** - Ensure images are publicly accessible
5. **CORS considerations** - Some images may be blocked by CORS policies
6. **Optimize images** - Use compressed/optimized images for better performance
7. **Fallback content** - Include text content alongside images
8. **Circular avatars** - Use border-radius of 50px or higher for circular profile pictures

## Troubleshooting

**Images not displaying:**
- Verify the image URL is correct and accessible
- Check browser console for CORS errors
- Ensure the image format is supported
- Try using a direct image URL (ending in .png, .jpg, etc.)

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

## Markdown Syntax Reference

### Simple image:
```
![Alt text](image-url)
```

### Image with link (clickable):
```
[![Alt text](image-url)](link-url)
```

### Multiple images:
```
![Image 1](url1)
![Image 2](url2)
![Image 3](url3)
```

### Image with text:
```
# Title

![Image](url)

**Description:** Some text here
```

## Version History

- **v1.2.0** - Added image support with markdown syntax, clickable images, and image styling blocks
