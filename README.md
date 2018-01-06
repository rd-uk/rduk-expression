# RDUK - Expression

[![Build Status](https://travis-ci.org/rd-uk/rduk-expression.svg?branch=master)](https://travis-ci.org/rd-uk/rduk-expression)
[![Coverage Status](https://coveralls.io/repos/github/rd-uk/rduk-expression/badge.svg?branch=master)](https://coveralls.io/github/rd-uk/rduk-expression?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/rd-uk/rduk-expression/badges/score.svg)](https://www.bithound.io/github/rd-uk/rduk-expression)

Generate abstract syntax tree

__Note__: tested with `node` v6.4.0

## Installation

```sh
npm install @rduk/expression --save --save-exact
```

## Usage

```js
const expression =  require('@rduk/expression');
let tree = expression.lambda.parse(user => (user.age >= 21));
```

## License and copyright
see [`LICENSE`](LICENSE) file
