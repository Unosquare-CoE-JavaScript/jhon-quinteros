const {test} = QUnit;
QUnit.module("Functors");

/**
 * Example 1 chain dot functions
 */

const Box = x => 
({
  map: f => Box(f(x)),
  fold: f => f(x),
  toString: `Box(${x})`
});


test("Example 1: dot chaining functions", assert => {
  const nextCharForNumberString = str =>
    Box(str)
    .map(x => x.trim())
    .map(trimmed => parseInt(trimmed, 10))
    .map(number => new Number(number + 1))
    .fold(String.fromCharCode)

  assert.equal(nextCharForNumberString(" 64  "), "A");
});

/**
 * Exercise 1: Using Box, refactor moneyToFloat to be unnested.
 * =========================
 */
test("Exercise: moneyToFloat", assert => {
  const moneyToFloat = str =>
    Box(str)
    .map(str => str.replace(/\$/, ''))
    .fold(str => parseFloat(str))

  assert.equal(String(moneyToFloat('$5.00')), 5);
});

/**
 * Exercise 2: Using Box, refactor percentToFloat to remove assignment
 * =========================
 */
test("Exercise 2: percentToFloat", assert => {
  const percentToFloat = str =>
    Box(str)
    .map(str => str.replace(/\%/, ''))
    .map(str => parseFloat(str))
    .fold(float => float * 0.0100)

  assert.equal(String(percentToFloat('20%')), 0.2);
})

/**
 * Exercise 3: Using Box, refactor applyDiscount (hint: each variable introduces a new Box)
 * =========================
 */
test("Exercise 3: Apply discount", assert => {
  const moneyToFloat = str =>
    Box(str)
    .map(str => str.replace(/\$/, ''))
    .fold(str => parseFloat(str))

    const percentToFloat = str =>
    Box(str)
    .map(str => str.replace(/\%/, ''))
    .map(str => parseFloat(str))
    .fold(float => float * 0.0100)

  const applyDiscount = (price, discount) => 
    Box(moneyToFloat(price))
      .fold(cents =>
        Box(percentToFloat(discount))
          .fold(savings => cents - (cents * savings))
      )
  assert.equal(String(applyDiscount('$5.00', '20%')), 4);
})