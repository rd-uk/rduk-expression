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

'use strict'

const BinaryParselet = require('./parselet/binary')
const CallParselet = require('./parselet/call')
const ConstantParselet = require('./parselet/constant')
const GroupParselet = require('./parselet/group')
const NameParselet = require('./parselet/name')
const ObjectLiteralParselet = require('./parselet/object')
const FieldParselet = require('./parselet/field')
const SeparatorParselet = require('./parselet/separator')
const ParseletCollection = require('./parselet/collection')
const TokenType = require('../token/type')

class Grammar {
  constructor () {
    this.parselets = new ParseletCollection()
    this.register(new NameParselet())
    this.register(new ConstantParselet())
    this.register(new GroupParselet())
    this.register(new CallParselet())
    this.register(new ObjectLiteralParselet())
    this.register(new FieldParselet())
    this.register(new SeparatorParselet())
    this.register(new BinaryParselet(TokenType.AND, 30, true))
    this.register(new BinaryParselet(TokenType.OR, 30, true))
    this.register(new BinaryParselet(TokenType.ASTERISK, 60))
    this.register(new BinaryParselet(TokenType.SLASH, 60))
    this.register(new BinaryParselet(TokenType.PERCENT, 60))
    this.register(new BinaryParselet(TokenType.PLUS, 70))
    this.register(new BinaryParselet(TokenType.MINUS, 70))
    this.register(new BinaryParselet(TokenType.EQEQ, 90))
    this.register(new BinaryParselet(TokenType.EQEQEQ, 90))
    this.register(new BinaryParselet(TokenType.NOTEQ, 90))
    this.register(new BinaryParselet(TokenType.NOTEQEQ, 90))
    this.register(new BinaryParselet(TokenType.LT, 90))
    this.register(new BinaryParselet(TokenType.LTE, 90))
    this.register(new BinaryParselet(TokenType.GT, 90))
    this.register(new BinaryParselet(TokenType.GTE, 90))
  }
  register (parselet) {
    this.parselets.add(parselet)
  }
}

module.exports = Grammar
