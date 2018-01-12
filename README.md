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

## Example

```js
let fn = (user, profile) => ({
    id: user.id,
    email: user.email,
    password: user.password,
    firstName: profile.first_name,
    lastName: profile.last_name
});

let expression = ast.lambda.parse(fn);

/**
 * LambdaExpression {
 *  body:
 *   ObjectLiteralExpression {
 *     fields:
 *      [ FieldExpression {
 *          name: 'id',
 *          assignment:
 *            PropertyExpression {
 *              property: 'id',
 *              context:
 *                NameExpression { name: 'user' } } },
 *        FieldExpression {
 *          name: 'email',
 *          assignment:
 *            PropertyExpression {
 *              property: 'email',
 *              context:
 *                NameExpression { name: 'user' } } },
 *        FieldExpression {
 *          name: 'password',
 *          assignment:
 *            PropertyExpression {
 *              property: 'password',
 *              context:
 *                NameExpression { name: 'user' } } },
 *        FieldExpression {
 *          name: 'firstName',
 *          assignment:
 *            PropertyExpression {
 *              property: 'first_name',
 *              context:
 *                NameExpression { name: 'profile' } } },
 *        FieldExpression {
 *          name: 'lastName',
 *          assignment:
 *            PropertyExpression {
 *              property: 'last_name',
 *              context:
 *                NameExpression { name: 'profile' } } } ] },
 *  args:
 *   [ NameExpression { name: 'user' },
 *     NameExpression { name: 'profile' } ] }
 */
```

## License and copyright
see [`LICENSE`](LICENSE) file
