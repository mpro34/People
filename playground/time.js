//EPOCH = Jan 1st 1970 00:00:00 am

const moment = require('moment');

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('h:mm a'));
