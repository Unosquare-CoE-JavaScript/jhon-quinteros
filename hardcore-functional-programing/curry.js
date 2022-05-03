/**
 * Currying is helpful when you want to pass a single parameter at time,
 * instead of having to send all the parameters at once.
 */

function modulo(x, y) {
  return y % x;
}

function curry(f) {
  return function(x) {
    return function(y) {
      return f(x, y);
    }
  }
}

const isOdd = curry(modulo)(2);

console.log(`is odd?: ${isOdd(3)}`);