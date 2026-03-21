(function () {
    function reportError(error) {
        console.error("[Bookmarklet Theme Error]", error);
        // Could be wired to Sentry or another centralized logging service here
    }

    try {
        const root = document.querySelector(':root')
        const url = new URL(document.currentScript.src)
        let cssTheme = url.searchParams.get('theme') || 'white'
        const cssDefaultTheme = url.searchParams.get('defautTheme') || cssTheme
        const cssDefaultDarkTheme = url.searchParams.get('defautDarkTheme') || 'dark'
        const localstorageKey = url.searchParams.get('localstorageKey') || 'theme'

        let fontSizeRem = parseInt(url.searchParams.get('fontsize')) || 1

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

        function getSelectedThemeName() {
            return localStorage.getItem(localstorageKey) || cssDefaultTheme
        }
        function triggerThemeChange() {
            const theme = getSelectedThemeName()
            buttonThemeToggle.innerHTML = theme + "<sub> </sub>"
            cssNode.href = themes[theme] || themes[cssDefaultTheme]
            const size = String(fontSizeRem)
            root.style.fontSize = `calc(16px + ${size}px)`
        }
        function changeFontSize(diff) {
            fontSizeRem = fontSizeRem + diff
            triggerThemeChange()
        }
        function toggleTheme() {
            const selected = getSelectedThemeName()
            if (selected === cssDefaultTheme) {
                localStorage.setItem(localstorageKey, cssDefaultDarkTheme)
            } else {
                localStorage.setItem(localstorageKey, cssDefaultTheme)
            }
            triggerThemeChange()
        }

        function createControlButton(innerHTML, onClick) {
            const button = document.createElement('button')
            button.onclick = onClick
            button.innerHTML = innerHTML
            button.style.height = "0.5in"
            button.style.width = "calc(100vw / 3)"
            button.style.padding = '0'
            return button
        }

        const buttonIncreaseFont = createControlButton('A<sub>+</sub>', () => changeFontSize(1))
        const buttonThemeToggle = createControlButton('', toggleTheme)
        const buttonDecreaseFont = createControlButton('A<sub>-</sub>', () => changeFontSize(-1))

        triggerThemeChange() // Requires buttonThemeToggle to be initialized so innerHTML can be updated

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
    } catch (error) {
        reportError(error);
    }
})()
