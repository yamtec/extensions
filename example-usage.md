# Developer Console Extension - Example Usage

This document provides practical examples of how to use the TurboWarp Developer Console extension in your projects.

## Example 1: Basic Setup with Help Command

### Setup (When Green Flag Clicked)
```scratch
when green flag clicked
register command [help] with description [Show all available commands]
register command [clear] with description [Clear the console]
register command [echo] with description [Echo back the message]

// Customize appearance
set console background to [#0d1117] with opacity [90]%
set console text color to [#c9d1d9]
set console font to [Courier New] size [14]px
set console border [solid] [2]px color [#30363d]
set console position [bottom] with padding [20]px
set console width [80]% height [40]%
set autocomplete background to [#161b22]
set autocomplete highlight to [#21262d]
```

### Help Command Handler
```scratch
when command [help] executed
add output [=== Available Commands ===] to console
add output [help - Show this message] to console
add output [clear - Clear console output] to console
add output [echo <message> - Echo back a message] to console
add output [========================] to console
```

### Clear Command Handler
```scratch
when command [clear] executed
clear console output
add output [Console cleared!] to console
```

### Echo Command Handler
```scratch
when command [echo] executed
set [args] to (command arguments)
set [argList] to (parse JSON (args))
if <(length of (argList)) > [0]> then
  set [message] to []
  repeat (length of (argList))
    set [message] to (join (message) (join (item (counter) of (argList)) [ ]))
  end
  add output (message) to console
else
  add error [Usage: echo <message>] to console
end
```

## Example 2: Game Commands (Player Control)

### Command Registration
```scratch
when green flag clicked
register command [tp] with description [Teleport player to x y coordinates]
register command [speed] with description [Set player speed (1-10)]
register command [health] with description [Set player health (1-100)]
register command [reset] with description [Reset player to default state]
register command [pos] with description [Show current player position]
```

### Teleport Command
```scratch
when command [tp] executed
set [args] to (command arguments)
set [argList] to (parse JSON (args))
if <(length of (argList)) = [2]> then
  set x to (item (1) of (argList))
  set y to (item (2) of (argList))
  add output (join (join [Teleported to (] (x)) (join [, ] (join (y) [)]))) to console
else
  add error [Usage: tp <x> <y>] to console
end
```

### Speed Command
```scratch
when command [speed] executed
set [args] to (command arguments)
set [argList] to (parse JSON (args))
if <(length of (argList)) = [1]> then
  set [speed] to (item (1) of (argList))
  if <<(speed) > [0]> and <(speed) < [11]>> then
    set [player_speed] to (speed)
    add output (join [Speed set to: ] (speed)) to console
  else
    add error [Speed must be between 1 and 10] to console
  end
else
  add error [Usage: speed <1-10>] to console
end
```

### Position Command
```scratch
when command [pos] executed
add output (join [Current position: (] (join (x position) (join [, ] (join (y position) [)])))) to console
```

## Example 3: Debug Commands

### Command Registration
```scratch
when green flag clicked
register command [fps] with description [Show current FPS]
register command [vars] with description [List all variables]
register command [sprites] with description [List all sprites]
register command [debug] with description [Toggle debug mode]
```

### FPS Command
```scratch
when command [fps] executed
add output (join [FPS: ] (fps)) to console
```

### Variables Command
```scratch
when command [vars] executed
add output [=== Variables ===] to console
add output (join [Score: ] (score)) to console
add output (join [Lives: ] (lives)) to console
add output (join [Level: ] (level)) to console
add output [=================] to console
```

### Debug Toggle
```scratch
when command [debug] executed
if <(debug_mode) = [true]> then
  set [debug_mode] to [false]
  add output [Debug mode: OFF] to console
else
  set [debug_mode] to [true]
  add output [Debug mode: ON] to console
end
```

## Example 4: Item Spawning System

### Command Registration
```scratch
when green flag clicked
register command [spawn] with description [Spawn an item: spawn <item> <amount>]
register command [items] with description [List available items]
register command [inventory] with description [Show inventory]
```

### Items List Command
```scratch
when command [items] executed
add output [=== Available Items ===] to console
add output [- sword] to console
add output [- shield] to console
add output [- potion] to console
add output [- coin] to console
add output [====================] to console
```

### Spawn Command
```scratch
when command [spawn] executed
set [args] to (command arguments)
set [argList] to (parse JSON (args))
if <(length of (argList)) = [2]> then
  set [item] to (item (1) of (argList))
  set [amount] to (item (2) of (argList))
  if <(item_list) contains (item)?> then
    // Add item to inventory
    add output (join (join [Spawned ] (amount)) (join [ x ] (item))) to console
  else
    add error (join [Unknown item: ] (item)) to console
    add output [Use 'items' command to see available items] to console
  end
else
  add error [Usage: spawn <item> <amount>] to console
end
```

## Example 5: Custom Styling Themes

### Dark Theme (GitHub Style)
```scratch
when green flag clicked
set console background to [#0d1117] with opacity [95]%
set console text color to [#c9d1d9]
set console font to [monospace] size [14]px
set console border [solid] [1]px color [#30363d]
set console position [bottom] with padding [20]px
set autocomplete background to [#161b22]
set autocomplete highlight to [#21262d]
```

### Matrix Theme
```scratch
when green flag clicked
set console background to [#000000] with opacity [90]%
set console text color to [#00ff00]
set console font to [Courier New] size [16]px
set console border [solid] [3]px color [#00ff00]
set console position [bottom] with padding [25]px
set autocomplete background to [#001100]
set autocomplete highlight to [#003300]
```

### Light Theme
```scratch
when green flag clicked
set console background to [#ffffff] with opacity [95]%
set console text color to [#000000]
set console font to [Arial] size [14]px
set console border [solid] [2]px color [#cccccc]
set console position [bottom] with padding [20]px
set autocomplete background to [#f5f5f5]
set autocomplete highlight to [#e0e0e0]
```

### Retro Terminal Theme
```scratch
when green flag clicked
set console background to [#1a1a00] with opacity [90]%
set console text color to [#ffff00]
set console font to [Courier New] size [16]px
set console border [solid] [4]px color [#ffff00]
set console position [center] with padding [30]px
set console width [70]% height [50]%
set autocomplete background to [#333300]
set autocomplete highlight to [#4d4d00]
```

## Example 6: Advanced Custom CSS

### Glowing Border Effect
```scratch
when green flag clicked
apply custom CSS [
.turbowarp-console {
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  animation: glow 2s ease-in-out infinite alternate;
}
@keyframes glow {
  from { box-shadow: 0 0 10px rgba(0, 255, 0, 0.3); }
  to { box-shadow: 0 0 30px rgba(0, 255, 0, 0.7); }
}
]
```

### Scanline Effect
```scratch
when green flag clicked
apply custom CSS [
.turbowarp-console::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
]
```

## Tips and Best Practices

1. **Register commands early**: Register all commands when the green flag is clicked
2. **Validate arguments**: Always check argument count and values before using them
3. **Provide help**: Create a help command that lists all available commands
4. **Error messages**: Use "add error" for error messages to make them stand out
5. **Consistent naming**: Use lowercase command names for consistency
6. **Clear descriptions**: Provide clear descriptions when registering commands
7. **Test autocomplete**: Make sure command names are distinct enough for autocomplete
8. **Style for readability**: Choose colors with good contrast for readability
9. **Use command history**: Press up arrow to repeat previous commands during testing
10. **Namespace commands**: Consider prefixing related commands (e.g., `player.health`, `player.speed`)

## Parsing Command Arguments

Command arguments are returned as a JSON array string. Here's how to parse them:

```scratch
// Get arguments
set [args] to (command arguments)

// Parse JSON to list
set [argList] to (parse JSON (args))

// Access individual arguments
set [firstArg] to (item (1) of (argList))
set [secondArg] to (item (2) of (argList))

// Check argument count
if <(length of (argList)) = [2]> then
  // Process command
end
```

## Troubleshooting Common Issues

**Issue**: Arguments not parsing correctly
**Solution**: Make sure you're using the JSON parse block to convert the argument string to a list

**Issue**: Console opens/closes unexpectedly
**Solution**: Check for conflicting keyboard event handlers in your project

**Issue**: Styling not visible
**Solution**: Ensure opacity is high enough (90-95% recommended) and colors have good contrast

**Issue**: Commands not registering
**Solution**: Make sure command registration happens before trying to execute commands

**Issue**: Autocomplete not showing
**Solution**: Type at least one character and ensure registered commands match the prefix
