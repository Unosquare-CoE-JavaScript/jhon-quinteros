export function expect(value, expect) {
  if (value === expect) {
    console.log("\x1b[32m" , `Test passed: ${value}`);
  } else {
    console.log("\x1b[31m" , `Test failed: ${value}`);
  }
}

export function expectObj(value, expect) {
  if (value.toString() === expect.toString()) {
    console.log("\x1b[32m" , `Test passed: ${value.toString()}`);
  } else {
    console.log("\x1b[31m" , `Test failed: ${value.toString()}`);
  }
}