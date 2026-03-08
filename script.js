(function () {
    function reportError(error, context) {
        console.error("Bookmarklet Theme Error:", context, error);
    }

    try {

    const CONSTANTS = {
        DEFAULT_THEME: 'white',
        DEFAULT_DARK_THEME: 'dark',
        LOCALSTORAGE_KEY_DEFAULT: 'theme',
        DEFAULT_FONT_SIZE_REM: 1,
        BASE_FONT_SIZE_PX: 16,
        BUTTON_HEIGHT: "0.5in",
        BUTTON_WIDTH: "calc(100vw / 3)",
        SAKURA_CSS: "https://unpkg.com/sakura.css/css/sakura.css",
        SAKURA_DARK_CSS: "https://unpkg.com/sakura.css/css/sakura-dark.css"
    };

    const root = document.querySelector(':root')
    const url = new URL(document.currentScript.src)
    let cssTheme = url.searchParams.get('theme') || CONSTANTS.DEFAULT_THEME
    const cssDefaultTheme = url.searchParams.get('defautTheme') || cssTheme
    const cssDefaultDarkTheme = url.searchParams.get('defautDarkTheme') || CONSTANTS.DEFAULT_DARK_THEME
    const localstorageKey = url.searchParams.get('localstorageKey') || CONSTANTS.LOCALSTORAGE_KEY_DEFAULT

    let fontSizeRem = parseInt(url.searchParams.get('fontsize')) || CONSTANTS.DEFAULT_FONT_SIZE_REM

    const buttonArea = document.createElement('div')

    function setupStylesheetNode() {
        let node = null;
        const themeNode = document.getElementById('theme')
        if (themeNode && themeNode.nodeName === "LINK" && themeNode.rel === "stylesheet") {
            node = themeNode;
        }
        if (!node) {
            node = document.createElement('link');
            document.head.appendChild(node)
        }
        node.id = "css";
        node.rel = "stylesheet";
        node.href = CONSTANTS.SAKURA_CSS;
        node.type = "text/css";
        return node;
    }

    const cssNode = setupStylesheetNode();

    const themes = {
        'white': CONSTANTS.SAKURA_CSS,
        'dark': CONSTANTS.SAKURA_DARK_CSS
    }
    function getSelectedThemeName() {
        try {
            return localStorage.getItem(localstorageKey) || cssDefaultTheme
        } catch (error) {
            reportError(error, "getSelectedThemeName");
            return cssDefaultTheme;
        }
    }
    function triggerThemeChange() {
        const theme = getSelectedThemeName()
        buttonThemeToggle.innerHTML = theme + "<sub> </sub>"
        cssNode.href = themes[theme] || themes[cssDefaultTheme]
        const size = String(fontSizeRem)
        root.style.fontSize = `calc(${CONSTANTS.BASE_FONT_SIZE_PX}px + ${size}px)`
    }
    function changeFontSize(diff) {
        try {
            fontSizeRem = fontSizeRem + diff
            triggerThemeChange()
        } catch (error) {
            reportError(error, "changeFontSize");
        }
    }
    function toggleTheme() {
        try {
            const selected = getSelectedThemeName()
            if (selected === cssDefaultTheme) {
                localStorage.setItem(localstorageKey, cssDefaultDarkTheme)
            } else {
                localStorage.setItem(localstorageKey, cssDefaultTheme)
            }
            triggerThemeChange()
        } catch (error) {
            reportError(error, "toggleTheme");
        }
    }
    function createControlButton(html, onClickHandler) {
        const btn = document.createElement('button')
        btn.innerHTML = html
        btn.onclick = onClickHandler
        btn.style.height = CONSTANTS.BUTTON_HEIGHT
        btn.style.width = CONSTANTS.BUTTON_WIDTH
        btn.style.padding = '0'
        return btn
    }

    function initializeControlArea(area, btnIncrease, btnToggle, btnDecrease) {
        area.style.position = "fixed"
        area.style.bottom = 0
        area.style.left = 0
        area.style.lineHeight = 0
        area.style.fontSize = 0
        area.style.width = "100vw"
        area.appendChild(btnIncrease)
        area.appendChild(btnToggle)
        area.appendChild(btnDecrease)
        document.body.appendChild(area)
    }

    // We instantiate the theme toggle button first so we can update its label via triggerThemeChange()
    const buttonThemeToggle = createControlButton('', toggleTheme)

    triggerThemeChange()
    
    const buttonIncreaseFont = createControlButton('A<sub>+</sub>', () => changeFontSize(1))
    const buttonDecreaseFont = createControlButton('A<sub>-</sub>', () => changeFontSize(-1))

    initializeControlArea(buttonArea, buttonIncreaseFont, buttonThemeToggle, buttonDecreaseFont)

    } catch (error) {
        reportError(error, "Initialization");
    }
})()
