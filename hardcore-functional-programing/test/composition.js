const {compose, last, prop, head, map, reduce, add, replace, toLower, sortBy} = require("ramda");
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

/**
 * Excercise 1
 */

 const CARS = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
];

test("Excercise 1: get the the las car", assert => {
  const isLastInStock = compose(prop('in_stock'), last);
  assert.deepEqual(isLastInStock(CARS), false);
});

/**
 * Exercise 2:
 * ============
 * use _.compose(), _.prop() and _.head() to retrieve the name of the first car
 */
test("Excercise 2: get the name of the first car", assert => {
  const getCarName = compose(prop('name'), head);
  assert.equal(getCarName(CARS), "Ferrari FF");
});

/**
 * Exercise 3:
 * ============
 * Use the helper function _average to refactor averageDollarValue as a composition
 *  */ 
test("Excercise 3: averageDollarValue", assert => {
  const _average = function(xs) { return reduce(add, 0, xs) / xs.length; };
  const dollar_values = map(prop("dollar_value"));
  const averageDollarValue = compose(_average, dollar_values);
  
  assert.equal(averageDollarValue(CARS), 790700);
});

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored names: e.g: sanitizeNames(["Hello World"]) //=> ["hello_world"].

test("Excercise 4: sanitizeNames", assert => {
  const _underscore = replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize
  // first attempt: we can take outside the map
  //const getNames = map(prop("name"));
  //const toLowerName = map(toLower);
  //const sanitize = map(_underscore);
  //const sanitizeNames = compose(sanitize, toLowerName, getNames);
  
  const sanitizeNames = map(compose(toLower, _underscore, prop("name")));
  assert.deepEqual(sanitizeNames(CARS), ['ferrari_ff', 'spyker_c12_zagato', 'jaguar_xkr_s', 'audi_r8', 'aston_martin_one_77', 'pagani_huayra']);
});


// Bonus 2:
// ============
// Refactor to pointfree.

test("Bonus 2: fastestCar", assert => {
  function joinString(str) {
    return str +' is the fastest';
  }
  const fastestCar = compose(
    joinString,
    prop("name"),
    last,
    sortBy(car => car.horsepower)
  );
  assert.equal(fastestCar(CARS), 'Aston Martin One-77 is the fastest');
})