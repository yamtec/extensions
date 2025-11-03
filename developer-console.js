/**
 * TurboWarp Developer Console Extension
 * Provides a customizable in-stage developer console overlay with command registration and autocomplete
 */
(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class DeveloperConsole {
    constructor() {
      this.consoleOpen = false;
      this.consoleElement = null;
      this.inputElement = null;
      this.outputElement = null;
      this.autocompleteElement = null;
      this.commandRegistry = new Map();
      this.commandHistory = [];
      this.historyIndex = -1;
      this.currentInput = '';
      this.autocompleteIndex = 0;
      this.autocompleteSuggestions = [];
      this.outputMessages = [];
      
      this.styling = {
        backgroundColor: '#000000',
        backgroundOpacity: 80,
        textColor: '#ffffff',
        fontFamily: 'monospace',
        fontSize: 14,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#ffffff',
        position: 'bottom',
        padding: 20,
        width: 80,
        height: 40,
        autocompleteBackground: '#333333',
        autocompleteHighlight: '#666666',
        customCSS: ''
      };

      this.hatBlocks = {
        whenOpened: [],
        whenClosed: [],
        whenCommandExecuted: []
      };

      this.lastExecutedCommand = {
        name: '',
        args: []
      };

      this.initializeConsole();
      this.setupKeyboardListeners();
    }

    initializeConsole() {
      const style = document.createElement('style');
      style.id = 'turbowarp-console-styles';
      style.textContent = this.generateCSS();
      document.head.appendChild(style);

      const consoleContainer = document.createElement('div');
      consoleContainer.className = 'turbowarp-console';
      consoleContainer.style.display = 'none';

      const outputArea = document.createElement('div');
      outputArea.className = 'turbowarp-console-output';

      const inputContainer = document.createElement('div');
      inputContainer.className = 'turbowarp-console-input-container';

      const promptSymbol = document.createElement('span');
      promptSymbol.className = 'turbowarp-console-prompt';
      promptSymbol.textContent = '> ';

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'turbowarp-console-input';
      input.placeholder = 'Enter command...';

      const autocomplete = document.createElement('div');
      autocomplete.className = 'turbowarp-console-autocomplete';
      autocomplete.style.display = 'none';

      inputContainer.appendChild(promptSymbol);
      inputContainer.appendChild(input);

      consoleContainer.appendChild(outputArea);
      consoleContainer.appendChild(autocomplete);
      consoleContainer.appendChild(inputContainer);

      document.body.appendChild(consoleContainer);

      this.consoleElement = consoleContainer;
      this.inputElement = input;
      this.outputElement = outputArea;
      this.autocompleteElement = autocomplete;

      this.setupInputHandlers();
    }

    generateCSS() {
      const { backgroundColor, backgroundOpacity, textColor, fontFamily, fontSize,
              borderStyle, borderWidth, borderColor, position, padding, width, height,
              autocompleteBackground, autocompleteHighlight, customCSS } = this.styling;

      const positionMap = {
        top: 'top: 20px;',
        center: 'top: 50%; transform: translateY(-50%);',
        bottom: 'bottom: 20px;'
      };

      const positionCSS = positionMap[position] || positionMap.bottom;
      const opacity = backgroundOpacity / 100;

      return `
        .turbowarp-console {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          ${positionCSS}
          width: ${width}%;
          height: ${height}%;
          background-color: ${this.hexToRgba(backgroundColor, opacity)};
          color: ${textColor};
          font-family: ${fontFamily};
          font-size: ${fontSize}px;
          border: ${borderWidth}px ${borderStyle} ${borderColor};
          padding: ${padding}px;
          box-sizing: border-box;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          ${position === 'center' ? 'transform: translate(-50%, -50%);' : ''}
        }

        .turbowarp-console-output {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 10px;
          white-space: pre-wrap;
          word-wrap: break-word;
          line-height: 1.4;
        }

        .turbowarp-console-output-line {
          margin: 4px 0;
        }

        .turbowarp-console-output-error {
          color: #ff6b6b;
        }

        .turbowarp-console-output-success {
          color: #51cf66;
        }

        .turbowarp-console-input-container {
          display: flex;
          align-items: center;
        }

        .turbowarp-console-prompt {
          margin-right: 5px;
          user-select: none;
        }

        .turbowarp-console-input {
          flex: 1;
          background: transparent;
          border: none;
          color: inherit;
          font-family: inherit;
          font-size: inherit;
          outline: none;
          padding: 0;
        }

        .turbowarp-console-autocomplete {
          position: relative;
          background-color: ${autocompleteBackground};
          border: 1px solid ${borderColor};
          border-radius: 3px;
          margin-bottom: 5px;
          max-height: 200px;
          overflow-y: auto;
        }

        .turbowarp-console-autocomplete-item {
          padding: 6px 10px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .turbowarp-console-autocomplete-item:hover {
          background-color: ${autocompleteHighlight};
        }

        .turbowarp-console-autocomplete-item.selected {
          background-color: ${autocompleteHighlight};
        }

        .turbowarp-console-autocomplete-name {
          font-weight: bold;
        }

        .turbowarp-console-autocomplete-desc {
          font-size: 0.85em;
          opacity: 0.8;
          margin-top: 2px;
        }

        ${customCSS}
      `;
    }

    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    updateStyles() {
      const styleElement = document.getElementById('turbowarp-console-styles');
      if (styleElement) {
        styleElement.textContent = this.generateCSS();
      }
    }

    setupKeyboardListeners() {
      document.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
          e.preventDefault();
          this.toggleConsole();
        } else if (e.key === 'Escape' && this.consoleOpen) {
          e.preventDefault();
          this.closeConsole();
        }
      });
    }

    setupInputHandlers() {
      this.inputElement.addEventListener('input', (e) => {
        this.currentInput = e.target.value;
        this.updateAutocomplete();
      });

      this.inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (this.autocompleteSuggestions.length > 0 && this.autocompleteElement.style.display !== 'none') {
            this.acceptAutocomplete();
          } else {
            this.executeCommand();
          }
        } else if (e.key === 'Tab') {
          e.preventDefault();
          if (this.autocompleteSuggestions.length > 0) {
            this.acceptAutocomplete();
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (this.autocompleteElement.style.display !== 'none') {
            this.navigateAutocomplete(-1);
          } else {
            this.navigateHistory(-1);
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (this.autocompleteElement.style.display !== 'none') {
            this.navigateAutocomplete(1);
          } else {
            this.navigateHistory(1);
          }
        }
      });
    }

    updateAutocomplete() {
      const input = this.currentInput.trim();
      
      if (input === '') {
        this.hideAutocomplete();
        return;
      }

      const firstWord = input.split(' ')[0];
      this.autocompleteSuggestions = Array.from(this.commandRegistry.keys())
        .filter(cmd => cmd.startsWith(firstWord))
        .slice(0, 10);

      if (this.autocompleteSuggestions.length === 0) {
        this.hideAutocomplete();
        return;
      }

      this.autocompleteIndex = 0;
      this.renderAutocomplete();
      this.autocompleteElement.style.display = 'block';
    }

    renderAutocomplete() {
      this.autocompleteElement.innerHTML = '';
      
      this.autocompleteSuggestions.forEach((cmd, index) => {
        const item = document.createElement('div');
        item.className = 'turbowarp-console-autocomplete-item';
        if (index === this.autocompleteIndex) {
          item.classList.add('selected');
        }

        const nameSpan = document.createElement('div');
        nameSpan.className = 'turbowarp-console-autocomplete-name';
        nameSpan.textContent = cmd;
        item.appendChild(nameSpan);

        const cmdInfo = this.commandRegistry.get(cmd);
        if (cmdInfo && cmdInfo.description) {
          const descSpan = document.createElement('div');
          descSpan.className = 'turbowarp-console-autocomplete-desc';
          descSpan.textContent = cmdInfo.description;
          item.appendChild(descSpan);
        }

        item.addEventListener('click', () => {
          this.autocompleteIndex = index;
          this.acceptAutocomplete();
        });

        this.autocompleteElement.appendChild(item);
      });
    }

    navigateAutocomplete(direction) {
      this.autocompleteIndex = Math.max(0, Math.min(
        this.autocompleteSuggestions.length - 1,
        this.autocompleteIndex + direction
      ));
      this.renderAutocomplete();
    }

    acceptAutocomplete() {
      if (this.autocompleteSuggestions.length > 0) {
        const selectedCommand = this.autocompleteSuggestions[this.autocompleteIndex];
        const currentParts = this.currentInput.split(' ');
        currentParts[0] = selectedCommand;
        this.inputElement.value = currentParts.join(' ');
        this.currentInput = this.inputElement.value;
        this.hideAutocomplete();
        this.inputElement.focus();
      }
    }

    hideAutocomplete() {
      this.autocompleteElement.style.display = 'none';
      this.autocompleteSuggestions = [];
    }

    navigateHistory(direction) {
      if (this.commandHistory.length === 0) return;

      if (this.historyIndex === -1) {
        this.currentInput = this.inputElement.value;
      }

      this.historyIndex = Math.max(-1, Math.min(
        this.commandHistory.length - 1,
        this.historyIndex + direction
      ));

      if (this.historyIndex === -1) {
        this.inputElement.value = this.currentInput;
      } else {
        this.inputElement.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
      }
    }

    executeCommand() {
      const input = this.inputElement.value.trim();
      
      if (input === '') return;

      this.commandHistory.push(input);
      this.historyIndex = -1;

      const parts = input.split(' ');
      const commandName = parts[0];
      const args = parts.slice(1);

      this._addOutput(`> ${input}`, 'command');

      if (this.commandRegistry.has(commandName)) {
        this.lastExecutedCommand = { name: commandName, args };
        this.triggerCommandHat(commandName, args);
      } else {
        this._addError(`Command not found: ${commandName}`);
      }

      this.inputElement.value = '';
      this.currentInput = '';
      this.hideAutocomplete();
    }

    _registerCommand(name, description = '') {
      this.commandRegistry.set(name, { description });
    }

    triggerCommandHat(commandName, args) {
      runtime.startHats('developerConsole_whenCommandExecuted', {
        COMMAND: commandName
      });
    }

    _addOutput(text, type = 'normal') {
      const line = document.createElement('div');
      line.className = 'turbowarp-console-output-line';
      
      if (type === 'error') {
        line.classList.add('turbowarp-console-output-error');
      } else if (type === 'success') {
        line.classList.add('turbowarp-console-output-success');
      }
      
      line.textContent = text;
      this.outputElement.appendChild(line);
      this.outputElement.scrollTop = this.outputElement.scrollHeight;
      
      this.outputMessages.push({ text, type });
    }

    _addError(text) {
      this._addOutput(text, 'error');
    }

    _clearOutput() {
      this.outputElement.innerHTML = '';
      this.outputMessages = [];
    }

    toggleConsole() {
      if (this.consoleOpen) {
        this._closeConsole();
      } else {
        this._openConsole();
      }
    }

    _openConsole() {
      if (this.consoleOpen) return;
      
      this.consoleOpen = true;
      this.consoleElement.style.display = 'flex';
      this.inputElement.focus();
      
      runtime.startHats('developerConsole_whenOpened');
    }

    _closeConsole() {
      if (!this.consoleOpen) return;
      
      this.consoleOpen = false;
      this.consoleElement.style.display = 'none';
      this.hideAutocomplete();
      
      runtime.startHats('developerConsole_whenClosed');
    }

    getInfo() {
      return {
        id: 'developerConsole',
        name: 'Developer Console',
        color1: '#2e3440',
        color2: '#3b4252',
        color3: '#434c5e',
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Console Lifecycle'
          },
          {
            opcode: 'whenOpened',
            blockType: Scratch.BlockType.HAT,
            text: 'when console opened'
          },
          {
            opcode: 'whenClosed',
            blockType: Scratch.BlockType.HAT,
            text: 'when console closed'
          },
          {
            opcode: 'whenCommandExecuted',
            blockType: Scratch.BlockType.HAT,
            text: 'when command [COMMAND] executed',
            arguments: {
              COMMAND: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'help'
              }
            }
          },
          {
            opcode: 'isConsoleOpen',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is console open?'
          },
          {
            opcode: 'getConsoleInput',
            blockType: Scratch.BlockType.REPORTER,
            text: 'console input text'
          },
          {
            opcode: 'openConsole',
            blockType: Scratch.BlockType.COMMAND,
            text: 'open console'
          },
          {
            opcode: 'closeConsole',
            blockType: Scratch.BlockType.COMMAND,
            text: 'close console'
          },
          {
            opcode: 'clearConsole',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear console output'
          },
          
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Command Registration'
          },
          {
            opcode: 'registerCommand',
            blockType: Scratch.BlockType.COMMAND,
            text: 'register command [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'mycommand'
              }
            }
          },
          {
            opcode: 'registerCommandWithDescription',
            blockType: Scratch.BlockType.COMMAND,
            text: 'register command [NAME] with description [DESC]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'mycommand'
              },
              DESC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Command description'
              }
            }
          },
          {
            opcode: 'getCommandArguments',
            blockType: Scratch.BlockType.REPORTER,
            text: 'command arguments'
          },
          {
            opcode: 'addOutput',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add output [TEXT] to console',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              }
            }
          },
          {
            opcode: 'addError',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add error [TEXT] to console',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Error!'
              }
            }
          },
          
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Styling - Basic'
          },
          {
            opcode: 'setBackground',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set console background to [COLOR] with opacity [OPACITY]%',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#000000'
              },
              OPACITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 80
              }
            }
          },
          {
            opcode: 'setTextColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set console text color to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ffffff'
              }
            }
          },
          {
            opcode: 'setFont',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set console font to [FONT] size [SIZE]px',
            arguments: {
              FONT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'fontMenu',
                defaultValue: 'monospace'
              },
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 14
              }
            }
          },
          {
            opcode: 'setBorder',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set console border [STYLE] [WIDTH]px color [COLOR]',
            arguments: {
              STYLE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'borderStyleMenu',
                defaultValue: 'solid'
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ffffff'
              }
            }
          },
          {
            opcode: 'setPosition',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set console position [POSITION] with padding [PADDING]px',
            arguments: {
              POSITION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'positionMenu',
                defaultValue: 'bottom'
              },
              PADDING: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 20
              }
            }
          },
          {
            opcode: 'setDimensions',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set console width [WIDTH]% height [HEIGHT]%',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 80
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 40
              }
            }
          },
          {
            opcode: 'setAutocompleteBackground',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set autocomplete background to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#333333'
              }
            }
          },
          {
            opcode: 'setAutocompleteHighlight',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set autocomplete highlight to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#666666'
              }
            }
          },
          
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Styling - Advanced'
          },
          {
            opcode: 'setCustomCSS',
            blockType: Scratch.BlockType.COMMAND,
            text: 'apply custom CSS [CSS]',
            arguments: {
              CSS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '.turbowarp-console { /* CSS here */ }'
              }
            }
          }
        ],
        menus: {
          fontMenu: {
            acceptReporters: true,
            items: [
              'monospace',
              'sans-serif',
              'serif',
              'Arial',
              'Courier New',
              'Georgia',
              'Times New Roman',
              'Verdana'
            ]
          },
          borderStyleMenu: {
            acceptReporters: true,
            items: [
              'solid',
              'dashed',
              'dotted',
              'double',
              'none'
            ]
          },
          positionMenu: {
            acceptReporters: true,
            items: [
              'top',
              'center',
              'bottom'
            ]
          }
        }
      };
    }

    whenOpened() {
      // Hat block - handled by runtime
    }

    whenClosed() {
      // Hat block - handled by runtime
    }

    whenCommandExecuted(args) {
      return args.COMMAND === this.lastExecutedCommand.name;
    }

    isConsoleOpen() {
      return this.consoleOpen;
    }

    getConsoleInput() {
      return this.currentInput;
    }

    openConsole() {
      this._openConsole();
    }

    closeConsole() {
      this._closeConsole();
    }

    clearConsole() {
      this._clearOutput();
    }

    registerCommand(args) {
      this._registerCommand(args.NAME);
    }

    registerCommandWithDescription(args) {
      this._registerCommand(args.NAME, args.DESC);
    }

    getCommandArguments() {
      return JSON.stringify(this.lastExecutedCommand.args);
    }

    addOutput(args) {
      this._addOutput(args.TEXT);
    }

    addError(args) {
      this._addError(args.TEXT);
    }

    setBackground(args) {
      this.styling.backgroundColor = args.COLOR;
      this.styling.backgroundOpacity = Math.max(0, Math.min(100, args.OPACITY));
      this.updateStyles();
    }

    setTextColor(args) {
      this.styling.textColor = args.COLOR;
      this.updateStyles();
    }

    setFont(args) {
      this.styling.fontFamily = args.FONT;
      this.styling.fontSize = Math.max(8, Math.min(72, args.SIZE));
      this.updateStyles();
    }

    setBorder(args) {
      this.styling.borderStyle = args.STYLE;
      this.styling.borderWidth = Math.max(0, args.WIDTH);
      this.styling.borderColor = args.COLOR;
      this.updateStyles();
    }

    setPosition(args) {
      this.styling.position = args.POSITION;
      this.styling.padding = Math.max(0, args.PADDING);
      this.updateStyles();
    }

    setDimensions(args) {
      this.styling.width = Math.max(10, Math.min(100, args.WIDTH));
      this.styling.height = Math.max(10, Math.min(100, args.HEIGHT));
      this.updateStyles();
    }

    setAutocompleteBackground(args) {
      this.styling.autocompleteBackground = args.COLOR;
      this.updateStyles();
    }

    setAutocompleteHighlight(args) {
      this.styling.autocompleteHighlight = args.COLOR;
      this.updateStyles();
    }

    setCustomCSS(args) {
      this.styling.customCSS = args.CSS;
      this.updateStyles();
    }
  }

  Scratch.extensions.register(new DeveloperConsole());
})(Scratch);
