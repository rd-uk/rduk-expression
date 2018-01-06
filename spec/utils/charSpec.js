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

describe('char', function() {

    let char = require('../../lib/utils/char');
    let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let digits = '0123456789';
    let operators = '<>=+-!%&|^*?:~';
    let delimiters = '{[(;)]}';

    describe('isLetter', function() {

        describe('when letter passed as argument', function() {
            it('should success', function() {
                letters.split('').forEach(letter => {
                    expect(char.isLetter(letter)).toBe(true);
                });
            });
        });

        describe('when digit passed as argument', function() {
            it('should fail', function() {
                digits.split('').forEach(digit => {
                    expect(char.isLetter(digit)).toBe(false);
                });
            });
        });

    });

    describe('isDigit', function() {

        describe('when digit passed as argument', function() {
            it('should success', function() {
                digits.split('').forEach(digit => {
                    expect(char.isDigit(digit)).toBe(true);
                });
            });
        });

        describe('when letter passed as argument', function() {
            it('should fail', function() {
                letters.split('').forEach(letter => {
                    expect(char.isDigit(letter)).toBe(false);
                });
            });
        });

    });

    describe('isLetterOrDigit', function() {

        describe('when digit passed as argument', function() {
            it('should success', function() {
                digits.split('').forEach(digit => {
                    expect(char.isLetterOrDigit(digit)).toBe(true);
                });
            });
        });

        describe('when letter passed as argument', function() {
            it('should success', function() {
                letters.split('').forEach(letter => {
                    expect(char.isLetterOrDigit(letter)).toBe(true);
                });
            });
        });

        describe('when something else passed as argument', function() {
            it('should fail', function() {
                expect(char.isLetterOrDigit('?')).toBe(false);
            });
        });

    });

    describe('isNameStart', function() {

        describe('when correct char passed as argument', function() {
            it('should success', function() {
                `${letters}_$`.split('').forEach(c => {
                    expect(char.isNameStart(c)).toBe(true);
                });
            });
        });

        describe('when bad char passed as argument', function() {
            it('should fail', function() {
                `${digits}-`.split('').forEach(c => {
                    expect(char.isNameStart(c)).toBe(false);
                });
            });
        });

    });

    describe('isNamePart', function() {

        describe('when correct char passed as argument', function() {
            it('should success', function() {
                `${letters}${digits}_$`.split('').forEach(c => {
                    expect(char.isNamePart(c)).toBe(true);
                });
            });
        });

        describe('when bad char passed as argument', function() {
            it('should fail', function() {
                `-`.split('').forEach(c => {
                    expect(char.isNamePart(c)).toBe(false);
                });
            });
        });

    });

    describe('isQuote', function() {

        describe('when correct char passed as argument', function() {
            it('should success', function() {
                '"\''.split('').forEach(c => {
                    expect(char.isQuote(c)).toBe(true);
                });
            });
        });

        describe('when bad char passed as argument', function() {
            it('should fail', function() {
                `-`.split('').forEach(c => {
                    expect(char.isQuote(c)).toBe(false);
                });
            });
        });

    });

    describe('isWhiteSpace', function() {

        describe('when correct char passed as argument', function() {
            it('should success', function() {
                ' \t'.split('').forEach(c => {
                    expect(char.isWhiteSpace(c)).toBe(true);
                });
            });
        });

        describe('when bad char passed as argument', function() {
            it('should fail', function() {
                `-`.split('').forEach(c => {
                    expect(char.isWhiteSpace(c)).toBe(false);
                });
            });
        });

    });

    describe('isEndOfLine', function() {

        describe('when correct char passed as argument', function() {
            it('should success', function() {
                '\r\n'.split('').forEach(c => {
                    expect(char.isEndOfLine(c)).toBe(true);
                });
            });
        });

        describe('when bad char passed as argument', function() {
            it('should fail', function() {
                `-`.split('').forEach(c => {
                    expect(char.isEndOfLine(c)).toBe(false);
                });
            });
        });

    });

    describe('isPunctuation', function() {

        describe('when correct char passed as argument', function() {
            it('should success', function() {
                ',#'.split('').forEach(c => {
                    expect(char.isPunctuation(c)).toBe(true);
                });
            });
        });

        describe('when bad char passed as argument', function() {
            it('should fail', function() {
                `-`.split('').forEach(c => {
                    expect(char.isPunctuation(c)).toBe(false);
                });
            });
        });

    });

    describe('isOperator', function() {

        describe('when correct char passed as argument', function() {
            it('should success', function() {
                operators.split('').forEach(c => {
                    expect(char.isOperator(c)).toBe(true);
                });
            });
        });

        describe('when bad char passed as argument', function() {
            it('should fail', function() {
                delimiters.split('').forEach(c => {
                    expect(char.isOperator(c)).toBe(false);
                });
            });
        });

    });

    describe('isDelimiter', function() {

        describe('when correct char passed as argument', function() {
            it('should success', function() {
                delimiters.split('').forEach(c => {
                    expect(char.isDelimiter(c)).toBe(true);
                });
            });
        });

        describe('when bad char passed as argument', function() {
            it('should fail', function() {
                operators.split('').forEach(c => {
                    expect(char.isDelimiter(c)).toBe(false);
                });
            });
        });

    });

});
