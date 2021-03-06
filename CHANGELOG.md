# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.5.2 - 2018-07-10
### Changed
- `@rduk/errors` as peer dependency
- `@rduk/logger` as peer dependency

## 0.5.1 - 2018-05-28
### Changed
- remove console.log
- fix creation of String Token

## 0.5.0 - 2018-05-28
### Changed
- use `esprima` as lexer
- update `coveralls` to latest version (3.0.1)
- update `standard` to latest version (11.0.1)

## 0.4.0 - 2018-05-18
### Changed
- manage parsing of method with more than one argument
- update `@rduk/logger` to latest version (1.0.1)

## 0.3.1 - 2018-01-29
### Changed
- update `@rduk/logger` to latest version (1.0.0)

## 0.3.0 - 2018-01-22
### Changed
- fix weight operators and add binary operators to parser

## 0.2.2 - 2018-01-21
### Changed
- adopt [`standard`](https://github.com/standard/standard#readme) style

## 0.2.1 - 2018-01-20
### Changed
- fix fields property in ObjectExpression (must be an array)

## 0.2.0 - 2018-01-12
### Changed
- manage lambda with multiple parameters

## 0.1.1 - 2018-01-06
### Changed
- fix minimal node version to 6.4.0
- update `@rduk/logger` to latest version (0.1.5)

## 0.1.0 - 2018-01-06
### Added
- arrow function parses as expression tree
