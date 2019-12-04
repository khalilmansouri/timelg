# timelg

[![NPM](https://nodei.co/npm/timelg.png)](https://nodei.co/npm/timelg/)

Time naturel language 

## Install
```
npm install --save timelg
```
## Usage
```
require('timelg');

console.log('today'.beginning); //2019-12-03T23:00:00.000Z
console.log('today'.ending); //2019-12-04T22:59:59.999Z
console.log('1 day'.after('today'.beginning)); //2019-12-04T23:00:00.000Z
console.log('2 hours'.before('today'.ending)); //2019-12-04T20:59:59.999Z
console.log('today'.ending.is.over('12 hours'.after('today'.beginning))); //true
```