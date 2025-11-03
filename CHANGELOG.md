# Changelog

All notable changes to the TurboWarp Extensions will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2024-01-20

### Added - Tooltips Extension
- **Image Support**:
  - Display images inline using markdown syntax: `![alt text](image_url)`
  - Clickable images with links: `[![alt](image.png)](link.com)`
  - Images open in new tab when clicked (if wrapped in link)
  - Native HTML tooltip shows alt text on hover
- **Image Styling Blocks**:
  - `set tooltip image max width to [WIDTH]px` - Control maximum image width (0 = auto)
  - `set tooltip image max height to [HEIGHT]px` - Control maximum image height (0 = auto)
  - `set tooltip image border radius to [RADIUS]px` - Rounded corners for images (default: 4px)
- **Image Features**:
  - Images maintain aspect ratio automatically
  - Centered display with proper margins
  - Support for all standard image formats (PNG, JPG, GIF, SVG, etc.)
  - Images scale responsively within tooltip constraints
- **Documentation Updates**:
  - Added image syntax examples to tooltip-README.md
  - 3 new usage examples showcasing images (Examples 9-11)
  - Troubleshooting section for image-related issues
  - Updated Tips & Best Practices with image guidance

## [1.1.0] - 2024-01-15

### Added - Tooltips Extension
- **New Extension**: TurboWarp Tooltips Extension with comprehensive tooltip system
- **Display & Positioning**:
  - Fixed position tooltips at stage coordinates
  - Cursor-following tooltips
  - Cursor-following with custom offset
  - Smart viewport-aware positioning
  - Toggle between fixed and follow cursor modes
- **Markdown Support**:
  - Headers (H1, H2, H3)
  - Bold, italic, strikethrough formatting
  - Inline code and code blocks
  - Bullet lists and numbered lists
  - Clickable links (open in new tab)
  - Custom color syntax: `{color:name}text{/color}` and `{color:#hex}text{/color}`
- **Extensive Styling Options**:
  - 13+ font family options (Arial, Courier, Georgia, etc.)
  - Font size control
  - Text color with color picker
  - Background color with opacity control (0-100%)
  - Border color, width, and radius
  - Padding and sizing (width, max-width)
  - Shadow effects with custom x, y, blur, and color
  - Z-index layering control
- **Behavior & Animation**:
  - Optional auto-hide with customizable duration
  - Fade in/out animations
  - Configurable fade duration
  - Individual fade in/out enable/disable
- **Reporter Blocks**:
  - `tooltip visible?` - Check if tooltip is shown
  - `tooltip text` - Get current text content
  - `tooltip x position` - Get x coordinate
  - `tooltip y position` - Get y coordinate
  - `tooltip mode` - Get positioning mode
- **Performance Optimizations**:
  - Debounced cursor following (~60fps)
  - Efficient markdown parsing
  - Minimal DOM updates
  - Proper event listener cleanup
- **Documentation**:
  - Comprehensive tooltip-README.md with full API reference
  - Interactive tooltip-test.html demonstration page
  - 7+ detailed usage examples
  - Markdown syntax reference
  - Troubleshooting guide

## [1.0.0] - 2024-01-01

### Added
- Initial release of the TurboWarp Developer Console Extension
- Console toggle with `~` (tilde) key
- Console close with `Escape` key
- DOM-based overlay system that doesn't pause project execution
- Text input field with cursor for command entry
- Output display area for command results and errors
- Command registration system via extension blocks
- Hat blocks for console lifecycle events (opened, closed, command executed)
- Autocomplete system with strict prefix matching
- Autocomplete dropdown showing up to 10 suggestions
- Keyboard navigation for autocomplete (arrow keys, Tab, Enter)
- Command history navigation (up/down arrows)
- Command argument parsing and passing to handler blocks
- Output message display with normal and error styling
- Basic styling blocks for console customization:
  - Background color and opacity
  - Text color
  - Font family and size
  - Border style, width, and color
  - Position (top/center/bottom) with padding
  - Dimensions (width and height)
  - Autocomplete background and highlight colors
- Advanced custom CSS support for power users
- Comprehensive block API including:
  - `when console opened` - Hat block
  - `when console closed` - Hat block
  - `when command [name] executed` - Hat block
  - `is console open?` - Boolean reporter
  - `console input text` - Reporter
  - `open console` - Command
  - `close console` - Command
  - `clear console output` - Command
  - `register command [name]` - Command
  - `register command [name] with description [text]` - Command
  - `command arguments` - Reporter (returns JSON array)
  - `add output [text] to console` - Command
  - `add error [text] to console` - Command
  - Multiple styling blocks for visual customization
- Documentation:
  - Comprehensive README with features and usage
  - Detailed example usage guide
  - Interactive test HTML page
  - Code examples for common scenarios
- Scoped CSS using `.turbowarp-console` class to avoid conflicts
- Proper event handling for keyboard shortcuts
- Command registry with description support
- Scrolling output area with auto-scroll to latest message
- Monospace font default for console aesthetic

### Features Implemented
✅ Toggle console with `~` key
✅ Text input field with cursor
✅ Command execution system with developer-defined commands
✅ Autocomplete dropdown with strict prefix matching
✅ Command registry via blocks
✅ Basic output display (results/errors)
✅ Customizable styling via easy-to-use blocks
✅ Close console with `Escape` or `~`
✅ Command history (up/down arrow to cycle through previous commands)
✅ Tab completion for suggested command
✅ Multi-line output with scrolling
✅ Colored output (errors in red)

### Technical Details
- Extension runs in unsandboxed mode for DOM manipulation
- Uses TurboWarp runtime for hat block triggering
- Implements proper keyboard event listeners
- Dynamic CSS generation and injection
- Efficient command registry using Map data structure
- Proper state management for console, autocomplete, and history
- Cross-browser compatible (Chrome, Firefox, Edge, Safari)

### Known Limitations
- Commands are case-sensitive
- Arguments are space-separated (quoted strings not yet supported)
- No command namespacing/categories in this version
- No parameter hints after typing command
- No command aliases support
- No export/save console logs feature
- No search/filter for command history

### Future Enhancements (Nice-to-Have)
- Command categories/namespaces (e.g., `player.teleport`, `debug.fps`)
- Parameter hints after typing command (show expected arguments)
- Handle quoted strings in arguments (e.g., `spawn "Big Boss" 100`)
- Command aliases for convenience
- Export/save console logs to file
- Search/filter command history
- More color options for output (success in green, info in blue, etc.)
- Console themes presets (dark, light, matrix, retro)
- Command permissions/restrictions
- Multi-line command input
- Command pipeline/chaining support
- Variable substitution in commands

### Documentation
- README.md - Main documentation
- example-usage.md - Practical usage examples
- test.html - Interactive testing guide
- CHANGELOG.md - Version history (this file)
- LICENSE - MIT License
- package.json - Project metadata

### Acceptance Criteria Status
1. ✅ Extension loads in TurboWarp without errors
2. ✅ Console opens/closes with `~` key
3. ✅ Developer can register commands using blocks
4. ✅ Commands execute and trigger appropriate handler blocks
5. ✅ Autocomplete shows matching commands as user types
6. ✅ Styling blocks successfully customize console appearance
7. ✅ Console overlays properly on stage without breaking project execution
8. ✅ Multiple commands can be registered and executed in sequence
9. ✅ Arguments are correctly parsed and passed to command handlers
10. ✅ Output messages display in console with proper formatting

All acceptance criteria have been met! 🎉
