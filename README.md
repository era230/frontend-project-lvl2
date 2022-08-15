# **Gendiff** #
[![Actions Status](https://github.com/era230/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/era230/frontend-project-lvl2/actions)
[![Node CI](https://github.com/era230/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/era230/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/bbe44fc35940defdc36d/maintainability)](https://codeclimate.com/github/era230/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bbe44fc35940defdc36d/test_coverage)](https://codeclimate.com/github/era230/frontend-project-lvl2/test_coverage)

Gendiff is a js library and CLI-utility comparing two configuration files and showing a difference. Gendiff compares files in three formats:
+ json
+ yaml
+ yml
## **Installation** ##
Clone repository
```
git clone https://github.com/era230/frontend-project-lvl2.git
```   
Run
```
cd frontend-project-lvl2
make install
make link
```
## **Usage** ##
#### Help ####
    $ gendiff -h
#### Start ####
    $ gendiff [options] <filepath1> <filepath2>
#### Options ####
Gendiff suggests three output formats:
+ stylish (default)
+ plain
+ json
#### Examples ####
file1.json
```
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
file2.yml
```
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```
Stylish
```
$ gendiff -f stylish

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
Plain
```
$ gendiff -f plain

Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```
Json
```
$ gendiff -f json

[{"name":"follow","status":"removed","value":false},{"name":"host","status":"unchanged","value":"hexlet.io"},{"name":"proxy","status":"removed","value":"123.234.53.22"},{"name":"timeout","status":"updated","value":[50,20]},{"name":"verbose","status":"added","value":true}]
```
#### Demo ####
[![asciicast](https://asciinema.org/a/wQLqdRoy4mWYEQj5XTHs5iSJo.svg)](https://asciinema.org/a/wQLqdRoy4mWYEQj5XTHs5iSJo)
