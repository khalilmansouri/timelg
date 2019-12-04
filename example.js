require('./');

console.log('today'.beginning); //2016-08-30T16:00:00.000
console.log('today'.ending); //2016-08-31T15:59:59.999Z
console.log('1 day'.after('today'.beginning)); //2016-08-31T16:00:00.000Z
console.log('2 hours'.before('today'.ending)); //2016-08-31T13:59:59.999Z
console.log('today'.ending.is.over('12 hours'.after('today'.beginning))); //true