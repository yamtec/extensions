# Tooltips Extension - Usage Examples

This document provides practical examples for using the TurboWarp Tooltips Extension in your projects.

## Table of Contents

1. [Basic Examples](#basic-examples)
2. [Game UI Examples](#game-ui-examples)
3. [Educational Examples](#educational-examples)
4. [Advanced Examples](#advanced-examples)

---

## Basic Examples

### Example 1: Simple Welcome Message

Show a welcome message when the project starts:

```scratch
When green flag clicked
set tooltip background color to [#2c3e50]
set tooltip text color to [#ecf0f1]
set tooltip font size to [18]
set tooltip border radius to [10]px
show tooltip [Welcome to my game!] at x: [0] y: [120]
wait [3] seconds
hide tooltip
```

### Example 2: Click Instructions

Display instructions that follow the cursor:

```scratch
When green flag clicked
set tooltip auto-hide to [disabled]
show tooltip [Click anywhere to start!] following cursor with offset x: [15] y: [15]

When stage clicked
hide tooltip
// Start your game logic here
```

### Example 3: Help Button

Create a sprite with a help tooltip:

```scratch
When this sprite clicked
if <tooltip visible?> then
  hide tooltip
else
  show tooltip [**Help**
  
Click objects to collect them
Press space to jump
Avoid the red enemies!] following cursor
end
```

---

## Game UI Examples

### Example 4: Health/Status Display

Show player stats that follow the cursor:

```scratch
When green flag clicked
set tooltip background color to [#1a1a1a]
set tooltip background opacity to [85]%
set tooltip text color to [#ffffff]
forever
  if <mouse down?> then
    set [hp] to (join [HP: ] (hp variable))
    set [mana] to (join [Mana: ] (mana variable))
    set [level] to (join [Level: ] (level variable))
    show tooltip (join (join (hp) [
]) (join (mana) [
])) (level)) following cursor
  else
    hide tooltip
  end
end
```

### Example 5: Inventory Item Info

Show item details when hovering:

```scratch
When this sprite clicked
set tooltip background color to [#8e44ad]
set tooltip text color to [#ffffff]
set tooltip border color to [#9b59b6]
set tooltip border width to [2]px
set tooltip shadow [enabled]
show tooltip [{color:gold}**LEGENDARY SWORD**{/color}

{color:cyan}Excalibur{/color}

**Stats:**
+50 Attack
+25 Defense
+10 Speed

*Deals extra damage to dark enemies*] at x: [100] y: [0]
```

### Example 6: Score Notification

Show score increase with auto-hide:

```scratch
When [space v] key pressed
set tooltip auto-hide to [enabled]
set tooltip auto-hide duration to [2] seconds
set tooltip background color to [#27ae60]
set tooltip text color to [#ffffff]
set tooltip fade in [enabled]
set tooltip fade out [enabled]
show tooltip [+100 Points!] at x: [0] y: [100]
change [score v] by [100]
```

### Example 7: Quest Tracker

Display current quest with markdown formatting:

```scratch
When [q v] key pressed
set tooltip position mode to [fixed]
set tooltip max width to [350]px
show tooltip [# Current Quest

## Collect the Crystals

**Progress:** 3/10 crystals

**Rewards:**
* 500 Gold
* Magic Sword
* +1000 XP

*Crystals are hidden around the map*] at x: [150] y: [100]

wait until <[q v] key pressed?>
hide tooltip
```

---

## Educational Examples

### Example 8: Math Tutorial

Interactive math help with formatted equations:

```scratch
When this sprite clicked
set tooltip font to [Georgia]
set tooltip font size to [16]
show tooltip [# Pythagorean Theorem

**Formula:** `a² + b² = c²`

Where:
* `a` and `b` are the sides
* `c` is the hypotenuse

**Example:**
If a = 3 and b = 4
Then c = √(9 + 16) = 5] at x: [0] y: [0]
```

### Example 9: Code Documentation

Show code examples with syntax highlighting:

```scratch
When [help v] key pressed
set tooltip font to [Courier New]
set tooltip background color to [#1e1e1e]
set tooltip text color to [#d4d4d4]
show tooltip [## JavaScript Function

```javascript
function greet(name) {
  return "Hello, " + name;
}```

**Usage:**
`greet("World")` returns `"Hello, World"`] at x: [0] y: [50]
```

### Example 10: Interactive Quiz Feedback

Show feedback with colors:

```scratch
When [answer v] = [correct answer v]
set tooltip auto-hide to [enabled]
set tooltip auto-hide duration to [3] seconds
show tooltip [{color:green}**✓ Correct!**{/color}

Great job! That's the right answer.

+10 points] at x: [0] y: [80]

When [answer v] ≠ [correct answer v]
show tooltip [{color:red}**✗ Incorrect**{/color}

Try again! 

{color:yellow}*Hint: Think about the first step*{/color}] at x: [0] y: [80]
```

---

## Advanced Examples

### Example 11: Multi-Language Support

Switch tooltip language dynamically:

```scratch
When [language v] = [english v]
set [tooltip text v] to [**Welcome!**

Click to start the adventure]

When [language v] = [spanish v]
set [tooltip text v] to [**¡Bienvenido!**

Haz clic para comenzar la aventura]

When green flag clicked
show tooltip (tooltip text) at x: [0] y: [100]
```

### Example 12: Dynamic Damage Numbers

Show damage with custom styling:

```scratch
When sprite clicked
set [damage v] to (pick random [10] to [50])
set tooltip background color to [#c0392b]
set tooltip text color to [#ffffff]
set tooltip font size to [24]
set tooltip font to [Impact]
set tooltip auto-hide to [enabled]
set tooltip auto-hide duration to [1] seconds
show tooltip (join [-] (damage)) at x: (x position) y: ((y position) + [30])
```

### Example 13: Boss Health Bar Info

Show detailed boss info:

```scratch
When [this sprite v] clicked
set tooltip width to [300]px
set tooltip background color to [#8e44ad]
show tooltip [# {color:red}Dragon Lord{/color}

## Stats
**HP:** ████████░░ 80%
**Level:** 50

## Weaknesses
* {color:cyan}Ice Magic{/color}
* {color:lightblue}Water Attacks{/color}

## Attacks
1. Fire Breath (High damage)
2. Claw Swipe (Medium damage)
3. Tail Whip (Knockback)

{color:gold}*Legendary Boss*{/color}] at x: [0] y: [0]
```

### Example 14: Tooltip Theme Switcher

Create different tooltip themes:

```scratch
// Dark Theme
define set dark theme
set tooltip background color to [#1a1a1a]
set tooltip text color to [#00ff00]
set tooltip border color to [#00ff00]
set tooltip font to [Courier New]
set tooltip shadow to x:[3] y:[3] blur:[6] color:[#000000]

// Light Theme
define set light theme
set tooltip background color to [#ffffff]
set tooltip text color to [#333333]
set tooltip border color to [#cccccc]
set tooltip font to [Arial]
set tooltip shadow to x:[1] y:[1] blur:[3] color:[#888888]

// Gaming Theme
define set gaming theme
set tooltip background color to [#8e44ad]
set tooltip text color to [#ffffff]
set tooltip border color to [#9b59b6]
set tooltip border width to [3]px
set tooltip font to [Impact]
set tooltip shadow to x:[5] y:[5] blur:[10] color:[#000000]

// Usage
When [1 v] key pressed
set dark theme

When [2 v] key pressed
set light theme

When [3 v] key pressed
set gaming theme
```

### Example 15: Animated Tooltip System

Create tooltips that update in real-time:

```scratch
When green flag clicked
forever
  if <(distance to [mouse-pointer v]) < [50]> then
    set [info v] to (join [**Time:** ] (timer))
    set [info v] to (join (info) (join [
**Position:** ] (join (x position) (join [, ] (y position)))))
    set [info v] to (join (info) (join [
**Distance:** ] (distance to [mouse-pointer v])))
    show tooltip (info) following cursor with offset x: [20] y: [20]
  else
    hide tooltip
  end
end
```

### Example 16: Context-Sensitive Help

Show different tooltips based on game state:

```scratch
define show context help
if <(game state) = [menu]> then
  show tooltip [Click "Play" to start
Press "Options" for settings] following cursor
else
  if <(game state) = [playing]> then
    show tooltip [WASD: Move
Space: Jump
E: Interact] at x: [180] y: [140]
  else
    if <(game state) = [paused]> then
      show tooltip [**Game Paused**

Press ESC to resume
Press Q to quit] at x: [0] y: [0]
    end
  end
end

When [h v] key pressed
show context help
wait [3] seconds
hide tooltip
```

### Example 17: Tooltip with Links

Create interactive tooltips with clickable links:

```scratch
When [info v] key pressed
set tooltip max width to [400]px
show tooltip [# More Information

Visit our website for:
* [Game Guide](https://example.com/guide)
* [Video Tutorials](https://example.com/videos)
* [Community Forum](https://example.com/forum)

{color:blue}*Links open in new tab*{/color}] at x: [0] y: [0]
```

### Example 17: Image with Tooltip Text

Display an image alongside descriptive text:

```scratch
When sprite clicked
set tooltip image max width to [150]px
set tooltip image border radius to [8]px
set tooltip background color to [#1a1a1a]
set tooltip text color to [#ffffff]
show tooltip [# Character Info

![Hero Avatar](https://example.com/hero.png)

**Name:** Brave Hero
**Level:** 25
**HP:** 100/100
**Mana:** 75/100

*Click to view full stats*] at x: [0] y: [0]
```

### Example 18: Clickable Image Gallery

Create an interactive image gallery tooltip:

```scratch
When this sprite clicked
set tooltip image max width to [120]px
set tooltip max width to [400]px
show tooltip [## Item Shop

[![Sword](https://example.com/sword.png)](https://example.com/buy/sword)
[![Shield](https://example.com/shield.png)](https://example.com/buy/shield)
[![Potion](https://example.com/potion.png)](https://example.com/buy/potion)

*Click any item to purchase*] following cursor
```

### Example 19: Profile Card with Image

Show a profile card with an avatar image:

```scratch
When green flag clicked
set tooltip image max width to [100]px
set tooltip image border radius to [50]px // Makes image circular
set tooltip background color to [#2c3e50]
set tooltip text color to [#ecf0f1]
set tooltip border color to [#3498db]
set tooltip border width to [2]px
show tooltip [![Profile Picture](https://example.com/avatar.png)

## John Doe
**Developer**

*Building amazing projects!*

[Visit Profile](https://example.com/profile)] at x: [0] y: [100]
```

### Example 20: Tutorial Step with Illustration

Create tutorial steps with helpful images:

```scratch
When green flag clicked
set [step] to [1]

When [step] = [1]
set tooltip image max width to [200]px
show tooltip [## Tutorial: Step 1

![Arrow Keys](https://example.com/arrow-keys.png)

Use **arrow keys** to move your character.

Press `Space` to continue] at x: [0] y: [80]

When [space v] key pressed
if <[step] = [1]> then
  change [step] by [1]
  hide tooltip
  // Show next step...
end
```

---

## Tips for Best Results

1. **Use Auto-Hide for Notifications**: Enable auto-hide for temporary messages like score updates
2. **Fixed Position for Important Info**: Use fixed positioning for critical information that shouldn't move
3. **Cursor Following for Interactive Elements**: Use cursor-following tooltips for hover information
4. **Markdown for Rich Content**: Take advantage of markdown formatting for structured content
5. **Color Coding**: Use the custom color syntax to highlight important information
6. **Test Visibility**: Ensure tooltip colors provide good contrast for readability
7. **Adjust Z-Index**: If tooltips appear behind other elements, increase the z-index
8. **Limit Width**: Set max-width to prevent extremely wide tooltips
9. **Use Fade Animations**: Enable fade animations for smooth, professional appearance
10. **Clean Up**: Always hide tooltips when they're no longer needed
11. **Image Sizing**: Set image max width/height before showing tooltip to control image dimensions
12. **Clickable Images**: Wrap images in links `[![alt](img.png)](url)` for interactive image tooltips
13. **Image Alt Text**: Always provide descriptive alt text for images (shows on hover)
14. **Circular Images**: Use high border radius (50px+) for circular avatar images

---

## Performance Considerations

- Avoid updating tooltip text every frame (use conditionals)
- Use fixed positioning when possible (less processing than cursor following)
- Hide tooltips when not in use to reduce overhead
- Keep markdown content reasonable in size
- Disable animations if performance is critical

---

## Troubleshooting

**Tooltip doesn't appear:**
- Verify text is not empty
- Check z-index if tooltip is behind other elements
- Ensure coordinates are within visible range

**Markdown not rendering:**
- Check markdown syntax (spacing, special characters)
- Test with simple markdown first
- Remember that line breaks require actual newlines

**Cursor following is laggy:**
- This is normal throttling for performance (~60fps)
- Consider using fixed positioning for critical displays
- Reduce updates to tooltip content

**Colors look wrong:**
- Use proper hex format (#RRGGBB)
- Check background opacity setting
- Verify text color contrasts with background

**Images not displaying:**
- Verify image URL is correct and accessible
- Check browser console for CORS errors
- Ensure image format is supported (PNG, JPG, GIF, SVG)
- Try using direct image URLs (ending in .png, .jpg, etc.)

**Images too large:**
- Use `set tooltip image max width to [px]` before showing tooltip
- Use `set tooltip image max height to [px]` to constrain height
- Images automatically maintain aspect ratio

---

Happy tooltip creating! 🎨✨
