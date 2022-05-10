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


// SETUP
// =========================
const posts = {1: {title: "First"}, 2: {title: "Second"}}

const comments = {First: [{id: 1, body: "Brilliant!"}], Second: [{id: 2, body: "Unforgivable"}]}

const getPost = id =>
  Task((rej, res) =>
    setTimeout(() => posts[id] ? res(posts[id]) : rej('not found'), 200))

const getComments = post =>
  Task((rej, res) =>
    setTimeout(() => res(comments[post.title]), 200))

// Ex1: Use the result of getPost() and upperCase the title. Posts and comments are defined above and look like {title: String} and {id: Int, body: String} respectively.
// =========================
const postTitle = id => // uppercase the title of the result of getPost()
  getPost(id)


test("Ex1: postTitle", assert => {
  const done = assert.async();
  postTitle(1)
  .map(post => post.title.toUpperCase())
  .fork(console.error, t => {
    assert.deepEqual(t, 'FIRST');
    done();
  })
});

// Ex2: pass in the post to getComments(), defined above, then assign the returned comments to the post
// =========================
const commentsForPost = id =>
  getPost(id)

test("Ex2: commentsForPost", assert => {
  const done = assert.async();
  commentsForPost(2)
  .chain(post => 
    getComments(post)
    .map(comments =>
      Object.assign({comments}, post)
    )
  )  
  .fork(console.error, t => {
    assert.deepEqual(t.title, "Second")
    assert.deepEqual(t.comments, comments["Second"])
    done()
  })
});

// Ex3: Wrap location.href in a Task to make it "pure"
// =========================
const getHref =
  Task((rej, res) => res("cdpn.io"))


test("Ex3: getHref", assert => {
  const done = assert.async();
  getHref
  .fork(console.error, t => {
    assert.equal(true, !!t.match("cdpn.io"))
    done()
  })
  
})
