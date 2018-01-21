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
const char = require('../utils/char')
const str = require('../utils/str')
const Token = require('../token')
const TokenKind = require('../token/kind')
const TokenType = require('../token/type')

class Lexer {
  constructor (source, prefix, suffix) {
    logger.debug('source passed to lexer: ', source)
    let lines = str.clean(source).split('\n')
    let pos = -1
    let rownum = 0
    function next () {
      let c = lines[rownum] && lines[rownum].charAt(++pos)
      if (!c) {
        if (lines.length > rownum) {
          rownum += 1
          pos = -1
          return next()
        }
      }
      return c
    }
    function peek () {
      return lines[rownum].charAt(pos + 1)
    }
    this._next = function () {
      let c = next()
      let token
      if (!c) {
        return
      } else if (char.isNameStart(c)) {
        token = this._identifier()
      } else if (char.isDigit(c)) {
        token = this._number()
      } else if (char.isQuote(c)) {
        token = this._string(c)
      } else if (c === '.') {
        var n = peek()
        if (char.isDigit(n)) {
          token = this._fraction(pos)
        } else if (char.isNameStart(n)) {
          token = this._span(TokenKind.operator, TokenType.POINT, pos, pos + 1)
        } else {
          this._error('unexpected char \'' + n + '\' after \'.\'', rownum, pos)
        }
      } else if (char.isWhiteSpace(c)) {
        return this._next()
      } else if (prefix.indexOf(c) > -1) {
        token = this._operator()
      } else {
        var kind = TokenKind.delimiter
        switch (c) {
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
            this._error('not supported char: \'' + c + '\'', rownum, pos)
        }
        token = this._span(kind, null, pos, pos + 1)
      }
      return token
    }
    this._span = function (kind, key, start, end) {
      return new Token(kind, lines[rownum].substring(start, end), key)
    }
    this._error = function (msg, line, col) {
      msg += ' at (Line ' + line + ', Column ' + col + ')'
      throw new Error(msg)
    }
    this._identifier = function () {
      let start = pos

      while (char.isNamePart(lines[rownum][pos])) {
        pos += 1
      }
      return this._span(TokenKind.identifier, '<identifier>', start, pos--)
    }
    this._string = function (quote) {
      let start = ++pos

      while (lines[rownum][pos] !== quote) {
        pos += 1
      }

      return this._span(TokenKind.string, '<constant>', start, pos)
    }
    this._number = function () {
      let start = pos - 1

      while (char.isDigit(lines[rownum][pos])) {
        pos += 1
      }

      if (lines[rownum][pos] === '.') {
        return this._fraction(start)
      }

      var token = this._span(TokenKind.integer, '<constant>', start, pos--)
      token.value = parseInt(token.value.toString())

      return token
    }
    this._fraction = function (start) {
      pos += 1

      while (char.isDigit(lines[rownum][pos])) {
        pos += 1
      }

      var token = this._span(TokenKind.float, '<constant>', start, pos--)
      token.value = parseFloat(token.value.toString())
      return token
    }
    this._operator = function () {
      let start = pos

      while (suffix.indexOf(lines[rownum][++pos]) > -1) {}

      return this._span(TokenKind.operator, null, start, pos--)
    }
  }
  * tokenize () {
    this.current = this._next()
    while (this.current) {
      yield this.current
      this.current = this._next()
    }
  }
}
module.exports = Lexer
