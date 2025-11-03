# Tooltips Extension - Complete Blocks Reference

Quick reference guide for all available blocks in the TurboWarp Tooltips Extension.

## Display & Position Blocks

### Commands

| Block | Description |
|-------|-------------|
| `show tooltip [TEXT] at x: [X] y: [Y]` | Display tooltip at fixed stage coordinates |
| `show tooltip [TEXT] following cursor` | Display tooltip that follows the mouse cursor |
| `show tooltip [TEXT] following cursor with offset x: [X] y: [Y]` | Display tooltip following cursor with custom pixel offset |
| `hide tooltip` | Hide the currently displayed tooltip |
| `set tooltip position mode to [MODE]` | Set positioning mode (fixed / follow cursor) |

**Default Values:**
- X: 0
- Y: 0
- Offset X: 10
- Offset Y: 10
- Mode: fixed

---

## Styling Blocks

### Font & Text

| Block | Description | Default |
|-------|-------------|---------|
| `set tooltip font to [FONT]` | Set font family from dropdown | Arial |
| `set tooltip font size to [SIZE]` | Set font size in pixels | 14 |
| `set tooltip text color to [COLOR]` | Set text color (color picker) | #ffffff |

**Available Fonts:**
- Arial
- Helvetica
- Times New Roman
- Courier
- Courier New
- Verdana
- Georgia
- Comic Sans MS
- Trebuchet MS
- Impact
- monospace
- sans-serif
- serif

### Background

| Block | Description | Default |
|-------|-------------|---------|
| `set tooltip background color to [COLOR]` | Set background color (color picker) | #000000 |
| `set tooltip background opacity to [OPACITY]%` | Set background opacity (0-100%) | 90 |

### Border

| Block | Description | Default |
|-------|-------------|---------|
| `set tooltip border color to [COLOR]` | Set border color (color picker) | #ffffff |
| `set tooltip border width to [WIDTH]px` | Set border width in pixels | 1 |
| `set tooltip border radius to [RADIUS]px` | Set corner radius in pixels | 4 |

### Size

| Block | Description | Default |
|-------|-------------|---------|
| `set tooltip padding to [PADDING]px` | Set internal padding in pixels | 10 |
| `set tooltip width to [WIDTH]px` | Set fixed width (0 = auto) | 0 |
| `set tooltip max width to [WIDTH]px` | Set maximum width in pixels | 300 |

### Shadow

| Block | Description | Default |
|-------|-------------|---------|
| `set tooltip shadow [ENABLED]` | Enable or disable shadow | enabled |
| `set tooltip shadow to x:[X] y:[Y] blur:[BLUR] color:[COLOR]` | Custom shadow settings | x:2, y:2, blur:4, color:#000000 |
| `set tooltip z-index to [ZINDEX]` | Set layering priority | 10000 |

---

## Behavior & Animation Blocks

| Block | Description | Default |
|-------|-------------|---------|
| `set tooltip auto-hide to [ENABLED]` | Enable auto-hide after duration | disabled |
| `set tooltip auto-hide duration to [DURATION] seconds` | Set auto-hide delay in seconds | 3 |
| `set tooltip fade duration to [DURATION] ms` | Set fade animation duration in ms | 200 |
| `set tooltip fade in [ENABLED]` | Enable fade-in animation | enabled |
| `set tooltip fade out [ENABLED]` | Enable fade-out animation | enabled |

**Options:** enabled / disabled

---

## Reporter Blocks

### Boolean Reporter

| Block | Returns | Description |
|-------|---------|-------------|
| `tooltip visible?` | Boolean | True if tooltip is currently displayed |

### Value Reporters

| Block | Returns | Description |
|-------|---------|-------------|
| `tooltip text` | String | Current tooltip text content |
| `tooltip x position` | Number | Current x coordinate (Scratch coords) |
| `tooltip y position` | Number | Current y coordinate (Scratch coords) |
| `tooltip mode` | String | Current positioning mode ("fixed" or "follow cursor") |

---

## Markdown Syntax Support

### Text Formatting

| Markdown | Result |
|----------|--------|
| `**bold text**` | **bold text** |
| `*italic text*` | *italic text* |
| `~~strikethrough~~` | ~~strikethrough~~ |
| `` `inline code` `` | `inline code` |

### Headers

| Markdown | Result |
|----------|--------|
| `# Heading 1` | Large header |
| `## Heading 2` | Medium header |
| `### Heading 3` | Small header |

### Code Blocks

```
```code block```
```

Use triple backticks for multi-line code blocks.

### Lists

**Unordered:**
```
* Item 1
* Item 2
* Item 3
```

**Ordered:**
```
1. First item
2. Second item
3. Third item
```

### Links

```
[Link Text](https://example.com)
```

Creates clickable link that opens in new tab.

### Custom Color Syntax

```
{color:red}red text{/color}
{color:#FF5733}hex color{/color}
{color:rgb(255,100,50)}rgb color{/color}
```

**Supported color formats:**
- Named colors: red, blue, green, yellow, purple, orange, cyan, magenta, etc.
- Hex colors: #RGB or #RRGGBB
- RGB colors: rgb(r, g, b)
- Any valid CSS color value

---

## Block Categories in Scratch

Blocks are organized into the following categories in the Tooltips extension:

1. **Display & Position** (5 blocks)
2. **Styling - Font & Text** (3 blocks)
3. **Styling - Background** (2 blocks)
4. **Styling - Border** (3 blocks)
5. **Styling - Size** (3 blocks)
6. **Styling - Shadow** (3 blocks)
7. **Behavior & Animation** (5 blocks)
8. **Reporters** (5 blocks)

**Total:** 29 blocks

---

## Usage Patterns

### Basic Pattern
```
When green flag clicked
// Configure styling
set tooltip background color to [#1a1a1a]
set tooltip text color to [#00ff00]

// Show tooltip
show tooltip [Hello World!] at x: [0] y: [100]

// Hide after delay
wait [3] seconds
hide tooltip
```

### Cursor Following Pattern
```
When [this sprite v] clicked
set tooltip auto-hide to [disabled]
show tooltip [Info text here] following cursor with offset x: [15] y: [15]

When [other event v]
hide tooltip
```

### Auto-Hide Pattern
```
When something happens
set tooltip auto-hide to [enabled]
set tooltip auto-hide duration to [2] seconds
show tooltip [Notification!] at x: [0] y: [100]
// Automatically hides after 2 seconds
```

### Conditional Display Pattern
```
forever
  if <(distance to [mouse-pointer v]) < [50]> then
    if <not <tooltip visible?>> then
      show tooltip [Hover info] following cursor
    end
  else
    if <tooltip visible?> then
      hide tooltip
    end
  end
end
```

---

## Performance Tips

1. **Fixed vs. Cursor Following:**
   - Fixed position: Minimal overhead
   - Cursor following: ~60fps throttled updates

2. **Content Updates:**
   - Avoid updating tooltip text every frame
   - Use conditional checks to minimize updates

3. **Markdown Complexity:**
   - Simple text: Fastest
   - Complex markdown: Slightly slower parsing
   - Keep content reasonable in size

4. **Animations:**
   - Fade animations use CSS transitions (efficient)
   - Can disable animations for instant display

5. **Multiple Tooltips:**
   - Only one tooltip can be shown at a time
   - New tooltip replaces previous one

---

## Color Reference

### Common Named Colors

| Color Name | Appearance |
|------------|------------|
| red | Red |
| blue | Blue |
| green | Green |
| yellow | Yellow |
| orange | Orange |
| purple | Purple |
| cyan | Cyan |
| magenta | Magenta |
| white | White |
| black | Black |
| gray / grey | Gray |
| gold | Gold |
| silver | Silver |
| pink | Pink |
| brown | Brown |
| lime | Lime |

### Hex Color Format

- 3-digit: `#RGB` (e.g., `#F00` = red)
- 6-digit: `#RRGGBB` (e.g., `#FF0000` = red)

---

## Quick Start Checklist

- [ ] Load extension in TurboWarp
- [ ] Test basic display: `show tooltip [Test] at x: [0] y: [0]`
- [ ] Configure styling (colors, fonts)
- [ ] Try markdown formatting
- [ ] Test cursor following mode
- [ ] Configure animations (fade in/out)
- [ ] Set up auto-hide if needed
- [ ] Test reporter blocks for interactive features

---

## Extension Info

- **Extension ID:** tooltips
- **Extension Name:** Tooltips
- **Version:** 1.0.0
- **Color Scheme:** Purple (#9966ff, #855cd6, #774dcb)
- **Requires:** Unsandboxed mode
- **Compatible:** All modern browsers (Chrome, Firefox, Edge, Safari)

---

For detailed examples and tutorials, see:
- [tooltip-README.md](tooltip-README.md) - Full documentation
- [tooltip-examples.md](tooltip-examples.md) - Usage examples
- [tooltip-test.html](tooltip-test.html) - Interactive test page
