/**
 * Injects a configurable bookmarklet theme controller into the current page.
 * Modifies the DOM to add fixed UI controls for toggling a light/dark theme
 * and adjusting font sizes. The theme is loaded dynamically via a `<link>` tag.
 *
 * Configuration options can be passed via query parameters on the script URL:
 * - `theme`: The initial theme if none is set in local storage (default: 'white').
 * - `defautTheme`: Alias for `theme` used when toggling (default: `theme`).
 * - `defautDarkTheme`: The alternative theme used when toggling (default: 'dark').
 * - `localstorageKey`: Key used to persist the selected theme (default: 'theme').
 * - `fontsize`: Initial font size modifier in rems (default: 1).
 */
(function () {
    const root = document.querySelector(':root')
    const url = new URL(document.currentScript.src)
    let cssTheme = url.searchParams.get('theme') || 'white'
    const cssDefaultTheme = url.searchParams.get('defautTheme') || cssTheme
    const cssDefaultDarkTheme = url.searchParams.get('defautDarkTheme') || 'dark'
    const localstorageKey = url.searchParams.get('localstorageKey') || 'theme'

    let fontSizeRem = parseInt(url.searchParams.get('fontsize')) || 1

    const buttonThemeToggle = document.createElement('button')
    const buttonArea = document.createElement('div')
    let cssNode = null
    if (!cssNode) {
        const themeNode = document.getElementById('theme')
        if (themeNode) {
            if (themeNode.nodeName == "LINK" && themeNode.rel == "stylesheet") {
                cssNode = themeNode
            }
        }
    }
    if (!cssNode) {
        cssNode = document.createElement('link');
        document.head.appendChild(cssNode)
    }

    cssNode.id = "css";
    cssNode.rel = "stylesheet";
    cssNode.href = "https://unpkg.com/sakura.css/css/sakura.css";
    cssNode.type = "text/css";
    const themes = {
        'white': "https://unpkg.com/sakura.css/css/sakura.css",
        'dark': "https://unpkg.com/sakura.css/css/sakura-dark.css"
    }

    /**
     * Retrieves the currently selected theme from local storage.
     * Fallbacks to the configured default theme if no user preference is persisted.
     *
     * @returns {string} The active theme name.
     */
    function getSelectedThemeName() {
        return localStorage.getItem(localstorageKey) || cssDefaultTheme
    }

    /**
     * Applies the current theme and font size to the document.
     * Updates the `<link>` tag with the appropriate CSS URL from the `themes` map
     * and adjusts the root `font-size` style. Also updates the toggle button text.
     */
    function triggerThemeChange() {
        const theme = getSelectedThemeName()
        buttonThemeToggle.innerHTML = theme + "<sub> </sub>"
        cssNode.href = themes[theme] || themes[cssDefaultTheme]
        const size = String(fontSizeRem)
        root.style.fontSize = `calc(16px + ${size}px)`
    }

    /**
     * Modifies the global font size modifier and triggers a DOM update.
     *
     * @param {number} diff - The amount to increment or decrement the font size modifier.
     */
    function changeFontSize(diff) {
        fontSizeRem = fontSizeRem + diff
        triggerThemeChange()
    }

    /**
     * Toggles the persisted theme between the configured default light and dark themes.
     * Saves the new selection to local storage and updates the DOM.
     */
    function toggleTheme() {
        const selected = getSelectedThemeName()
        if (selected === cssDefaultTheme) {
            localStorage.setItem(localstorageKey, cssDefaultDarkTheme)
        } else {
            localStorage.setItem(localstorageKey, cssDefaultTheme)
        }
        triggerThemeChange()
    }
    triggerThemeChange()
    buttonThemeToggle.onclick = toggleTheme
    buttonThemeToggle.style.height = "0.5in"
    buttonThemeToggle.style.width = "calc(100vw / 3)"
    buttonThemeToggle.style.padding = '0'
    
    const buttonIncreaseFont = document.createElement('button')
    buttonIncreaseFont.onclick = () => changeFontSize(1)
    buttonIncreaseFont.innerHTML = 'A<sub>+</sub>'
    buttonIncreaseFont.style.height = "0.5in"
    buttonIncreaseFont.style.width = "calc(100vw / 3)"
    buttonIncreaseFont.style.padding = '0'

    const buttonDecreaseFont = document.createElement('button')
    buttonDecreaseFont.onclick = () => changeFontSize(-1)
    buttonDecreaseFont.innerHTML = 'A<sub>-</sub>'
    buttonDecreaseFont.style.height = "0.5in"
    buttonDecreaseFont.style.width = "calc(100vw / 3)"
    buttonDecreaseFont.style.padding = '0'

    buttonArea.style.position = "fixed"
    buttonArea.style.bottom = 0
    buttonArea.style.left = 0
    buttonArea.style.lineHeight = 0
    buttonArea.style.fontSize = 0
    buttonArea.style.width = "100vw"
    buttonArea.appendChild(buttonIncreaseFont)
    buttonArea.appendChild(buttonThemeToggle)
    buttonArea.appendChild(buttonDecreaseFont)
    document.body.appendChild(buttonArea)
})()
