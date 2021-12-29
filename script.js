(function () {
    const url = new URL(document.currentScript.src)
    const cssNode = document.createElement('link');
    const buttonNode = document.createElement('button')

    let cssTheme = url.searchParams.get('theme') || 'white'
    const cssDefaultTheme = url.searchParams.get('defautTheme') || cssTheme
    const cssDefaultDarkTheme = url.searchParams.get('defautDarkTheme') || 'dark'
    const localstorageKey = url.searchParams.get('localstorageKey') || 'theme'
    cssNode.id = "css";
    cssNode.rel = "stylesheet";
    cssNode.href = "https://unpkg.com/sakura.css/css/sakura.css";
    cssNode.type = "text/css";
    document.head.appendChild(cssNode)
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
