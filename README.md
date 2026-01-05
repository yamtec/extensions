# TurboWarp Extensions

This repository contains custom TurboWarp extensions for enhancing your Scratch projects.

## Extensions

### 1. Developer Console Extension
A customizable in-stage developer console overlay for TurboWarp, similar to Minecraft's console. This extension allows developers to register custom commands and fully customize the console appearance.

**[📖 Read Developer Console Documentation](developer-console-README.md)**

### 2. Tooltips Extension
A comprehensive tooltip system with markdown support, advanced styling, and positioning options. Display beautiful, interactive tooltips with custom formatting, colors, and animations. Now includes **mobile-specific interactions** with tap-to-show and close button dismiss functionality!

**[📖 Read Tooltips Documentation](tooltip-README.md)**  
**[📱 Read Mobile Tooltips Documentation](MOBILE-TOOLTIPS.md)**

---

## Developer Console Extension

A customizable in-stage developer console overlay for TurboWarp, similar to Minecraft's console. This extension allows developers to register custom commands and fully customize the console appearance.

## Features

- **Console Toggle**: Open/close with `~` key press or close with `Escape`
- **Overlay Display**: Overlays on top of the TurboWarp stage canvas without pausing the project
- **Command System**: Register custom commands with descriptions
- **Autocomplete**: Strict prefix matching with dropdown suggestions (up to 10 shown)
- **Command History**: Navigate previous commands with up/down arrows
- **Output Display**: Show command results, errors, and history
- **Full Customization**: Style every aspect of the console with easy-to-use blocks

## Installation

1. Open TurboWarp (https://turbowarp.org/)
2. Click on "Extensions" (bottom left)
3. Select "Load Extension from URL"
4. Enter the URL to the `developer-console.js` file or load it locally
5. The "Developer Console" extension will appear in your block palette

## Block Categories

### Console Lifecycle Blocks

- **when console opened** - Hat block triggered when console opens
- **when console closed** - Hat block triggered when console closes
- **when command [command] executed** - Hat block for command execution
- **is console open?** - Boolean reporter for console state
- **console input text** - Reporter for current input text
- **open console** - Command to open the console
- **close console** - Command to close the console
- **clear console output** - Command to clear all output

### Command Registration Blocks

- **register command [name]** - Register a command that triggers hat block
- **register command [name] with description [text]** - Register command with help text
- **command arguments** - Returns list of arguments passed to command (as JSON array)
- **add output [text] to console** - Display output message
- **add error [text] to console** - Display error message (red text)

### Styling Blocks - Basic

- **set console background to [color] with opacity [%]** - Background styling
- **set console text color to [color]** - Text color
- **set console font to [Font] size [px]** - Font family and size
- **set console border [style] [width]px color [color]** - Border styling
- **set console position [position] with padding [px]** - Position (top/center/bottom)
- **set console width [%] height [%]** - Dimensions
- **set autocomplete background to [color]** - Autocomplete dropdown background
- **set autocomplete highlight to [color]** - Highlighted suggestion color

### Styling Blocks - Advanced

- **apply custom CSS [text]** - Apply raw CSS for advanced customization

## Usage Example

### Basic Command Registration

```
When green flag clicked
register command [help] with description [Show available commands]
register command [spawn] with description [Spawn an item]
register command [teleport] with description [Teleport to coordinates]
```

### Command Handler

```
When command [help] executed
add output [Available commands:] to console
add output [- help: Show this message] to console
add output [- spawn <item>: Spawn an item] to console
add output [- teleport <x> <y>: Teleport to coordinates] to console
```

### Command with Arguments

```
When command [spawn] executed
set [args] to (command arguments)
if <(length of (args)) = [1]> then
  set [item] to (item (1) of (args))
  add output (join [Spawning: ] (item)) to console
  // Your spawn logic here
else
  add error [Usage: spawn <item>] to console
end
```

### Customizing Appearance

```
When green flag clicked
set console background to [#1a1a1a] with opacity [90]%
set console text color to [#00ff00]
set console font to [Courier New] size [16]px
set console border [solid] [3]px color [#00ff00]
set console position [bottom] with padding [30]px
set console width [70]% height [35]%
```

## Keyboard Controls

- **`~` (Tilde)** - Toggle console open/closed
- **`Escape`** - Close console (when open)
- **`Enter`** - Execute command or accept autocomplete suggestion
- **`Tab`** - Accept autocomplete suggestion
- **`Up Arrow`** - Navigate up in autocomplete or command history
- **`Down Arrow`** - Navigate down in autocomplete or command history

## Command Format

Commands follow this format:
```
commandname arg1 arg2 arg3 ...
```

- First word is the command name
- Remaining words are space-separated arguments
- Arguments are passed as a JSON array to the command handler

## Autocomplete System

- Shows up to 10 matching commands
- Strict prefix matching (command must start with typed text)
- First match is highlighted by default
- Use arrow keys to navigate
- Press Tab or Enter to accept suggestion
- Shows command descriptions if registered

## Technical Details

- Extension ID: `developerConsole`
- Runs unsandboxed for DOM manipulation
- Uses DOM overlay approach for easy styling
- Scoped CSS using `.turbowarp-console` class
- Global keyboard event listeners for `~` and `Escape` keys

## Browser Compatibility

Works in all modern browsers that support TurboWarp:
- Chrome/Chromium
- Firefox
- Edge
- Safari

## Troubleshooting

**Console doesn't open with `~` key:**
- Make sure the stage is focused
- Try clicking on the stage first, then pressing `~`
- Check browser console for any errors

**Commands not executing:**
- Ensure commands are registered before use
- Check that the command name matches exactly (case-sensitive)
- Verify the "when command [name] executed" hat block is present

**Styling not applying:**
- Styling blocks take effect immediately
- If console is already open, changes apply in real-time
- For custom CSS, ensure valid CSS syntax

## License

This extension is open source and free to use in your TurboWarp projects.
