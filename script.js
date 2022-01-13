(function () {
    const url = new URL(document.currentScript.src)
    let cssTheme = url.searchParams.get('theme') || 'white'
    const cssDefaultTheme = url.searchParams.get('defautTheme') || cssTheme
    const cssDefaultDarkTheme = url.searchParams.get('defautDarkTheme') || 'dark'
    const localstorageKey = url.searchParams.get('localstorageKey') || 'theme'

    let fontSizePx = parseInt(url.searchParams.get('fontsize')) || parseInt(window.getComputedStyle(document.body).fontSize) || 18

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
        document.body.style.fontSize = String(fontSizePx) + "px"
    }
    function changeFontSize(diff) {
        fontSizePx = fontSizePx + diff
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
    
    const buttonIncreaseFont = document.createElement('button')
    buttonIncreaseFont.onclick = () => changeFontSize(1)
    buttonIncreaseFont.innerHTML = 'A<sub>+</sub>'

    const buttonDecreaseFont = document.createElement('button')
    buttonDecreaseFont.onclick = () => changeFontSize(-1)
    buttonDecreaseFont.innerHTML = 'A<sub>-</sub>'

    buttonArea.style.position = "fixed"
    buttonArea.style.bottom = 0
    buttonArea.style.right = 0
    buttonArea.appendChild(buttonIncreaseFont)
    buttonArea.appendChild(buttonDecreaseFont)
    buttonArea.appendChild(buttonThemeToggle)
    document.body.appendChild(buttonArea)
})()
