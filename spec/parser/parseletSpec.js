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

 /* eslint-env jasmine */

'use strict'

describe('parselet', function () {
  const errors = require('@rduk/errors')
  const PrefixParselet = require('../../lib/parser/parselet/prefix')
  const InfixParselet = require('../../lib/parser/parselet/infix')
  const BinaryParselet = require('../../lib/parser/parselet/binary')

  describe('prefix', function () {
    describe('parse method called directly', function () {
      it('should throw a NotImplementedError', function () {
        expect(function () {
          let prefix = new PrefixParselet()
          prefix.parse()
        }).toThrowError(errors.NotImplementedError)
      })
    })
  })

  describe('infix', function () {
    describe('parse method called directly', function () {
      it('should throw a NotImplementedError', function () {
        expect(function () {
          let infix = new InfixParselet()
          infix.parse()
        }).toThrowError(errors.NotImplementedError)
      })
    })
  })

  describe('binary', function () {
    describe('instantiate without precedence arg', function () {
      it('should initialize precedence at 50', function () {
        let binary = new BinaryParselet('test')
        expect(binary.precedence).toBe(50)
      })
    })
  })
})
