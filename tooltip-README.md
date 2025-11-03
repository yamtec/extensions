# TurboWarp Tooltips Extension

A comprehensive TurboWarp extension for displaying customizable tooltips with advanced markdown formatting, styling, and positioning options.

## Features

- **Multiple Display Modes**: Fixed positioning, cursor following, cursor following with custom offset
- **Full Markdown Support**: Headers, bold, italic, strikethrough, code blocks, lists, links, images
- **Image Support**: Display block images, inline images (emoji-style), clickable images with links
- **Inline Images**: Use `{img:url}` syntax to add emoji-style images within text
- **Custom Color Syntax**: `{color:red}colored text{/color}` or `{color:#FF5733}hex colors{/color}`
- **Extensive Styling Options**: Fonts, colors, borders, shadows, opacity, sizing, image sizing
- **Smooth Animations**: Configurable fade in/out effects
- **Auto-hide**: Optional automatic hiding with customizable duration
- **Smart Positioning**: Tooltips stay within viewport bounds
- **Reporter Blocks**: Query tooltip state, position, content, and mode

## Installation

1. Open TurboWarp (https://turbowarp.org/)
2. Click on "Extensions" (bottom left)
3. Select "Load Extension from URL"
4. Enter the URL to the `tooltip.js` file or load it locally
5. The "Tooltips" extension will appear in your block palette

## Block Categories

### Display & Position

#### `show tooltip [TEXT] at x: [X] y: [Y]`
Display a tooltip at fixed stage coordinates. Coordinates use Scratch's standard coordinate system (center origin, x: -240 to 240, y: -180 to 180).

**Example:**
```
show tooltip [Welcome to the game!] at x: [0] y: [100]
```

#### `show tooltip [TEXT] following cursor`
Display a tooltip that follows the mouse cursor with a small default offset.

**Example:**
```
show tooltip [**Inventory:** 5 items] following cursor
```

#### `show tooltip [TEXT] following cursor with offset x: [X] y: [Y]`
Display a tooltip following the cursor with a custom pixel offset.

**Example:**
```
show tooltip [HP: 100] following cursor with offset x: [15] y: [15]
```

#### `hide tooltip`
Hide the currently displayed tooltip.

**Example:**
```
hide tooltip
```

#### `set tooltip position mode to [MODE]`
Set the positioning mode. Options: `fixed` or `follow cursor`.

**Example:**
```
set tooltip position mode to [follow cursor]
```

### Styling - Font & Text

#### `set tooltip font to [FONT]`
Set the font family. The dropdown provides common fonts, but you can also **type any CSS font-family value** directly into the input field.

**Common fonts in dropdown:** Arial, Helvetica, Times New Roman, Courier, Verdana, Georgia, Comic Sans MS, and more.

**Examples:**
```
set tooltip font to [Courier New]
set tooltip font to [Roboto]
set tooltip font to [Comic Sans MS, cursive]
set tooltip font to ["Segoe UI", Tahoma, sans-serif]
```

**Tip:** You can use any valid CSS font-family, including web fonts, system fonts, or font stacks with fallbacks.

#### `set tooltip font size to [SIZE]`
Set the font size in pixels. Default: 14.

**Example:**
```
set tooltip font size to [16]
```

#### `set tooltip text color to [COLOR]`
Set the text color using the color picker.

**Example:**
```
set tooltip text color to [#00ff00]
```

### Styling - Background

#### `set tooltip background color to [COLOR]`
Set the background color using the color picker.

**Example:**
```
set tooltip background color to [#1a1a1a]
```

#### `set tooltip background opacity to [OPACITY]%`
Set the background opacity (0-100%). Default: 90.

**Example:**
```
set tooltip background opacity to [80]%
```

### Styling - Border

#### `set tooltip border color to [COLOR]`
Set the border color using the color picker.

**Example:**
```
set tooltip border color to [#ffffff]
```

#### `set tooltip border width to [WIDTH]px`
Set the border width in pixels. Default: 1.

**Example:**
```
set tooltip border width to [2]px
```

#### `set tooltip border radius to [RADIUS]px`
Set the border radius for rounded corners. Default: 4.

**Example:**
```
set tooltip border radius to [8]px
```

### Styling - Size

#### `set tooltip padding to [PADDING]px`
Set the internal padding in pixels. Default: 10.

**Example:**
```
set tooltip padding to [15]px
```

#### `set tooltip width to [WIDTH]px`
Set a fixed width in pixels. Use 0 for auto-width. Default: 0.

**Example:**
```
set tooltip width to [200]px
```

#### `set tooltip max width to [WIDTH]px`
Set the maximum width in pixels. Default: 300.

**Example:**
```
set tooltip max width to [400]px
```

### Styling - Images

#### `set tooltip image max width to [WIDTH]px`
Set the maximum width for images in pixels. Use 0 for auto/no limit. Default: 0.

**Example:**
```
set tooltip image max width to [200]px
```

#### `set tooltip image max height to [HEIGHT]px`
Set the maximum height for images in pixels. Use 0 for auto/no limit. Default: 0.

**Example:**
```
set tooltip image max height to [150]px
```

#### `set tooltip image border radius to [RADIUS]px`
Set the border radius for block images (rounded corners). Default: 4.

**Example:**
```
set tooltip image border radius to [8]px
```

#### `set tooltip inline image size to [SIZE]px`
Set the size (height) for inline images in pixels. Width scales automatically. Default: 20.

**Example:**
```
set tooltip inline image size to [24]px
```

### Styling - Shadow

#### `set tooltip shadow [ENABLED]`
Enable or disable the shadow effect. Options: `enabled` or `disabled`.

**Example:**
```
set tooltip shadow [enabled]
```

#### `set tooltip shadow to x:[X] y:[Y] blur:[BLUR] color:[COLOR]`
Set custom shadow properties.

**Example:**
```
set tooltip shadow to x:[3] y:[3] blur:[6] color:[#000000]
```

#### `set tooltip z-index to [ZINDEX]`
Set the z-index for layering control. Default: 10000.

**Example:**
```
set tooltip z-index to [99999]
```

### Behavior & Animation

#### `set tooltip auto-hide to [ENABLED]`
Enable or disable automatic hiding. Options: `enabled` or `disabled`.

**Example:**
```
set tooltip auto-hide to [enabled]
```

#### `set tooltip auto-hide duration to [DURATION] seconds`
Set the duration before auto-hiding (in seconds). Default: 3.

**Example:**
```
set tooltip auto-hide duration to [5] seconds
```

#### `set tooltip fade duration to [DURATION] ms`
Set the fade animation duration in milliseconds. Default: 200.

**Example:**
```
set tooltip fade duration to [300] ms
```

#### `set tooltip fade in [ENABLED]`
Enable or disable fade-in animation. Options: `enabled` or `disabled`.

**Example:**
```
set tooltip fade in [enabled]
```

#### `set tooltip fade out [ENABLED]`
Enable or disable fade-out animation. Options: `enabled` or `disabled`.

**Example:**
```
set tooltip fade out [enabled]
```

### Reporters

#### `tooltip visible?`
Boolean reporter that returns `true` if a tooltip is currently visible.

**Example:**
```
if <tooltip visible?> then
  hide tooltip
end
```

#### `tooltip text`
Returns the current tooltip text content.

**Example:**
```
say (tooltip text)
```

#### `tooltip x position`
Returns the current tooltip x coordinate (in Scratch coordinate system).

**Example:**
```
set [x] to (tooltip x position)
```

#### `tooltip y position`
Returns the current tooltip y coordinate (in Scratch coordinate system).

**Example:**
```
set [y] to (tooltip y position)
```

#### `tooltip mode`
Returns the current positioning mode: `"fixed"` or `"follow cursor"`.

**Example:**
```
if <(tooltip mode) = [fixed]> then
  // do something
end
```

## Markdown Support

The tooltip extension supports full markdown formatting:

### Headers
```
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting
```
**bold text**
*italic text*
~~strikethrough text~~
`inline code`
```

### Code Blocks
```
```code block```
```

### Lists
```
* Bullet item 1
* Bullet item 2

1. Numbered item 1
2. Numbered item 2
```

### Links
```
[Click here](https://example.com)
```
Links are clickable and open in a new tab.

### Block Images
```
![Alt text](https://example.com/image.png)
```
Display images as centered blocks within tooltips. The alt text will be used as the tooltip for the image.

### Inline Images (Emoji-Style)
```
{img:https://example.com/icon.png}
```
Display small images inline with text, like emojis. You can also provide alt text:
```
{img:https://example.com/icon.png:Icon description}
```

**Examples:**
```
Hello {img:https://example.com/wave.png} how are you?
I love {img:https://example.com/heart.png:heart} this feature!
Click here {img:https://example.com/arrow.png} to continue
```

### Images with Links
```
[![Alt text](https://example.com/image.png)](https://example.com)
```
Make images clickable by wrapping them in a link. Clicking the image will open the link in a new tab.

### Custom Color Syntax
Use the custom color syntax to add colored text:
```
{color:red}This is red text{/color}
{color:#4dabf7}This is blue text{/color}
{color:rgb(255,100,50)}RGB colors work too{/color}
```

You can mix markdown with colors:
```
{color:gold}**Important:** This is bold and gold!{/color}
```

## Usage Examples

### Example 1: Simple Welcome Tooltip
```
When green flag clicked
set tooltip font to [Arial]
set tooltip font size to [16]
set tooltip background color to [#2c3e50]
set tooltip text color to [#ecf0f1]
show tooltip [Welcome to my game!] at x: [0] y: [150]
wait [3] seconds
hide tooltip
```

### Example 2: Cursor-Following Info Display
```
When green flag clicked
set tooltip auto-hide to [disabled]
set tooltip fade in [enabled]
show tooltip [# Player Stats
HP: 100
Mana: 75
Level: 5] following cursor with offset x: [10] y: [10]
```

### Example 3: Colored Markdown Tooltip
```
When green flag clicked
show tooltip [{color:gold}**LEGENDARY ITEM**{/color}

{color:cyan}Sword of Power{/color}

+50 Attack
+25 Defense

*Deals extra damage to enemies*] at x: [0] y: [0]
```

### Example 4: Interactive Help System
```
When sprite clicked
if <tooltip visible?> then
  hide tooltip
else
  set tooltip background color to [#ffffff]
  set tooltip text color to [#000000]
  set tooltip border color to [#3498db]
  set tooltip border width to [2]px
  set tooltip border radius to [10]px
  show tooltip [## Help

Click objects to interact
Press space to jump
Collect all stars to win!] following cursor
end
```

### Example 5: Auto-Hide Notification
```
When [space v] key pressed
set tooltip auto-hide to [enabled]
set tooltip auto-hide duration to [2] seconds
set tooltip background color to [#27ae60]
set tooltip text color to [#ffffff]
show tooltip [✓ Item collected!] at x: [0] y: [100]
```

### Example 6: Code Documentation Tooltip
```
When this sprite clicked
show tooltip [## Function: `calculateScore()`

**Parameters:**
* `points` - Number of points
* `multiplier` - Score multiplier

**Returns:** Final calculated score

```javascript
function calculateScore(points, multiplier) {
  return points * multiplier;
}```] at x: [150] y: [100]
```

### Example 7: Custom Styled Tooltip
```
When green flag clicked
set tooltip font to [Georgia]
set tooltip font size to [18]
set tooltip text color to [#ffffff]
set tooltip background color to [#8e44ad]
set tooltip background opacity to [95]%
set tooltip border color to [#9b59b6]
set tooltip border width to [3]px
set tooltip border radius to [15]px
set tooltip padding to [20]px
set tooltip shadow to x:[4] y:[4] blur:[8] color:[#000000]
set tooltip max width to [350]px
show tooltip [*Elegantly styled tooltip with custom settings*] at x: [0] y: [0]
```

### Example 8: Using Custom Web Fonts
```
When green flag clicked
// Click on the font field and type ANY CSS font name!
set tooltip font to [Roboto]
// Or use font stacks with fallbacks:
set tooltip font to [Helvetica, Arial, sans-serif]
// Or use system UI fonts:
set tooltip font to [-apple-system, BlinkMacSystemFont, "Segoe UI"]
show tooltip [**Custom Font Example**
This tooltip uses a web font!] at x: [0] y: [0]
```

**Tip:** While the dropdown shows common fonts, you can type any CSS font-family value directly into the font field!

### Example 9: Image Tooltip
```
When green flag clicked
set tooltip image max width to [150]px
set tooltip background color to [#1a1a1a]
set tooltip text color to [#ffffff]
show tooltip [# Character Info

![Character Avatar](https://example.com/avatar.png)

**Name:** Hero
**Level:** 25
**HP:** 100/100] at x: [0] y: [0]
```

### Example 10: Clickable Image Tooltip
```
When this sprite clicked
set tooltip image max width to [200]px
set tooltip image border radius to [10]px
show tooltip [## Click to Visit

[![Website Logo](https://example.com/logo.png)](https://example.com)

*Click the image to visit our website*] following cursor
```

### Example 11: Image Gallery Tooltip
```
When green flag clicked
set tooltip image max width to [120]px
set tooltip max width to [400]px
show tooltip [## Item Gallery

![Sword](https://example.com/sword.png)
![Shield](https://example.com/shield.png)
![Potion](https://example.com/potion.png)

*Hover over items for more info*] at x: [0] y: [100]
```

### Example 12: Inline Images in Text
```
When green flag clicked
set tooltip inline image size to [20]px
show tooltip [Welcome {img:https://example.com/wave.png} to the game!

Press {img:https://example.com/space-key.png} to jump
Use {img:https://example.com/arrow-keys.png} to move

Good luck {img:https://example.com/thumbs-up.png}!] at x: [0] y: [0]
```

### Example 13: Status Indicators
```
When this sprite clicked
set tooltip inline image size to [16]px
show tooltip [## Player Status

{img:https://example.com/health.png} HP: 100/100
{img:https://example.com/mana.png} Mana: 75/100
{img:https://example.com/gold.png} Gold: 500

{img:https://example.com/checkmark.png} Quest Complete!] following cursor
```

### Example 14: Mixed Images
```
When green flag clicked
set tooltip image max width to [150]px
set tooltip inline image size to [18]px
show tooltip [# Character Profile

![Avatar](https://example.com/avatar.png)

**Name:** Hero {img:https://example.com/star.png}
**Level:** 25 {img:https://example.com/level-up.png}
**Status:** Online {img:https://example.com/online.png}

*Click to view details*] at x: [0] y: [0]
```

## Technical Details

- **Extension ID:** `tooltips`
- **Extension Name:** Tooltips
- **Color Scheme:** Purple (#9966ff, #855cd6, #774dcb)
- **Runs unsandboxed** for DOM manipulation
- **Performance optimized** with debounced cursor tracking (~60fps)
- **Viewport aware** - tooltips automatically adjust to stay on screen
- **Memory safe** - proper cleanup of event listeners

## Coordinate System

Tooltips use Scratch's coordinate system for fixed positioning:
- Origin (0, 0) is at the center of the stage
- X ranges from -240 (left) to +240 (right)
- Y ranges from -180 (bottom) to +180 (top)

For cursor-following mode, screen pixel coordinates are used with the specified offset.

## Performance Considerations

- Cursor following is throttled to ~60fps for smooth performance
- Markdown parsing is optimized for common patterns
- DOM updates are minimized
- Event listeners are properly cleaned up when tooltip is hidden

## Browser Compatibility

Works in all modern browsers that support TurboWarp:
- Chrome/Chromium
- Firefox
- Edge
- Safari

## Tips & Best Practices

1. **Use auto-hide for notifications**: Enable auto-hide for temporary messages
2. **Disable animations for instant tooltips**: Set fade in/out to disabled for instant display
3. **Adjust z-index if needed**: If tooltips appear behind other elements, increase the z-index
4. **Use markdown for rich content**: Take advantage of headers, lists, and formatting
5. **Test color combinations**: Ensure text is readable against the background
6. **Consider tooltip width**: Set max-width appropriately for your content
7. **Use cursor offset**: Add offset when following cursor to prevent blocking the pointer
8. **Custom fonts**: Click on the font field and type any CSS font-family - not limited to dropdown options!
9. **Image sizing**: Use image max width/height to control block image dimensions. Set to 0 for no limit
10. **Clickable images**: Wrap images in links to make them clickable: `[![alt](image.png)](link.com)`
11. **Image tooltips**: The alt text of images serves as the native HTML tooltip when hovering over the image
12. **Inline images**: Use `{img:url}` for emoji-style inline images within text
13. **Inline image size**: Adjust inline image size with the block (default 20px) - great for icons and emojis
14. **Mix image types**: You can use both block images `![alt](url)` and inline images `{img:url}` in the same tooltip

## Troubleshooting

**Tooltip doesn't appear:**
- Check that the text is not empty
- Verify the tooltip is not hidden behind other elements (try increasing z-index)
- Ensure coordinates are within reasonable bounds

**Markdown not rendering:**
- Check markdown syntax is correct
- Remember to use proper spacing and line breaks
- Test with simple markdown first

**Colors not working:**
- Use proper hex color format (#RRGGBB)
- Named colors (red, blue, etc.) are supported
- Try using the color picker for consistent results

**Cursor following is jumpy:**
- This is normal throttling for performance
- The tooltip updates at ~60fps
- Adjust offset if needed

**Images not displaying:**
- Verify the image URL is correct and accessible
- Check browser console for CORS or loading errors
- Ensure the image format is supported (PNG, JPG, GIF, SVG, etc.)
- Try using a direct image URL (ending in .png, .jpg, etc.)

**Images too large/small:**
- Use `set tooltip image max width` and `set tooltip image max height` blocks
- Set to 0 for no limit, or specific pixel values to constrain size
- Images maintain aspect ratio automatically

## License

This extension is open source and free to use in your TurboWarp projects.

## Author

Created for the TurboWarp community.

## Version

1.0.0 - Initial release
