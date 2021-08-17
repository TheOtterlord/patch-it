browser.storage.local.get('scripts').then(data => {
  for (var i=0; i<data.scripts.length; i++) {
    const script = data.scripts[i]

    // check if the scope matches the current page (continue if not)
    const split = script.scope.split('://')
    const protocol = split[0]
    const domain = split[1].split('/')[0]
    const path = split[1].split('/').slice(1).join('/')
    if (protocol !== '*' && `${protocol}:` !== location.protocol) continue
    if (domain !== '*' && domain !== (location.hostname.startsWith('www.') ? location.hostname.substr(4) : location.hostname) ) continue
    if (path !== '*' && path !== location.pathname) continue

    // Add the css
    const style = document.createElement('style')
    style.innerText = script.css
    document.head.appendChild(style)

    // Run the script
    new Function(script.js)()
  }
})
