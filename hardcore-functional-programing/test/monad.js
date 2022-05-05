const fs = require("fs");
const {test} = QUnit;

QUnit.module("Monads");

/**
 * Example 1: The either implementation
 */

const Right = x =>
  ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    toString: `Right(${x}})`
  });

const Left = x =>
  ({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    toString: `Left(${x}})`
  });

test("Example 1: return the color found", assert => {
  const findColor = name => {
    const found = {red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name];
    return found ? Right(found) : Left('missing')
  }
  
  const res = () =>
    findColor('red')
      .map(x => x.toUpperCase())
      .map(x => x.slice(1))
      .fold(
        () => 'no color!',
        x => x
      )
  assert.equal(res(), "FF4444");
});

/**
 * Example 2: File reader either
 */

const fromNullable = x =>
  x != null ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f());
  } catch(e) {
    return Left(e);
  }
}

const readFileSync = path =>
  tryCatch(() => fs.readFileSync(path))

const parseJSON = contents =>
  tryCatch(() => JSON.parse(contents))

test("Example 2: reading file", assert => {
  const getPort = () => 
    readFileSync("test/sample.json")
      .chain(contents => parseJSON(contents))
      .map(config => config.PORT)
      .fold(() => 8080, x => x)
  
  assert.equal(getPort(), 3000);
});

/**
 * Exercise 1: Refactor streetName to use Either instead of nested if's
 * =========================
 */
test("Exercise 1: street", assert => {
  const user = { address: { street: { name: "Willow" } } };
  const street = user =>
    fromNullable(user.address)
    .map(address => address.street)
    .fold(() => "no street", street => street)

  assert.deepEqual(street(user), {name: "Willow"})
  assert.equal(street({}), "no street")
 })

 /**
  * Exercise 2: Refactor parseDbUrl to return an Either instead of try/catch
  * =========================
  */
  const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i;
  const parseDbUrl_ = cfg => {
    try {
      const c = JSON.parse(cfg) // throws if it can't parse
      return c.url.match(DB_REGEX)
    } catch(e) {
      return null
    }
  }
 const parseDbUrl = cfg =>
  parseJSON(cfg)
  .map(c => c.url.match(DB_REGEX))
  .fold(() => null,x => x);

 test("Exercise 2: parseDbUrl", assert => {
  const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}' 
  assert.equal(parseDbUrl(config)[1], "sally")
  assert.equal(parseDbUrl(), null)
 })



/**
 * Exercise 3: Using Either and the functions above, refactor startApp
 * =========================
 */
  test("Ex3: startApp", assert => {
    const startApp = cfg =>
      fromNullable(parseDbUrl(cfg))
      .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
      .fold(() => "can't get config", x => x)

    const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'
    assert.equal(String(startApp(config)), "starting mydb, sally, muppets")
    assert.equal(String(startApp()), "can't get config")
  })