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

describe('parser', function() {

    const ast = require('../lib');
    const LambdaExpression = require('../lib/parser/expression/lambda');
    const NameExpression = require('../lib/parser/expression/name');
    const BinaryExpression = require('../lib/parser/expression/binary');

    describe('lambda', function() {

        it('should success', function() {
            let fn = user => (user.name.toLowerCase().contains('john') &&
              (user.age < 25 || user.age >= 30));
            let expression = ast.lambda.parse(fn);
            expect(expression).toBeDefined();
            expect(expression instanceof LambdaExpression).toBe(true);
            expect(expression.args instanceof NameExpression).toBe(true);
            expect(expression.body instanceof BinaryExpression).toBe(true);
            expect(expression.body.operator).toBe('&&');
            expect(expression.body.left.name).toBe('contains');
            expect(expression.body.right.operator).toBe('||');
            expect(expression.body.right.left.operator).toBe('<');
            expect(expression.body.right.right.operator).toBe('>=');
        });

        it('should success', function() {
            let expression = ast.lambda.parse('user => (user.rating > .5)');
            expect(expression).toBeDefined();
            expect(expression instanceof LambdaExpression).toBe(true);
            expect(expression.body instanceof BinaryExpression).toBe(true);
            expect(expression.body.right.value).toBe(0.5);
        });

        it('should success', function() {
            let fn = (user) => (user.rating > 0.5);
            let expression = ast.lambda.parse(fn);
            expect(expression).toBeDefined();
            expect(expression instanceof LambdaExpression).toBe(true);
            expect(expression.body instanceof BinaryExpression).toBe(true);
            expect(expression.body.right.value).toBe(0.5);
        });

        it('should success', function() {
            let fn = (user, profile, arg2) => ({
                id: user.id,
                email: user.email,
                password: user.password,
                firstName: profile.firstname,
                lastName: profile.lastname,
                test: arg2.test
            });
            let expression = ast.lambda.parse(fn);
            console.log(expression.body.fields[0]);
            expect(expression).toBeDefined();
            expect(expression.body.fields.length).toBe(6);
            expect(expression.body.fields[0].name).toBe('id');
            expect(expression.body.fields[0].assignment.property).toBe('id');
            expect(expression.body.fields[0].assignment.context.name).toBe('user');
            expect(expression.body.fields[4].name).toBe('lastName');
            expect(expression.body.fields[4].assignment.property).toBe('lastname');
            expect(expression.body.fields[4].assignment.context.name).toBe('profile');
        });

        it('should throw an Error', function() {
            expect(function() {
                ast.lambda.parse('====');
            }).toThrowError();

            expect(function() {
                ast.lambda.parse('this.-test');
            }).toThrowError();

            expect(function() {
                ast.lambda.parse('@');
            }).toThrowError();
        });

    });

});
