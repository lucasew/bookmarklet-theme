(function () {
    const url = new URL(document.currentScript.src)
    let cssTheme = url.searchParams.get('theme') || 'white'
    const cssDefaultTheme = url.searchParams.get('defautTheme') || cssTheme
    const cssDefaultDarkTheme = url.searchParams.get('defautDarkTheme') || 'dark'
    const localstorageKey = url.searchParams.get('localstorageKey') || 'theme'

    const buttonNode = document.createElement('button')
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
        let cssNode = document.createElement('link');
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
	return localStorage.getItem(
        localstorageKey) || cssDefaultTheme
    }
    function triggerThemeChange() {
	const theme = getSelectedThemeName()
	buttonNode.innerText = theme
        cssNode.href = themes[theme] || themes[cssDefaultTheme]
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
    buttonNode.onclick = toggleTheme
    buttonNode.style.position = "fixed"
    buttonNode.style.bottom = 0
    buttonNode.style.right = 0
    document.body.appendChild(buttonNode)
})()
