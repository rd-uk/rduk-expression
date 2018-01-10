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

const char = {
 isLetter: c => ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')),
 isDigit: c => (c >= '0' && c <= '9'),
 isLetterOrDigit: c => (char.isLetter(c) || char.isDigit(c)),
 isNameStart: c => (char.isLetter(c) || c === '_' || c === '$'),
 isNamePart: c => (char.isLetterOrDigit(c) || c === '_' || c === '$'),
 isQuote: c => (c === '"' || c === '\''),
 isWhiteSpace: c => (c === ' ' || c === '\t'),
 isEndOfLine: c => (c === '\n' || c === '\r'),
 isPunctuation: c => (c === ',' || c === '#'),
 isOperator: c => ('<>=+-!%&|^*?:~'.indexOf(c) >= 0),
 isDelimiter: c => ('{}[];()'.indexOf(c) >= 0)
};

 module.exports = char;
