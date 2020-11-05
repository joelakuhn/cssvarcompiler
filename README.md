# CSS Variable Compiler

A super basic compiler that converts CSS variables to values. It doesn't support inheritance, because that's contextual based on the DOM. It also only looks at :root elements.

## Usage

On the command line:

```shell
node_modules/cssvarcompiler/cssvarcompiler-cli.js < stylesheet.css > stylesheet.css2.css
```

As a library:

```javascript
const CSSVarCompiler = require('cssvarcompiler');

const compiler = new CSSVarCompiler(`
  :root {
    --plum: #360922;
  }

  header {
    background-color: var(--plum);
  }
`)
process.stdout.write(compiler.compile);
```

result:

```css
header {
  background-color: #360922;
}
```
