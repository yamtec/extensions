# Mobile Tooltip Interactions

This document describes the mobile-specific tooltip interactions added to the TurboWarp Tooltips Extension.

## Overview

The mobile tooltip feature provides touch-friendly tooltip interactions specifically designed for mobile devices. When enabled, tooltips respond to tap gestures instead of hover, and can only be dismissed via a dedicated close button.

## Features

### Mobile-Only Interactions

- **Tap to Show**: Tooltips appear when tapping target elements (not hover)
- **Close Button Dismissal**: Tooltips display a close button (×) in the top-right corner
- **No Other Dismiss Methods**: Tap-outside and auto-hide are disabled in mobile mode
- **Touch-Optimized**: Close button is sized for easy tapping (28x28px)

### Desktop Compatibility

- Desktop hover-based tooltips remain completely unchanged
- Mobile mode is opt-in and can be toggled on/off
- When disabled, all mobile-specific behaviors are removed

## Block Reference

### Mobile Mode

#### `enable mobile mode`
Enables mobile tooltip interactions. This must be called before attaching tooltips to elements.

**Example:**
```
enable mobile mode
```

#### `disable mobile mode`
Disables mobile mode and removes all mobile tooltip attachments.

**Example:**
```
disable mobile mode
```

#### `attach tooltip [TEXT] to element [SELECTOR]`
Attaches a tooltip to one or more DOM elements. The tooltip will appear when the element is tapped.

**Parameters:**
- `TEXT`: The tooltip content (supports markdown)
- `SELECTOR`: A CSS selector to identify the target element(s)

**Examples:**
```
attach tooltip [Tap here for more info] to element [.info-button]
attach tooltip [**Score:** 100 points] to element [#score-display]
attach tooltip [Help text] to element [button.help]
```

**Common CSS Selectors:**
- `.className` - Elements with a specific class
- `#elementId` - Element with a specific ID
- `button` - All button elements
- `[data-tooltip]` - Elements with a specific attribute
- `.parent .child` - Nested elements

#### `detach tooltip from element [SELECTOR]`
Removes the tooltip from specific element(s).

**Example:**
```
detach tooltip from element [.info-button]
```

#### `detach all mobile tooltips`
Removes all mobile tooltip attachments at once.

**Example:**
```
detach all mobile tooltips
```

#### `mobile mode enabled?` (Boolean Reporter)
Returns true if mobile mode is currently enabled.

**Example:**
```
if <mobile mode enabled?> then
  attach tooltip [Mobile tooltip] to element [.target]
else
  show tooltip [Desktop tooltip] at x: [0] y: [0]
end
```

## Usage Examples

### Basic Mobile Tooltip

```scratch
when green flag clicked
enable mobile mode
attach tooltip [Tap me!] to element [.my-button]
```

### Multiple Tooltips with Markdown

```scratch
when green flag clicked
enable mobile mode
attach tooltip [**Player:** John\n*Level:* 5] to element [#player-info]
attach tooltip [# Help\nClick here for assistance] to element [.help-icon]
attach tooltip [`Score: 1000`] to element [.score-display]
```

### Toggle Between Desktop and Mobile

```scratch
when green flag clicked
if <(device type) = [mobile]> then
  enable mobile mode
  attach tooltip [Mobile tooltip] to element [.info]
else
  show tooltip [Desktop tooltip] following cursor
end
```

### Cleanup on Scene Change

```scratch
when I receive [change scene]
detach all mobile tooltips
disable mobile mode
```

## Technical Details

### How It Works

1. **Element Attachment**: When you attach a tooltip to an element, a touch event listener is added
2. **Tap Detection**: The extension listens for `touchstart` events on the target element
3. **Position Calculation**: The tooltip appears near the tapped element (using Scratch coordinates)
4. **Close Button**: A close button (×) is automatically added to the tooltip in mobile mode
5. **Dismissal**: Only clicking/tapping the close button will hide the tooltip

### CSS Selectors

The `attach tooltip to element` block uses CSS selectors to find elements. Here are common patterns:

| Selector | Description | Example |
|----------|-------------|---------|
| `.class` | Elements with class | `.btn` finds `<div class="btn">` |
| `#id` | Element with ID | `#header` finds `<div id="header">` |
| `element` | Elements by tag | `button` finds all `<button>` elements |
| `[attr]` | Elements with attribute | `[data-tooltip]` finds elements with that attribute |
| `.a.b` | Elements with both classes | `.btn.primary` |
| `.a .b` | Descendants | `.container .item` |
| `.a > .b` | Direct children | `.list > .item` |

### Mobile Mode Behavior Changes

When mobile mode is enabled:

| Behavior | Desktop Mode | Mobile Mode |
|----------|--------------|-------------|
| Tooltip trigger | Hover / Manual | Tap on element |
| Close method | Manual hide / Auto-hide | Close button only |
| Close button | Hidden | Visible (top-right) |
| Auto-hide | Works if enabled | Disabled |
| Tap outside | N/A | Does not dismiss |

## Close Button Styling

The close button has the following characteristics:

- **Size**: 28x28 pixels (easy to tap on mobile)
- **Position**: Absolute, top-right corner (4px from edges)
- **Icon**: × symbol (Unicode multiplication sign)
- **Background**: Semi-transparent white (rgba(255, 255, 255, 0.2))
- **Hover Effect**: Becomes brighter on hover/tap
- **Color**: White text (#ffffff)
- **Font**: 24px bold
- **Interactive**: Supports both mouse and touch events

The close button styling is consistent with the tooltip's overall design and automatically adapts to your custom tooltip styling.

## Integration with Mobile Detection

The mobile mode is designed to work with an external mobile detection system (extension or logic):

```scratch
when green flag clicked
set [isMobile] to (detect mobile device)
if <(isMobile) = [true]> then
  enable mobile mode
  // Set up mobile tooltips
  attach tooltip [Info] to element [.info-icon]
else
  // Use desktop hover tooltips
  show tooltip [Info] following cursor
end
```

## Best Practices

### Do's ✓

- **Enable mobile mode first** before attaching tooltips
- **Use clear, concise tooltip text** for mobile screens
- **Provide visual feedback** on tap targets (CSS active states)
- **Clean up tooltips** when changing scenes or states
- **Test on actual mobile devices** to verify touch interactions

### Don'ts ✗

- **Don't rely on hover** in mobile mode (it won't work)
- **Don't attach tooltips to elements that don't exist** (check selectors)
- **Don't forget to detach** tooltips before removing elements
- **Don't use tiny tap targets** (make buttons/elements large enough)
- **Don't block important UI** with tooltips

## Troubleshooting

### Tooltip doesn't appear on tap

**Possible causes:**
- Mobile mode is not enabled → Call `enable mobile mode` first
- CSS selector doesn't match any elements → Check the selector syntax
- Element is not yet in the DOM → Attach tooltip after element is created
- Touch events are being prevented elsewhere → Check for conflicting event handlers

**Solution:**
```scratch
when green flag clicked
wait until <element exists>
enable mobile mode
attach tooltip [Text] to element [.selector]
```

### Close button not visible

**Possible causes:**
- Mobile mode is not enabled when showing the tooltip
- Tooltip was shown using desktop methods (show tooltip at x:y)

**Solution:**
Use mobile mode and attach tooltips to elements rather than showing them at coordinates.

### Multiple tooltips show at once

This is expected behavior. Each tap opens a new tooltip. If you want only one tooltip at a time:

```scratch
when tap detected
hide tooltip
attach tooltip [New tooltip] to element [.target]
```

### Tooltip doesn't detach

**Possible causes:**
- CSS selector doesn't match the original element
- Element was removed from DOM before detaching

**Solution:**
Use `detach all mobile tooltips` to clean up everything:
```scratch
detach all mobile tooltips
```

## Examples Repository

See `tooltip-mobile-test.html` for a complete working example with multiple test cases demonstrating:
- Basic mobile tooltip attachment
- Multiple tooltips on different elements
- Styled tooltips with markdown
- Close button functionality
- Desktop vs mobile mode comparison

## Browser Compatibility

Mobile tooltips work in all modern mobile browsers:
- Safari (iOS)
- Chrome (Android)
- Firefox (Android)
- Samsung Internet
- Edge Mobile

**Note:** Touch events are used for tap detection, which are supported by all modern mobile browsers.

## Performance Considerations

- **Memory**: Each attached tooltip stores a reference to the element and listener
- **Event Listeners**: Use `detach all mobile tooltips` to clean up when no longer needed
- **Re-attachment**: Attaching a tooltip to the same element twice will replace the old listener
- **Best Practice**: Attach tooltips once and keep them attached, rather than repeatedly attaching/detaching

## Future Enhancements

Potential future additions (not currently implemented):
- Custom close button styling options
- Swipe-to-dismiss gesture
- Tooltip positioning options (above, below, left, right of tap target)
- Vibration feedback on tap
- Multiple tooltips with Z-index management
- Tooltip animations (slide, scale, etc.)

---

**Last Updated:** 2024
**Extension Version:** 1.0.0 (with mobile support)
