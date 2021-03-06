# Проект Вычислитель отличий
[![Maintainability](https://api.codeclimate.com/v1/badges/a67322e03a2262111f78/maintainability)](https://codeclimate.com/github/Vikman88/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a67322e03a2262111f78/test_coverage)](https://codeclimate.com/github/Vikman88/frontend-project-lvl2/test_coverage)
[![Node.js CI](https://github.com/Vikman88/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)](https://github.com/Vikman88/frontend-project-lvl2/actions?query=workflow%3A%22Node.js+CI%22)
[![hexlet-check](https://github.com/Vikman88/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Vikman88/frontend-project-lvl2/actions?query=workflow%3Ahexlet-check)

## Описание

Вычислитель отличий – программа определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов http://www.jsondiff.com/. Подобный механизм, например, используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

## Возможности утилиты:

* Поддержка разных форматов входных форматов: yaml, json
* Генерация отчета в виде plain text, stylish и json

## Using:

### Setup
```sh
git clone https://github.com/Vikman88/frontend-project-lvl2.git .
make install
```
[![asciicast](https://asciinema.org/a/9HfKfMFn7632snT9Nx7Ihel3v.svg)](https://asciinema.org/a/9HfKfMFn7632snT9Nx7Ihel3v)

### Help
```sh
make help
```

## Run
```sh
gendiff -f [format] [path/to/file1] [path/to/file2]
```
[![asciicast](https://asciinema.org/a/dVjEQc7PRzYscCiFSygXmImdb.svg)](https://asciinema.org/a/dVjEQc7PRzYscCiFSygXmImdb)

### Run test
```sh
make test
```
