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
    triggerThemeChange()
    buttonThemeToggle.onclick = toggleTheme
    buttonThemeToggle.style.height = "0.5in"
    buttonThemeToggle.style.width = "calc(100vw / 3)"
    
    const buttonIncreaseFont = document.createElement('button')
    buttonIncreaseFont.onclick = () => changeFontSize(1)
    buttonIncreaseFont.innerHTML = 'A<sub>+</sub>'
    buttonIncreaseFont.style.height = "0.5in"
    buttonIncreaseFont.style.width = "calc(100vw / 3)"

    const buttonDecreaseFont = document.createElement('button')
    buttonDecreaseFont.onclick = () => changeFontSize(-1)
    buttonDecreaseFont.innerHTML = 'A<sub>-</sub>'
    buttonDecreaseFont.style.height = "0.5in"
    buttonDecreaseFont.style.width = "calc(100vw / 3)"

    buttonArea.style.position = "fixed"
    buttonArea.style.bottom = 0
    buttonArea.style.left = 0
    buttonArea.style.lineHeight = 0
    buttonArea.style.fontSize = 0
    buttonArea.appendChild(buttonIncreaseFont)
    buttonArea.appendChild(buttonThemeToggle)
    buttonArea.appendChild(buttonDecreaseFont)
    document.body.appendChild(buttonArea)
})()
