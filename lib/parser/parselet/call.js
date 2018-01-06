/**
 * MIT License
 *
 * Copyright (c) 2016 - 2018 RDUK <tech@rduk.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

const InfixParselet = require('./infix');
const PropertyExpression = require('../expression/property');
const MethodExpression = require('../expression/method');
const TokenType = require('../../token/type');

class CallParselet extends InfixParselet {
    constructor(key) {
        super(key || TokenType.POINT, 90, true);
    }
    parse(parser, left, token) {
        let current = parser.advance().value;
        let peek = parser.peek(1).value;

        if(!peek || peek.key !== TokenType.LEFT_PAREN) {
            return new PropertyExpression(left, current.value);
        }

        let args = [];

        parser.advance(); //advance to left parenthesis
        peek = parser.peek(1).value;
        while(peek.key !== TokenType.RIGHT_PAREN) {
            args.push(parser.expression());
            peek = parser.peek(1).value;
        }

        parser.advance(); //advance to right parenthesis

        return new MethodExpression(left, current.value, args);
    }
}

module.exports = CallParselet;
