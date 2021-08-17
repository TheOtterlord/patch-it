<span align="center">
 <h1>Patch it!</h1>
</span>

> **WARNING**: Never paste code into **Patch it!** from an untrusted source. Always make sure you understand what the code is doing before adding it.

**Patch it!** is a Firefox browser extension for JavaScript/CSS injection. Essentially, it allows you to customize a website by adding your own JavaScript/CSS. Use scopes to define where your code should be loaded, and watch as your code customizes websites you visit.

This is a learning project first, but I'll be supporting it because I find it really useful.

## Installation

Head to [addons.mozilla.org](https://addons.mozilla.org) and download the extension to get started!

## Usage

1. Create a scope (a url or a url matching pattern)

For example, the scope `https://mozilla.org/*` will match any page on https://mozilla.org.

2. Add your JavaScript and CSS

```js
console.log('Hello world!')
```

```css
.extend {
  background: #000;
  color: #fff;
}
```

3. Hit save and visit a web page in your scope!
