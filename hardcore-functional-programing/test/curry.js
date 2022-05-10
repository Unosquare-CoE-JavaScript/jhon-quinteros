const {curry} = require("ramda");
const {test} = QUnit;

QUnit.module("Curry");
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

test("Example 1: is Odd?", assert => {
  assert.equal(isOdd(3), 1);
});

/**
 * Example 2: currying a function to filter an array
 * Note: the parameters that are going to be remebered will go first! and the data it operates on go after.
 */
test("Example 2: filter odd array", assert => {
  const filter = curry((f, arr) => arr.filter(f));
  const getOdds = filter(isOdd);
  const oddArray = getOdds([1,2,3,4,5,6,7]);

  assert.deepEqual(oddArray, [1,3,5,7]);
});


/**
 * Example 3: using the curry form ramda, create a function that replace the vowels from a string.
 */
test("Example 3: using ramda, replace vowels in string", assert => {
  const replace = curry((regex, replacement, str) => {
    return str.replace(regex, replacement);
  });
  const replaceVowels = replace(/[AEIOU]/ig, '!');
  const replacedString =replaceVowels('Hey I have words');

  assert.equal(replacedString, "H!y ! h!v! w!rds");
});

/**
 * Exercise 1
 */
test("Exercise 1: split an array by a delimiter", assert => {
  const split = curry((delimeter, string) => string.split(delimeter));
  const wordsSplit = split(" ");

  assert.deepEqual(wordsSplit("Jingle bells Batman smells"), ["Jingle", "bells", "Batman", "smells"]);
});