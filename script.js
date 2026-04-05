/**
 * Bookmarklet entrypoint that injects a floating UI for reading accessibility.
 * It parses URL parameters from the script source, mounts a dynamic CSS link
 * for the selected Sakura theme, and injects a fixed position div at the bottom
 * of the screen to toggle themes and scale the root font size.
 *
 * Side effects:
 * - Appends a `<link>` for CSS in `<head>` if not present.
 * - Appends a container `<div>` in `<body>` holding three buttons.
 * - Mutates `:root` element's style attribute to scale fonts.
 * - Mutates `localStorage` to persist theme choices.
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
     * Retrieves the user's preferred theme key, falling back to the configured
     * default theme from the script parameters if no choice has been saved yet.
     * @returns {string} The active theme key (e.g. 'white', 'dark')
     */
    function getSelectedThemeName() {
        return localStorage.getItem(localstorageKey) || cssDefaultTheme
    }

    /**
     * Propagates the active state to the DOM elements.
     * Updates the injected `<link>` stylesheet URL based on the current theme key,
     * reflects the current theme name in the toggle button's text content, and
     * recalculates the `:root` font size to apply the current offset `fontSizeRem`.
     */
    function triggerThemeChange() {
        const theme = getSelectedThemeName()
        buttonThemeToggle.innerHTML = theme + "<sub> </sub>"
        cssNode.href = themes[theme] || themes[cssDefaultTheme]
        const size = String(fontSizeRem)
        root.style.fontSize = `calc(16px + ${size}px)`
    }

    /**
     * Shifts the accumulated font-size delta by the specified difference.
     * Always triggers a DOM update to reflect the newly calculated font size.
     * @param {number} diff - Amount to adjust the base scale (can be negative).
     */
    function changeFontSize(diff) {
        fontSizeRem = fontSizeRem + diff
        triggerThemeChange()
    }

    /**
     * Switches the theme state strictly between the URL-provided default light
     * and default dark keys. The decision operates as a binary toggle logic
     * based entirely on whether the current state equals `cssDefaultTheme`.
     * Persists the newly selected state back to localStorage before applying DOM changes.
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
