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
