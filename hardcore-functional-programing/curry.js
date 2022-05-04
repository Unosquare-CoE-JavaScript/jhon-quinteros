const {curry} = require("ramda");
/**
 * Currying is helpful when you want to pass a single parameter at time,
 * instead of having to send all the parameters at once.
 */

/*function curry(f) {
  return function(x) {
    return function(y) {
      return f(x, y);
    }
  }
}*/

function modulo(x, y) {
  return y % x;
}

const isOdd = curry(modulo)(2);

console.log(`is odd?: ${isOdd(3)}`);

/**
 * Example 2: currying a function to filter an array
 * Note: the parameters that are going to be remebered will go first! and the data it operates on go after.
 */

const filter = curry((f, arr) => arr.filter(f));
const getOdds = filter(isOdd);
const result = getOdds([1,2,3,4,5,6,7]);

console.log(`odds array: ${result}`);

/**
 * Example 3: using the curry form ramda, create a function that replace the vowels from a string.
 */

const replace = curry((regex, replacement, str) => {
  return str.replace(regex, replacement);
})

const replaceVowels = replace(/[AUIOU]/ig, '!');
const replacedString =replaceVowels('Hey I have words');

console.log(`replaced string: ${replacedString}`);