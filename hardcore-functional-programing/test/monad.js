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