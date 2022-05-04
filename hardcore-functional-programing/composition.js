const {compose} = require("ramda");

const toUpper = str => str.toUpperCase();

const exclaim = str => str + "!";

const shout = compose(toUpper, exclaim);

console.log(shout("tears"));