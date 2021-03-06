# Paper

Paper is a JavaScript UI library which is usable as an ESM module and has no
dependencies.

## Installation

### `script` Tag

```html
<script src="https://tomashubelbauer.github.io/paper/index.js" type="module"></script>
```

### Git Submodule

```bash
git submodule add https://github.com/tomashubelbauer/paper
```

## Usage

`HelloWorld.js`
```js
import { Component, h1, div, ... } from './paper/index.js';

// Note that the component class must inherit from Component directly
export default class HelloWorld extends Component {
  // This constructor must be present for Paper to be able to define the WC
  // This web component will be defined with tag `paper-hello-world`
  constructor() {
    super(HelloWorld);
  }

  // This method will comprise the component's closed shadow DOM content
  // A `HelloWorld.css` stylesheet will be imported (and effectively scoped)
  // A wrapper `div` element surrounds the component with ID equal to its name
  async *render() {
    yield h1('Hello, world!');
    const loaderDiv = div('Loading data…');
    yield loaderDiv;

    const data = await fetch('/api/data').then(response => response.json());
    loaderDiv.remove();
    for (const item of data.items) {
      yield div('Item: ', JSON.stringify(item));
    }

    if (data.more === 0) {
      return '(no more items)';
    }

    yield `There are ${data.more} more items!`;
  }
}
```

`HelloWorld.css`

This file must exist, even if empty. Paper will import it to the closed shadow
DOM.

`index.js`
```js
document.body.append(new HelloWorld());
```

## Purpose

I built Paper accidentally, by finding various tricks and hacks to make the UI
code in my personal pure-JS, no-dependencies project a little less tedious to
write. At some point it started making sense to pull it out and use it as a Git
submodule and import it as an ESM module.

## Limitations

The component class must inherit from `Component` directly. This is because of
some trickery used to determine if the class name matches the file name. If you
do not want this feature, fork Paper and remove this restriction.

## To-Do

### Split off `Component.js` into a new `paper-wc` repository

Paper should be usable without it and essentially implement the ideas I have
been contemplating in my `acter` and `fragment` repositories. By pulling this
web component helper class out, I'll be able to add non-web-components based
demos and delete the `acter` and `fragment` repositories making Paper my final
word on a build-system-less UI framework.
