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

const Grammar = require('./grammar');
const logger = require('@rduk/logger');

class Parser {
    constructor(lexer) {
        this.tokens = lexer.tokenize();
        this.grammar = new Grammar();
        this.peeks = [];
    }
    advance() {
        let current = this.peeks.length ? this.peeks.pop() : this.tokens.next();
        logger.debug('advance to', current);
        return current;
    }
    peek(jump) {
        jump = jump || 1;
        while (this.peeks.length < jump) {
            this.peeks.push(this.tokens.next());
        }
        return this.peeks[jump - 1];
    }
    getPrecedence() {
        let next = this.peek();
        if (!next.value) {
            return 0;
        }

        let infix = this.grammar.parselets.infix.get(next.value.key);
        return infix ? infix.precedence : 0;
    }
    expression(precedence) {
        precedence = precedence || 0;

        let token = this.advance().value;
        let prefix = this.grammar.parselets.prefix.get(token.key);

        if (!prefix) {
            throw new Error('Could not parse "' + token.value + '".');
        }

        let left = prefix.parse(this, token);

        while (precedence < this.getPrecedence()) {
            token = this.advance().value;

            let infix = this.grammar.parselets.infix.get(token.key);
            left = infix.parse(this, left, token);
        }

        return left;
    }
    parse() {
        logger.debug('start parsing');
        return this.expression();
    }
}

module.exports = Parser;
