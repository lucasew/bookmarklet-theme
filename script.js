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
    cssNode.type = "text/css";
    cssNode.crossOrigin = "anonymous";
    const themes = {
        'white': { url: "https://unpkg.com/sakura.css@1.5.1/css/sakura.css", integrity: "sha384-ZKJPMh7X2VgE0MEjXdbOZxmKGF8C3UJvKmoP96SiJNPQLMN372XBrBK9m1cHvC4r" },
        'dark': { url: "https://unpkg.com/sakura.css@1.5.1/css/sakura-dark.css", integrity: "sha384-WfWZ/vL5Qqc7KCYT4egNnDatzmhlcNoXn5MTzhOIijamONILzryKenMfUAwwtTpb" }
    }
    function getSelectedThemeName() {
        return localStorage.getItem(localstorageKey) || cssDefaultTheme
    }
    function triggerThemeChange() {
        const theme = getSelectedThemeName()
        buttonThemeToggle.innerHTML = theme + "<sub> </sub>"
        let selectedTheme = themes[theme];
        if (!selectedTheme || typeof selectedTheme.url !== 'string') selectedTheme = themes[cssDefaultTheme];
        if (!selectedTheme || typeof selectedTheme.url !== 'string') selectedTheme = themes['white'];
        cssNode.href = selectedTheme.url;
        cssNode.integrity = selectedTheme.integrity;
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
