const fs = require("fs");

const {test} = QUnit;

QUnit.module("Task");

const Task = fork =>
({
	fork,
  ap: other =>
	  Task((rej, res) => fork(rej, f => other.fork(rej, x => res(f(x))))),
	map: f =>
	  Task((rej, res) => fork(rej, x => res(f(x)))),
  chain: f =>
	  Task((rej, res) => fork(rej, x => f(x).fork(rej, res))),
  concat: other =>
	  Task((rej, res) => fork(rej, x => other.fork(rej, y => {
      console.log('X',x, 'Y', y)
      res(x.concat(y))
    }))),
  fold: (f, g) =>
	  Task((rej, res) => fork(x => f(x).fork(rej, res), x => g(x).fork(rej, res)))
})
Task.of = x => Task((rej, res) => res(x))
Task.rejected = x => Task((rej, res) => rej(x))
Task.fromPromised = fn => (...args) => Task((rej, res) => fn(...args).then(res).catch(rej))

test("Example 1: lazy task", assert => {
  let value = 0;
  const t1 = Task((rej, res) => res(2))
              .map(two => two + 1)
              .map(three => three * 2)
  
  t1.fork(() => {}, (newValue) => value = newValue);
  assert.equal(value, 6)
});

test("Example 2: reading file", assert => {
  let content = "";
  const readFile = (path, enc) =>
    Task((rej, res) =>
      fs.readFile(path, enc, (err, contents) =>
        err ? rej(err) : res(contents)
      )
    )
  const writeFile = (path, content) =>
    Task((rej, res) =>
      fs.writeFile(path, content, (err, contents) =>
        err ? rej(err) : res(contents)
      )
    )
  const app = () =>
    readFile('test/task.json', 'utf-8')
    .map(contents => contents.replace(/3/g, '6'))
    .chain(newContents => writeFile('test/task.json', newContents))

  app().fork(() => content = "error", () => content = "success");
  assert.equal(content, '');
});