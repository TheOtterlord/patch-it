const scripts = []

function createScope() {
  const scope = document.querySelector('#scope').value
  scripts.push({
    scope,
    js: '',
    css: ''
  })
  save()
  renderScopes()
  loadScope(scripts.length - 1)
}

function saveScope() {
  console.log(scripts, document.querySelector('#scopes').selectedIndex)
  scripts[document.querySelector('#scopes').selectedIndex].js = document.querySelector('#js').value
  scripts[document.querySelector('#scopes').selectedIndex].css = document.querySelector('#css').value
  save()
}

function save(override) {
  browser.storage.local.set({scripts: override ?? scripts})
}

function renderScopes() {
  document.querySelector('#scopes').textContent = ''
  document.querySelector('#scopes').append(...scripts.map((script, i) => {
    const el = document.createElement('option')
    el.value = i
    el.innerText = script.scope
    return el
  }))
}

function deleteScope(i) {
  scripts.splice(i, 1)
  save()
  if (scripts.length === 0) defaultScope()
  document.querySelector('#scopes').selectedIndex = 0
  loadScope(0)
}

function defaultScope() {
  scripts.splice(0, scripts.length)
  scripts.push({
    scope: 'https://mozilla.org/*',
    js: 'console.log(\'Hello world!\')',
    css: ''
  })
  save()
}

function loadScope(i) {
  const script = scripts[i]
  if (!script) return // ERROR?
  document.querySelector('#js').innerText = script.js
  document.querySelector('#css').innerText = script.css
}

browser.storage.local.get('scripts').then(data => {
  if (!data.scripts || !data.scripts.length) defaultScope()
  else scripts.push(...data.scripts)

  renderScopes()
  loadScope(0)
})

document.querySelector('#new').addEventListener('click', createScope)
document.querySelector('#delete').addEventListener('click', () => deleteScope(document.querySelector('#scopes').selectedIndex))
document.querySelector('#save').addEventListener('click', saveScope)
document.querySelector('#scopes').addEventListener('change', e=> loadScope(e.target.selectedIndex))
