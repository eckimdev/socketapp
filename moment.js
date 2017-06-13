var moment = require('moment');
var now = moment();
// //now.subtract(1, 'year');
// console.log(now.format());
// console.log(now.format('MMM Do YYYY, h:mma'));
//
// //timestamps
// //seconds since 1970
// console.log(now.format('X'));//unix timestamp (String)
// //milliseconds since 1970
// console.log(now.format('x'));//javascript unix timestamp (String)
// console.log(now.valueOf());//unix timestamp (Number)
//
// //convert a timestamp into a date
// var timestamp = 1444247486704;
// var timestampMoment = moment.utc(timestamp);
// console.log(timestampMoment.format('h:mm a'));

//get the unix timestamp for 'now'
var timestamp = now.valueOf();//(Unix)
var jsTimestamp = Date.now();//(Unix)
//convert the timestamp into utc format
//make it local to my area, and format it
var timestampMoment = moment.utc(timestamp);
var jsTimestampMoment = moment.utc(jsTimestamp);
console.log(timestampMoment.local().format('h:mm a'));
console.log(jsTimestampMoment.format('h:mm a'));

var birthday = new Date(1990, 6, 17, 12, 30, 45); //ISOString?
var unixBirthday = birthday.getTime(); //(Unix)
console.log(moment.utc(unixBirthday).local().format("MM-DD-YYYY hh:m:s a"));
