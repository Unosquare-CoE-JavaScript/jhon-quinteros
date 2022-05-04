const {compose} = require("ramda");
const {test} = QUnit;

QUnit.module("Composition");

/**
 * Example 1: Composition nest functions
 */

test("Example 1: compose the tears modification string", assert => {
  const toUpper = str => str.toUpperCase();
  const exclaim = str => str + "!";
  const shout = compose(toUpper, exclaim);

  assert.equal(shout("tears"), "TEARS!");
})
