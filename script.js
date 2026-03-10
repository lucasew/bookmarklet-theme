(function () {
    function reportError(error, context) {
        console.error("Bookmarklet Theme Error:", context, error);
    }

    class BookmarkletThemeController {
        static CONFIG = {
            BUTTON_HEIGHT: "0.5in",
            BUTTON_WIDTH: "calc(100vw / 3)",
            BASE_FONT_SIZE_PX: 16
        };

        constructor() {
            this.root = document.querySelector(':root');
            this.url = new URL(document.currentScript.src);
            this.cssTheme = this.url.searchParams.get('theme') || 'white';
            this.cssDefaultTheme = this.url.searchParams.get('defautTheme') || this.cssTheme;
            this.cssDefaultDarkTheme = this.url.searchParams.get('defautDarkTheme') || 'dark';
            this.localstorageKey = this.url.searchParams.get('localstorageKey') || 'theme';

            this.fontSizeRem = parseInt(this.url.searchParams.get('fontsize')) || 1;

            this.buttonThemeToggle = document.createElement('button');
            this.buttonArea = document.createElement('div');
            this.cssNode = null;
            this.themes = {
                'white': "https://unpkg.com/sakura.css/css/sakura.css",
                'dark': "https://unpkg.com/sakura.css/css/sakura-dark.css"
            };
        }

        setupCSSNode() {
            if (!this.cssNode) {
                const themeNode = document.getElementById('theme');
                if (themeNode) {
                    if (themeNode.nodeName == "LINK" && themeNode.rel == "stylesheet") {
                        this.cssNode = themeNode;
                    }
                }
            }
            if (!this.cssNode) {
                this.cssNode = document.createElement('link');
                document.head.appendChild(this.cssNode);
            }

            this.cssNode.id = "css";
            this.cssNode.rel = "stylesheet";
            this.cssNode.href = "https://unpkg.com/sakura.css/css/sakura.css";
            this.cssNode.type = "text/css";
        }

        getSelectedThemeName() {
            return localStorage.getItem(this.localstorageKey) || this.cssDefaultTheme;
        }

        triggerThemeChange() {
            const theme = this.getSelectedThemeName();
            this.buttonThemeToggle.innerHTML = theme + "<sub> </sub>";
            this.cssNode.href = this.themes[theme] || this.themes[this.cssDefaultTheme];
            const size = String(this.fontSizeRem);
            this.root.style.fontSize = `calc(${BookmarkletThemeController.CONFIG.BASE_FONT_SIZE_PX}px + ${size}px)`;
        }

        changeFontSize(diff) {
            try {
                this.fontSizeRem = this.fontSizeRem + diff;
                this.triggerThemeChange();
            } catch (error) {
                reportError(error, "changeFontSize");
            }
        }

        toggleTheme() {
            try {
                const selected = this.getSelectedThemeName();
                if (selected === this.cssDefaultTheme) {
                    localStorage.setItem(this.localstorageKey, this.cssDefaultDarkTheme);
                } else {
                    localStorage.setItem(this.localstorageKey, this.cssDefaultTheme);
                }
                this.triggerThemeChange();
            } catch (error) {
                reportError(error, "toggleTheme");
            }
        }

        initialize() {
            try {
                this.setupCSSNode();
                this.triggerThemeChange();

                this.buttonThemeToggle.onclick = () => this.toggleTheme();
                this.buttonThemeToggle.style.height = BookmarkletThemeController.CONFIG.BUTTON_HEIGHT;
                this.buttonThemeToggle.style.width = BookmarkletThemeController.CONFIG.BUTTON_WIDTH;
                this.buttonThemeToggle.style.padding = '0';

                const buttonIncreaseFont = document.createElement('button');
                buttonIncreaseFont.onclick = () => this.changeFontSize(1);
                buttonIncreaseFont.innerHTML = 'A<sub>+</sub>';
                buttonIncreaseFont.style.height = BookmarkletThemeController.CONFIG.BUTTON_HEIGHT;
                buttonIncreaseFont.style.width = BookmarkletThemeController.CONFIG.BUTTON_WIDTH;
                buttonIncreaseFont.style.padding = '0';

                const buttonDecreaseFont = document.createElement('button');
                buttonDecreaseFont.onclick = () => this.changeFontSize(-1);
                buttonDecreaseFont.innerHTML = 'A<sub>-</sub>';
                buttonDecreaseFont.style.height = BookmarkletThemeController.CONFIG.BUTTON_HEIGHT;
                buttonDecreaseFont.style.width = BookmarkletThemeController.CONFIG.BUTTON_WIDTH;
                buttonDecreaseFont.style.padding = '0';

                this.buttonArea.style.position = "fixed";
                this.buttonArea.style.bottom = 0;
                this.buttonArea.style.left = 0;
                this.buttonArea.style.lineHeight = 0;
                this.buttonArea.style.fontSize = 0;
                this.buttonArea.style.width = "100vw";
                this.buttonArea.appendChild(buttonIncreaseFont);
                this.buttonArea.appendChild(this.buttonThemeToggle);
                this.buttonArea.appendChild(buttonDecreaseFont);
                document.body.appendChild(this.buttonArea);
            } catch (error) {
                reportError(error, "initialize");
            }
        }
    }

    const controller = new BookmarkletThemeController();
    controller.initialize();
})()
