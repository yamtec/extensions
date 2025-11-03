/**
 * TurboWarp Tooltips Extension
 * Display customizable tooltips with markdown, styling, and positioning options
 */
(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class TooltipExtension {
    constructor() {
      this.tooltipElement = null;
      this.tooltipContentElement = null;
      this.isVisible = false;
      this.currentText = '';
      this.currentX = 0;
      this.currentY = 0;
      this.positionMode = 'fixed'; // 'fixed' or 'follow cursor'
      this.cursorOffsetX = 0;
      this.cursorOffsetY = 0;
      this.mouseMoveListener = null;
      this.autoHideTimeout = null;
      
      // Styling properties
      this.styling = {
        fontFamily: 'Arial',
        fontSize: 14,
        textColor: '#ffffff',
        backgroundColor: '#000000',
        backgroundOpacity: 90,
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        width: 0, // 0 = auto
        maxWidth: 300,
        shadowEnabled: true,
        shadowX: 2,
        shadowY: 2,
        shadowBlur: 4,
        shadowColor: '#000000',
        zIndex: 10000,
        imageMaxWidth: 0, // 0 = auto, max width for block images
        imageMaxHeight: 0, // 0 = auto, max height for block images
        imageBorderRadius: 4,
        inlineImageSize: 20 // Size for inline images (emoji-style)
      };
      
      // Behavior properties
      this.behavior = {
        autoHideEnabled: false,
        autoHideDuration: 3,
        fadeDuration: 200,
        fadeInEnabled: true,
        fadeOutEnabled: true
      };

      this.initializeTooltip();
    }

    initializeTooltip() {
      // Create tooltip container
      const tooltip = document.createElement('div');
      tooltip.className = 'turbowarp-tooltip';
      tooltip.style.position = 'fixed';
      tooltip.style.display = 'none';
      tooltip.style.pointerEvents = 'auto';
      
      // Create content container
      const content = document.createElement('div');
      content.className = 'turbowarp-tooltip-content';
      
      tooltip.appendChild(content);
      document.body.appendChild(tooltip);
      
      this.tooltipElement = tooltip;
      this.tooltipContentElement = content;
      
      this.updateTooltipStyles();
    }

    updateTooltipStyles() {
      const s = this.styling;
      const tooltip = this.tooltipElement;
      
      if (!tooltip) return;
      
      const opacity = s.backgroundOpacity / 100;
      const bgColor = this.hexToRgba(s.backgroundColor, opacity);
      
      tooltip.style.fontFamily = s.fontFamily;
      tooltip.style.fontSize = `${s.fontSize}px`;
      tooltip.style.color = s.textColor;
      tooltip.style.backgroundColor = bgColor;
      tooltip.style.border = `${s.borderWidth}px solid ${s.borderColor}`;
      tooltip.style.borderRadius = `${s.borderRadius}px`;
      tooltip.style.padding = `${s.padding}px`;
      tooltip.style.maxWidth = `${s.maxWidth}px`;
      tooltip.style.zIndex = s.zIndex;
      tooltip.style.boxSizing = 'border-box';
      tooltip.style.wordWrap = 'break-word';
      tooltip.style.lineHeight = '1.5';
      
      if (s.width > 0) {
        tooltip.style.width = `${s.width}px`;
      } else {
        tooltip.style.width = 'auto';
      }
      
      if (s.shadowEnabled) {
        tooltip.style.boxShadow = `${s.shadowX}px ${s.shadowY}px ${s.shadowBlur}px ${s.shadowColor}`;
      } else {
        tooltip.style.boxShadow = 'none';
      }
      
      // Transition for animations
      if (this.behavior.fadeInEnabled || this.behavior.fadeOutEnabled) {
        tooltip.style.transition = `opacity ${this.behavior.fadeDuration}ms ease-in-out`;
      } else {
        tooltip.style.transition = 'none';
      }
    }

    hexToRgba(hex, alpha) {
      // Handle both #RGB and #RRGGBB formats
      let r, g, b;
      
      if (hex.startsWith('#')) {
        hex = hex.slice(1);
      }
      
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      } else {
        return `rgba(0, 0, 0, ${alpha})`;
      }
      
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    parseMarkdown(text) {
      // Convert markdown to HTML
      let html = String(text);
      
      // Process custom color syntax first: {color:colorname}text{/color}
      html = html.replace(/\{color:([^}]+)\}(.*?)\{\/color\}/g, (match, color, content) => {
        return `<span style="color: ${color}">${content}</span>`;
      });
      
      // Process inline images: {img:url} or {img:url:alt}
      html = html.replace(/\{img:([^:}]+)(?::([^}]*))?\}/g, (match, url, alt) => {
        const altText = alt || 'inline image';
        return `<img src="${url}" alt="${altText}" title="${altText}" class="tooltip-inline-image" />`;
      });
      
      // Headers
      html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
      html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
      html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
      
      // Code blocks (must be before inline code)
      html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
      
      // Inline code
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
      
      // Bold
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      
      // Italic
      html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      
      // Strikethrough
      html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');
      
      // Images - must be before links to handle [![alt](image)](link) syntax
      // Image with link: [![alt](image)](link)
      html = html.replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, '<a href="$3" target="_blank" rel="noopener noreferrer"><img src="$2" alt="$1" title="$1" class="tooltip-linked-image" /></a>');
      
      // Regular image: ![alt](url)
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" title="$1" class="tooltip-image" />');
      
      // Links - make them clickable
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      
      // Lists - handle both unordered and ordered
      // First, mark list items
      html = html.replace(/^\* (.+)$/gm, '___UL_ITEM___$1___END_UL_ITEM___');
      html = html.replace(/^\d+\. (.+)$/gm, '___OL_ITEM___$1___END_OL_ITEM___');
      
      // Wrap consecutive UL items
      html = html.replace(/(___UL_ITEM___.*?___END_UL_ITEM___(\n|<br>)*)+/g, (match) => {
        const items = match.match(/___UL_ITEM___(.*?)___END_UL_ITEM___/g);
        if (items) {
          const listItems = items.map(item => {
            const content = item.replace(/___UL_ITEM___|___END_UL_ITEM___/g, '');
            return `<li>${content}</li>`;
          }).join('');
          return `<ul>${listItems}</ul>`;
        }
        return match;
      });
      
      // Wrap consecutive OL items
      html = html.replace(/(___OL_ITEM___.*?___END_OL_ITEM___(\n|<br>)*)+/g, (match) => {
        const items = match.match(/___OL_ITEM___(.*?)___END_OL_ITEM___/g);
        if (items) {
          const listItems = items.map(item => {
            const content = item.replace(/___OL_ITEM___|___END_OL_ITEM___/g, '');
            return `<li>${content}</li>`;
          }).join('');
          return `<ol>${listItems}</ol>`;
        }
        return match;
      });
      
      // Clean up any remaining markers
      html = html.replace(/___UL_ITEM___|___END_UL_ITEM___|___OL_ITEM___|___END_OL_ITEM___/g, '');
      
      // Line breaks
      html = html.replace(/\n/g, '<br>');
      
      return html;
    }

    showTooltipAt(text, x, y) {
      this.currentText = String(text);
      this.currentX = Number(x);
      this.currentY = Number(y);
      this.positionMode = 'fixed';
      
      this.stopFollowingCursor();
      this.renderTooltip();
      this.positionTooltip(this.currentX, this.currentY);
      this.displayTooltip();
    }

    showTooltipFollowingCursor(text, offsetX = 0, offsetY = 0) {
      this.currentText = String(text);
      this.cursorOffsetX = Number(offsetX);
      this.cursorOffsetY = Number(offsetY);
      this.positionMode = 'follow cursor';
      
      this.renderTooltip();
      this.startFollowingCursor();
      this.displayTooltip();
    }

    renderTooltip() {
      const html = this.parseMarkdown(this.currentText);
      this.tooltipContentElement.innerHTML = html;
      
      // Apply styles to rendered content
      this.styleRenderedContent();
    }

    styleRenderedContent() {
      const content = this.tooltipContentElement;
      
      // Style headers
      const headers = content.querySelectorAll('h1, h2, h3');
      headers.forEach(h => {
        h.style.margin = '8px 0';
        h.style.fontWeight = 'bold';
      });
      
      // Style code
      const codeBlocks = content.querySelectorAll('pre');
      codeBlocks.forEach(pre => {
        pre.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        pre.style.padding = '8px';
        pre.style.borderRadius = '4px';
        pre.style.overflow = 'auto';
        pre.style.margin = '8px 0';
      });
      
      const inlineCodes = content.querySelectorAll('code');
      inlineCodes.forEach(code => {
        if (code.parentElement.tagName !== 'PRE') {
          code.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
          code.style.padding = '2px 4px';
          code.style.borderRadius = '3px';
        }
      });
      
      // Style links
      const links = content.querySelectorAll('a');
      links.forEach(a => {
        a.style.color = '#4dabf7';
        a.style.textDecoration = 'underline';
      });
      
      // Style lists
      const lists = content.querySelectorAll('ul, ol');
      lists.forEach(list => {
        list.style.margin = '8px 0';
        list.style.paddingLeft = '20px';
      });
      
      // Style images
      const images = content.querySelectorAll('img');
      images.forEach(img => {
        // Check if it's an inline image
        if (img.classList.contains('tooltip-inline-image')) {
          // Inline images (emoji-style)
          img.style.display = 'inline';
          img.style.height = `${this.styling.inlineImageSize}px`;
          img.style.width = 'auto';
          img.style.verticalAlign = 'middle';
          img.style.margin = '0 2px';
          img.style.borderRadius = '0px';
        } else {
          // Block images (regular)
          img.style.display = 'block';
          img.style.margin = '8px auto';
          img.style.borderRadius = `${this.styling.imageBorderRadius}px`;
          
          if (this.styling.imageMaxWidth > 0) {
            img.style.maxWidth = `${this.styling.imageMaxWidth}px`;
          } else {
            img.style.maxWidth = '100%';
          }
          
          if (this.styling.imageMaxHeight > 0) {
            img.style.maxHeight = `${this.styling.imageMaxHeight}px`;
          }
          
          img.style.height = 'auto';
          img.style.objectFit = 'contain';
        }
      });
    }

    positionTooltip(x, y) {
      // Convert Scratch coordinates to screen coordinates
      // Scratch: origin at center, +x right, +y up
      // Screen: origin at top-left, +x right, +y down
      
      const canvas = runtime.renderer?.canvas || document.querySelector('canvas');
      if (!canvas) {
        // Fallback positioning
        this.tooltipElement.style.left = `${x}px`;
        this.tooltipElement.style.top = `${y}px`;
        return;
      }
      
      const rect = canvas.getBoundingClientRect();
      const stageWidth = 480;
      const stageHeight = 360;
      
      // Convert Scratch coordinates to screen coordinates
      const screenX = rect.left + (rect.width / 2) + (x * (rect.width / stageWidth));
      const screenY = rect.top + (rect.height / 2) - (y * (rect.height / stageHeight));
      
      // Ensure tooltip stays within viewport
      const tooltipRect = this.tooltipElement.getBoundingClientRect();
      let finalX = screenX;
      let finalY = screenY;
      
      if (finalX + tooltipRect.width > window.innerWidth) {
        finalX = window.innerWidth - tooltipRect.width - 10;
      }
      if (finalX < 0) {
        finalX = 10;
      }
      if (finalY + tooltipRect.height > window.innerHeight) {
        finalY = window.innerHeight - tooltipRect.height - 10;
      }
      if (finalY < 0) {
        finalY = 10;
      }
      
      this.tooltipElement.style.left = `${finalX}px`;
      this.tooltipElement.style.top = `${finalY}px`;
    }

    startFollowingCursor() {
      this.stopFollowingCursor();
      
      let lastUpdateTime = 0;
      const updateInterval = 16; // ~60fps
      
      this.mouseMoveListener = (e) => {
        const now = Date.now();
        if (now - lastUpdateTime < updateInterval) {
          return;
        }
        lastUpdateTime = now;
        
        const x = e.clientX + this.cursorOffsetX;
        const y = e.clientY + this.cursorOffsetY;
        
        // Ensure tooltip stays within viewport
        const tooltipRect = this.tooltipElement.getBoundingClientRect();
        let finalX = x;
        let finalY = y;
        
        if (finalX + tooltipRect.width > window.innerWidth) {
          finalX = window.innerWidth - tooltipRect.width - 10;
        }
        if (finalX < 0) {
          finalX = 10;
        }
        if (finalY + tooltipRect.height > window.innerHeight) {
          finalY = window.innerHeight - tooltipRect.height - 10;
        }
        if (finalY < 0) {
          finalY = 10;
        }
        
        this.tooltipElement.style.left = `${finalX}px`;
        this.tooltipElement.style.top = `${finalY}px`;
      };
      
      document.addEventListener('mousemove', this.mouseMoveListener);
    }

    stopFollowingCursor() {
      if (this.mouseMoveListener) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        this.mouseMoveListener = null;
      }
    }

    displayTooltip() {
      this.cancelAutoHide();
      
      if (this.behavior.fadeInEnabled) {
        this.tooltipElement.style.opacity = '0';
        this.tooltipElement.style.display = 'block';
        
        // Force reflow
        this.tooltipElement.offsetHeight;
        
        this.tooltipElement.style.opacity = '1';
      } else {
        this.tooltipElement.style.opacity = '1';
        this.tooltipElement.style.display = 'block';
      }
      
      this.isVisible = true;
      
      if (this.behavior.autoHideEnabled) {
        this.autoHideTimeout = setTimeout(() => {
          this.hideTooltip();
        }, this.behavior.autoHideDuration * 1000);
      }
    }

    hideTooltip() {
      if (!this.isVisible) return;
      
      this.cancelAutoHide();
      this.stopFollowingCursor();
      
      if (this.behavior.fadeOutEnabled) {
        this.tooltipElement.style.opacity = '0';
        
        setTimeout(() => {
          this.tooltipElement.style.display = 'none';
        }, this.behavior.fadeDuration);
      } else {
        this.tooltipElement.style.display = 'none';
      }
      
      this.isVisible = false;
    }

    cancelAutoHide() {
      if (this.autoHideTimeout) {
        clearTimeout(this.autoHideTimeout);
        this.autoHideTimeout = null;
      }
    }

    setPositionMode(mode) {
      this.positionMode = mode;
    }

    // Block implementations
    showTooltipAtPosition(args) {
      this.showTooltipAt(args.TEXT, args.X, args.Y);
    }

    showTooltipFollowCursor(args) {
      this.showTooltipFollowingCursor(args.TEXT);
    }

    showTooltipFollowCursorOffset(args) {
      this.showTooltipFollowingCursor(args.TEXT, args.X, args.Y);
    }

    hide() {
      this.hideTooltip();
    }

    setPositionModeBlock(args) {
      this.setPositionMode(args.MODE);
    }

    setFont(args) {
      this.styling.fontFamily = args.FONT;
      this.updateTooltipStyles();
    }

    setFontSize(args) {
      this.styling.fontSize = Math.max(1, Number(args.SIZE));
      this.updateTooltipStyles();
    }

    setTextColor(args) {
      this.styling.textColor = args.COLOR;
      this.updateTooltipStyles();
    }

    setBackgroundColor(args) {
      this.styling.backgroundColor = args.COLOR;
      this.updateTooltipStyles();
    }

    setBackgroundOpacity(args) {
      this.styling.backgroundOpacity = Math.max(0, Math.min(100, Number(args.OPACITY)));
      this.updateTooltipStyles();
    }

    setBorderColor(args) {
      this.styling.borderColor = args.COLOR;
      this.updateTooltipStyles();
    }

    setBorderWidth(args) {
      this.styling.borderWidth = Math.max(0, Number(args.WIDTH));
      this.updateTooltipStyles();
    }

    setBorderRadius(args) {
      this.styling.borderRadius = Math.max(0, Number(args.RADIUS));
      this.updateTooltipStyles();
    }

    setPadding(args) {
      this.styling.padding = Math.max(0, Number(args.PADDING));
      this.updateTooltipStyles();
    }

    setWidth(args) {
      this.styling.width = Math.max(0, Number(args.WIDTH));
      this.updateTooltipStyles();
    }

    setMaxWidth(args) {
      this.styling.maxWidth = Math.max(0, Number(args.WIDTH));
      this.updateTooltipStyles();
    }

    setShadowEnabled(args) {
      this.styling.shadowEnabled = args.ENABLED === 'enabled';
      this.updateTooltipStyles();
    }

    setShadowCustom(args) {
      this.styling.shadowEnabled = true;
      this.styling.shadowX = Number(args.X);
      this.styling.shadowY = Number(args.Y);
      this.styling.shadowBlur = Math.max(0, Number(args.BLUR));
      this.styling.shadowColor = args.COLOR;
      this.updateTooltipStyles();
    }

    setZIndex(args) {
      this.styling.zIndex = Number(args.ZINDEX);
      this.updateTooltipStyles();
    }

    setAutoHide(args) {
      this.behavior.autoHideEnabled = args.ENABLED === 'enabled';
    }

    setAutoHideDuration(args) {
      this.behavior.autoHideDuration = Math.max(0, Number(args.DURATION));
    }

    setFadeDuration(args) {
      this.behavior.fadeDuration = Math.max(0, Number(args.DURATION));
      this.updateTooltipStyles();
    }

    setFadeIn(args) {
      this.behavior.fadeInEnabled = args.ENABLED === 'enabled';
      this.updateTooltipStyles();
    }

    setFadeOut(args) {
      this.behavior.fadeOutEnabled = args.ENABLED === 'enabled';
      this.updateTooltipStyles();
    }

    setImageMaxWidth(args) {
      this.styling.imageMaxWidth = Math.max(0, Number(args.WIDTH));
      this.renderTooltip();
    }

    setImageMaxHeight(args) {
      this.styling.imageMaxHeight = Math.max(0, Number(args.HEIGHT));
      this.renderTooltip();
    }

    setImageBorderRadius(args) {
      this.styling.imageBorderRadius = Math.max(0, Number(args.RADIUS));
      this.renderTooltip();
    }

    setInlineImageSize(args) {
      this.styling.inlineImageSize = Math.max(1, Number(args.SIZE));
      this.renderTooltip();
    }

    // Reporter blocks
    isVisible() {
      return this.isVisible;
    }

    getText() {
      return this.currentText;
    }

    getXPosition() {
      return this.currentX;
    }

    getYPosition() {
      return this.currentY;
    }

    getMode() {
      return this.positionMode;
    }

    getInfo() {
      return {
        id: 'tooltips',
        name: 'Tooltips',
        color1: '#9966ff',
        color2: '#855cd6',
        color3: '#774dcb',
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Display & Position'
          },
          {
            opcode: 'showTooltipAtPosition',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show tooltip [TEXT] at x: [X] y: [Y]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'showTooltipFollowCursor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show tooltip [TEXT] following cursor',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              }
            }
          },
          {
            opcode: 'showTooltipFollowCursorOffset',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show tooltip [TEXT] following cursor with offset x: [X] y: [Y]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'hide',
            blockType: Scratch.BlockType.COMMAND,
            text: 'hide tooltip'
          },
          {
            opcode: 'setPositionModeBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip position mode to [MODE]',
            arguments: {
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'positionModes',
                defaultValue: 'fixed'
              }
            }
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Styling - Font & Text'
          },
          {
            opcode: 'setFont',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip font to [FONT]',
            arguments: {
              FONT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'fonts',
                defaultValue: 'Arial'
              }
            }
          },
          {
            opcode: 'setFontSize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip font size to [SIZE]',
            arguments: {
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 14
              }
            }
          },
          {
            opcode: 'setTextColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip text color to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ffffff'
              }
            }
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Styling - Background'
          },
          {
            opcode: 'setBackgroundColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip background color to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#000000'
              }
            }
          },
          {
            opcode: 'setBackgroundOpacity',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip background opacity to [OPACITY]%',
            arguments: {
              OPACITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90
              }
            }
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Styling - Border'
          },
          {
            opcode: 'setBorderColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip border color to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ffffff'
              }
            }
          },
          {
            opcode: 'setBorderWidth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip border width to [WIDTH]px',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: 'setBorderRadius',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip border radius to [RADIUS]px',
            arguments: {
              RADIUS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4
              }
            }
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Styling - Size'
          },
          {
            opcode: 'setPadding',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip padding to [PADDING]px',
            arguments: {
              PADDING: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setWidth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip width to [WIDTH]px',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'setMaxWidth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip max width to [WIDTH]px',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 300
              }
            }
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Styling - Images'
          },
          {
            opcode: 'setImageMaxWidth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip image max width to [WIDTH]px',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'setImageMaxHeight',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip image max height to [HEIGHT]px',
            arguments: {
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'setImageBorderRadius',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip image border radius to [RADIUS]px',
            arguments: {
              RADIUS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4
              }
            }
          },
          {
            opcode: 'setInlineImageSize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip inline image size to [SIZE]px',
            arguments: {
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 20
              }
            }
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Styling - Shadow'
          },
          {
            opcode: 'setShadowEnabled',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip shadow [ENABLED]',
            arguments: {
              ENABLED: {
                type: Scratch.ArgumentType.STRING,
                menu: 'enabledDisabled',
                defaultValue: 'enabled'
              }
            }
          },
          {
            opcode: 'setShadowCustom',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip shadow to x:[X] y:[Y] blur:[BLUR] color:[COLOR]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              BLUR: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#000000'
              }
            }
          },
          {
            opcode: 'setZIndex',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip z-index to [ZINDEX]',
            arguments: {
              ZINDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10000
              }
            }
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Behavior & Animation'
          },
          {
            opcode: 'setAutoHide',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip auto-hide to [ENABLED]',
            arguments: {
              ENABLED: {
                type: Scratch.ArgumentType.STRING,
                menu: 'enabledDisabled',
                defaultValue: 'disabled'
              }
            }
          },
          {
            opcode: 'setAutoHideDuration',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip auto-hide duration to [DURATION] seconds',
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: 'setFadeDuration',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip fade duration to [DURATION] ms',
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 200
              }
            }
          },
          {
            opcode: 'setFadeIn',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip fade in [ENABLED]',
            arguments: {
              ENABLED: {
                type: Scratch.ArgumentType.STRING,
                menu: 'enabledDisabled',
                defaultValue: 'enabled'
              }
            }
          },
          {
            opcode: 'setFadeOut',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set tooltip fade out [ENABLED]',
            arguments: {
              ENABLED: {
                type: Scratch.ArgumentType.STRING,
                menu: 'enabledDisabled',
                defaultValue: 'enabled'
              }
            }
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Reporters'
          },
          {
            opcode: 'isVisible',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'tooltip visible?'
          },
          {
            opcode: 'getText',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tooltip text'
          },
          {
            opcode: 'getXPosition',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tooltip x position'
          },
          {
            opcode: 'getYPosition',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tooltip y position'
          },
          {
            opcode: 'getMode',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tooltip mode'
          }
        ],
        menus: {
          positionModes: {
            acceptReporters: true,
            items: ['fixed', 'follow cursor']
          },
          fonts: {
            acceptReporters: true,
            items: [
              'Arial',
              'Helvetica',
              'Times New Roman',
              'Courier',
              'Courier New',
              'Verdana',
              'Georgia',
              'Comic Sans MS',
              'Trebuchet MS',
              'Impact',
              'monospace',
              'sans-serif',
              'serif'
            ]
          },
          enabledDisabled: {
            acceptReporters: true,
            items: ['enabled', 'disabled']
          }
        }
      };
    }
  }

  Scratch.extensions.register(new TooltipExtension());
})(Scratch);
