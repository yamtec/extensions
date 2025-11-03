# Inline Images Feature

## What Are Inline Images?

Inline images are small images that appear **within text**, just like emojis! They're perfect for adding icons, status indicators, and visual flair to your tooltips without breaking the text flow.

## Quick Start

### Basic Syntax
```
{img:https://example.com/icon.png}
```

### With Alt Text
```
{img:https://example.com/icon.png:Description}
```

### Real Examples
```
Hello {img:wave.png} how are you?
Press {img:space-key.png} to jump
I love {img:heart.png} this feature!
Status: {img:online.png} Online
```

## Comparison: Block vs Inline Images

| Feature | Block Images `![](url)` | Inline Images `{img:url}` |
|---------|------------------------|---------------------------|
| Display | Centered, separate line | Inline with text |
| Size Control | Max width/height | Fixed height (default 20px) |
| Use Case | Photos, large graphics | Icons, emojis, indicators |
| Border Radius | Customizable | None (as-is) |
| Spacing | 8px margins top/bottom | 2px margins left/right |
| Vertical Align | N/A | Middle of text line |

## Use Cases

### 1. Status Indicators
```scratch
show tooltip [**Player Status:**

{img:health.png} HP: 100/100
{img:mana.png} Mana: 75/100
{img:gold.png} Gold: 500]
```

### 2. Control Instructions
```scratch
show tooltip [## Controls

{img:up-arrow.png} Jump
{img:left-arrow.png}{img:right-arrow.png} Move
{img:spacebar.png} Attack]
```

### 3. Achievement Notifications
```scratch
show tooltip [{img:trophy.png} Achievement Unlocked!

{img:star.png} Score Master

You earned 1000 points! {img:party.png}]
```

### 4. Mixed with Block Images
```scratch
show tooltip [# Hero Profile

![Hero Avatar](avatar.png)

**Name:** Brave Hero {img:star.png}
**Level:** 25 {img:level-up.png}
**Status:** {img:online.png} Online]
```

## Styling Block

Control the size of inline images:

```scratch
set tooltip inline image size to [SIZE]px
```

- **Default:** 20px
- **Recommended range:** 12-24px
- **Small icons:** 12-16px
- **Medium icons:** 18-24px
- **Large icons:** 24-32px

Height is set to the specified size, width scales automatically.

## Best Practices

### ✅ DO
- Use small, square images (they scale better)
- Keep inline images at similar sizes for consistency
- Use for icons, emojis, and small indicators
- Test your images at the target size
- Use descriptive alt text when helpful

### ❌ DON'T
- Use large photos as inline images
- Mix wildly different sizes in the same line
- Use inline images for detailed graphics
- Forget to set inline image size if default doesn't work
- Use overly complex images that won't be clear when small

## Common Image Sizes

| Type | Recommended Size | Example Use |
|------|------------------|-------------|
| Tiny Icons | 12-14px | Bullet points, small indicators |
| Small Icons | 16-18px | Status icons, inline symbols |
| Default | 20px | General purpose emojis/icons |
| Medium Icons | 22-24px | Emphasis icons, larger indicators |
| Large Icons | 26-32px | Hero icons, main feature icons |

## Where to Get Icons

### Free Icon Sources
- **Twemoji** - Twitter's emoji set (free, open source)
- **Font Awesome** - Thousands of icons (free tier available)
- **Icons8** - Large collection (free with attribution)
- **Flaticon** - Icon marketplace (free and paid)
- **Noun Project** - Simple icons (free with attribution)

### Tips for Icon Selection
1. Choose simple, clear designs
2. Use consistent style across all icons
3. Prefer square or near-square aspect ratios
4. Test at small sizes before using
5. Use PNG with transparency for best results

## Technical Details

### CSS Properties Applied
```css
display: inline;
height: [inline image size]px;
width: auto;
vertical-align: middle;
margin: 0 2px;
border-radius: 0px;
```

### Parsing Order
Inline images are parsed early in the markdown pipeline, right after color syntax and before other formatting. This ensures they work correctly with other markdown features.

### Performance
- Inline images load asynchronously
- Multiple small images load faster than one large image
- Browser caching helps with repeated use of same icons
- Consider using a CDN for faster loading

## Examples with Real URLs

### Using Placeholder Images
```scratch
show tooltip [Status: {img:https://via.placeholder.com/20/00ff00/ffffff?text=✓} Online

Level {img:https://via.placeholder.com/20/ffaa00/ffffff?text=25} 25]
```

### Using Scratch Logo
```scratch
show tooltip [Made with {img:https://scratch.mit.edu/images/logo_sm.png:Scratch} Scratch!]
```

## Troubleshooting

**Images not appearing inline:**
- Check the syntax: `{img:url}` not `{img url}` or `{img: url}`
- Verify no extra spaces inside the braces
- Ensure URL is accessible

**Images too large/small:**
- Use `set tooltip inline image size to [SIZE]px` block
- Adjust size before showing tooltip
- Typical range is 12-24px

**Images not aligned with text:**
- This is automatic - no adjustment needed
- If it looks off, the source image may have unusual dimensions
- Try a different image or adjust size

**Images look blurry:**
- Use images that are slightly larger than display size
- Prefer vector formats (SVG) when possible
- Use 2x resolution images for retina displays

## FAQ

**Q: Can I use inline and block images together?**
A: Yes! Mix both types in the same tooltip.

**Q: Do inline images work with all markdown?**
A: Yes, use them anywhere in text, including with bold, italic, colors, etc.

**Q: Can inline images be links?**
A: Not directly. Use block images with links instead: `[![alt](img)](url)`

**Q: What's the best image format?**
A: PNG with transparency for icons, SVG for scalable graphics, JPG for photos.

**Q: How many inline images can I use?**
A: No limit, but keep it reasonable for performance (< 10-20 per tooltip).

**Q: Can I animate inline images?**
A: Yes! Use animated GIF format.

## More Examples

### Color-coded Status
```
{img:red-circle.png} Offline
{img:yellow-circle.png} Away  
{img:green-circle.png} Online
```

### Keyboard Shortcuts
```
{img:ctrl.png}+{img:c.png} Copy
{img:ctrl.png}+{img:v.png} Paste
{img:ctrl.png}+{img:z.png} Undo
```

### Progress Indicators
```
Quest Progress:
{img:check.png} Find the key
{img:check.png} Open the door
{img:x.png} Defeat the boss
```

### Rating Display
```
Difficulty: {img:star-filled.png}{img:star-filled.png}{img:star-empty.png}
```

---

## Summary

Inline images let you add emoji-style icons anywhere in your tooltip text using the `{img:url}` syntax. They're perfect for icons, indicators, and adding visual interest to text without disrupting the flow. Set their size with the `set tooltip inline image size to [SIZE]px` block, and enjoy a new level of expressiveness in your tooltips!
