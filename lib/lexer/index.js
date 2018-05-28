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

const logger = require('@rduk/logger')
const Token = require('../token')
const TokenKind = require('../token/kind')
const esprima = require('esprima')

class Lexer {
  constructor (source, prefix, suffix) {
    logger.debug('source passed to lexer: ', source)
    this.index = 0
    this.tokens = esprima.tokenize(source)
  }
  transform (token) {
    let method = `transform${token.type}`
    return this[method](token.value)
  }
  transformIdentifier (identifier) {
    return new Token(TokenKind.identifier, identifier, '<identifier>')
  }
  transformKeyword (keyword) {
    return this.transformIdentifier(keyword)
  }
  transformNumeric (num) {
    if (num.indexOf('.') >= 0) {
      return new Token(TokenKind.float, parseFloat(num), '<constant>')
    }

    return new Token(TokenKind.integer, parseInt(num, 10), '<constant>')
  }
  transformString (str) {
    return new Token(TokenKind.string, str.substring(1, str.length - 1), '<constant>')
  }
  transformPunctuator (punctuator) {
    let kind = TokenKind.delimiter
    switch (punctuator) {
      case '(':
      case ')':
      case '{':
      case '}':
      case '[':
      case ']':
      case ';':
      case ':':
        break
      case ',':
        kind = TokenKind.separator
        break
      default:
        kind = TokenKind.operator
    }
    return new Token(kind, punctuator, null)
  }
  next () {
    return this.tokens[this.index++]
  }
  * tokenize () {
    this.current = this.next()
    while (this.current) {
      yield this.transform(this.current)
      this.current = this.next()
    }
  }
}
module.exports = Lexer
