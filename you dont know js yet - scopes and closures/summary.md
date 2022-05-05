# You don’t know JS yet SCOPE & ClOSURES

## Chapter 1: What’s the Scope?

The scope is a set of rules that is applied in the code to define where are placed the variables, function and blocks.
A function can be assigned or passed around as a variable, but the variables that are access and hold doesn’t change, doesn’t matter where the function is executed. This feature is called closure.

### Compiled vs Interpreted

-	The compiled code follows a set of steps that convert the code into binary that computer can read. This process is only done once.
-	The interpreted code goes line by line converting the code line into the binary and is processed.

### Compiling Code

The definition of the scope is done in the step of “compilation”, that is why is important to understand it.
The compilation is composed of three stage:

-	Tokenizing/Lexing: This consist in split eh code into chunks called tokens, and Lexing is about determine if a token is distinct or part of another one.
-	Parsing: take an array of tokens and convert it into a tree of nested elements called Abstract Syntax Tree (AST).
-	Code Generation: it converts the AST into executable code.

The JS engine does this process JIT.

### The JS engine

There are two steps that the JS engine does, the parsing and compilation. You can see three characteristics to prove this:

-	Syntax errors: in the following snippet, the code doesn’t run instead it throws an error, showing how the code is not executed line by line.

```
Var greeting = “hello”;
console.log(greeting);
greeting = .”Hi”;
//SyntaxError
```

-	Early Errors: in the next snippet, you can see how an early error is thrown because in strict mode is not allowed have duplicated parameters, and the code doesn’t run.

```
saySomething(“Hello”, “Hi”);
//Syntax error

function saySomething(greeting, greeting) {
  "use strict";
  console.log(greeting);
}
```

-	Hoisting: in the example below you can see how the function fails because the `greeting` variable is being redeclared in the following line and it throws an error, and it only can happens if the scopes where already defined.

```
function saySomething() {
  var greeting = “Hello”;
  {
    Greeting = “Howdy”;
    let greeting = “Hi”;
    console.log(greeting);
  }
}
saySomething();
//ReferenceError
```

### Declaration of Variables

The declaration of variables can be used for target of assignment or source of a value.
The variable is a target if it is not being assigned in the statement, otherwise it is a source.

### Targets

There are different way that you can make a variable a target.
-	Assignment of a value `var a = “Hello”`
-	Assignment in loops `for (let student of students) `
-	Passing parameters in functions `getStudentName(50)`
-	Function declaration `function getStudentName(studenID) {}`, here an identifier `getStudentName` is declared(function hoisting)

### Sources

There are several ways to declare sources variables
-	In loops `for (let student of students)`, here the `students` variables is a source.
-	In conditionals `if (student.id == studenID)` in this case both variables are sources.
-	In calling functions `getStudentName(20)`.

### Scope and Runtime modifications

When the option `”use strict”;` is no used there are two keyword that can be used to modify the scope at runtime, but you shouldn’t.
-	`eval` this method lets you pass code in format of string and if it has function o variable declaration them are going to be added at runtime adding new scopes or adding new variables in the current scope.

```
function sayHello() {
	eval(“var hello = ‘hello’;”);
  console.log(hello);
}
sayHello();
//hello
```

-	The `with` this keyword lets you assign an object as if it were the scope of the block.

```
var pet = {age: 5, weight: 10}
with (pet) {
  console.log(`my pet has ${age} years and weight ${weight}`);
}
```

### Lexical Scope

Lexical Scope is defined at compilation time, and it is associated with the stage of lexing(compilation). The lexical scope is controlled by the placement of functions, block and variable declarations.
When you declare a variable inside a function the compiler associates the variable to the function scope, (let and const can also be associated to block scope).
When a variable is used in the scope, the compile will search for the declaration, if it is not in the current scope, it will look in the outer scopes until it finds it or reach the global scope, and if it isn’t founded it will throw an error.

## Chapter 2: Illustrating Lexical Scope

The variables are associated to the scope where they are declared, and these scopes are determined in compilation time. The scopes can be nested but it is the whole, there can’t be partial nested. A reference to a variable can be done if it is declared in the current or outer scope.

### Process of the code

To process the code there are three actors involved:
-	Engine: it compiles and execute the code.
-	Compiler: parse and generate the code.
-	Scope Manager: collect and maintain the variables identifier and the accessibility of them.
When a variable is declared and initialized the compiler will generate the tokens (lexing stage) and then parse into the AST, then will ask to the scope manager to create the new variable.
In the execution stage of the program, the engine work with the scope manager to assign the values to the variables declared and instantiate the functions scopes.

### Nested Scope

Every function or block creates its own scope and Scope manager, you can nest them as you want. The Scope Manager has a registry of the variable identifiers, when the identifier is from a function it initializes the function too, if it is a `var` identifier it is initialized as undefined, in the case of `let/const` are uninitialized.

### Lookup Failures

When the scope manager can’t found an identifier in its or outer scopes, an error is thrown. The error will change based on if the code is `strict mode` and if the variable was a target or source.
If the variable is source, a `ReferenceError` is thrown as the identifier is considered undeclared
If the variable is `target` and the code uses `strict mode` a `ReferenceError` is thrown.

### Undefined

There is a muddle between the terms `undefined` and the error `Not declared ReferenceError`, the first means that the variable exists but it doesn’t have a value, and the second means that the variable wasn’t declared.

### Global Variable

If you don’t use the `strict mode` and assign a value to a non-declared variable, the Scope Manager will create and global variable.

```
function getStudentName() {
  studentName = “Pepe”;
}

getStudentName();
console.log(studentName);
//Pepe
```

## Chapter 3: The Scope Chain

The connections between nested scopes is called “scope chain”, this determine the accessibility of a variable, this chain moves upward only.
The lookout for the variable is made at compilation time, so it improves the performance at runtime, but there is an exception and is when it can’t find the variable in the file it will look for the global scope in other files at runtime.

### Shadowing

You can’t repeat a name of a variable in a scope, but you can have the same variable name in nested scopes.

```
var name = “Pepe”;
function printName(name) {
  name = name.toUpperCase();
	console.log(name);
}

printName(name);
console.log(name);
//PEPE
//Pepe
```
When the variable is lookup and is found in the context it doesn’t take in account of the outer variables with the name, as shown in the example above. This feature is called “shadowing”. Something to be aware is that this shadowing affects to all the inner scopes, that now won’t be able to access the outer definition of the variable.

### Illegal Shadowing

Trying to shadow a `let` with a `var` is invalid if the var is inside a block, it only will work if the var is inside of an inner function,

```
//Valid case:
function shadowing() {
  let special = "Javascript";
	function test() {
		var special = "Java";
	}
}

//Invalid case:
function shadowing() {
  let special = "Javascript";
	{
		var special = "Java";
	}
}
```

### function declaration vs function expression

There are couple of differences between using function declaration or expression.
The function declaration is hoisted, but the expression not, only the name of the var is hoisted.

```
// function declaration
function helloWorld() {}

// anonymous function expression
var helloWorld = function(){}
```

### Arrow functions

Arrow function is a new way of function expression and it is anonymous, it has the same rules for lexical scope, the variable declaration has the same behavior.

## Chapter 4: Around the Global Scope

It lets you interact between different JS files, but also it also has:
-	The primitives: undefined, null, Infinity, NaN
-	Natives: Date(), Object, String()
-	Functions: eval, parseInt
-	Namespaces: Math, Atomics, JSON
In the web also is exposed:
-	Console
-	DOM(window, document)
-	Timers(setTimeout)
-	Web APIs: navigator, history, geolocation

### Where is the Global Scope

Each environment handles the global scope in different way.
-	Browser: every variable created in the global scope will be also a property in the window object. Note that if you use `let` in the global scope it won’t create a property in the global window.

### DOM Global

When an element has the `id` attribute, it will create a global variable that references it.
```
<body>
  <ul id="my-todo-list">
    <li id="first">Write a book</li>
  </ul>
</body>
```

![DOM variables](img/dom.PNG)

### Web Workers

Web workers allow run js in separate thread, but add restrictions in the communication with the main thread, also doesn’t have access to the DOM and doesn’t share the global scope with the main js program.
In the web worker the reference to the global object is done with `self`.

### ES modules

When you declare variables and function in a module, those variables aren’t global variables and won’t be created as properties in the global object, instead they are created in a module object.
```
var student = ”Pepe”;
function hello() {
	console.log(`Hello ${student}`);
}
export hello
```

### Node

Node at difference to the browser threats all the js files even the main as modules, so you are not working in the global scope. Doesn’t matter if you are using the ES6 module or commonJS.
The only way to add global properties is to add them in the reference provided by node “global”.

```
global.studentName = “pepe”;

function hello() {
	console.log(`Hello ${studentName}`);
}
```

### Global this

In the ES2020 a standard of the global object was defined and called `globalThis`.

## Chapter 5: The (Not So) Secret Lifecycle of Variables
A feature that only the function declaration has is the “function hoisting”, when a function is declared the name of it is hoisted to the top of the scope, but also it is initialized so you can call the function even before it is declared.

### Re-declaration

When you declare more than one variable with the same name it won’t fail, and if the next declarations don’t assign new value the variable won’t change.
```
var studentName = ”Pepe”;
var studentName;
console.log(studentName);
//Pepe
```
This feature of re-declaration only works with the keyword `var`, the `let` keyword doesn’t let you do the re-declaration.

### Const

The keyword `const` also doesn’t let the re-declaration but also doesn’t let you declare it without initializing it.

### Loops

Something to be aware of the loops is that every time the loop does an iteration, it creates its own scope instance. It means that the variables are declared in each instance.
Point out that the `const` can’t be used in the `for` loop because it will try to reassign its value and that’s is no allowed in `const`. 

### uninitialized variables (TDZ)

When a variable is hoisted to the top of the scope only the `var` is initialized as `undefined`, but `let` and `const` not. So you will get an error if you try to use these variables before they are initialized, it is called TDZ(Temporal Dead Zone).

```
Var studentName = "Pepe";
{
	console.log(studentName);
  // It throws an error
  let studentName = "Suzy";
}
```

## Chapter 6: Limiting Scope Exposure

In software engineering there is a discipline called “The Principle of Least Privilege” and it has a variation called “Least Exposure”, this is meanly for security and is states that you should try to design the components with least access and exposure. This helps because if a piece fails it won’t have a great impact in the rest of components.
So, accessing to variables from different scopes have three main drawbacks:
-	Naming collisions
-	Unexpected Behaviors: because letting other use the functions in ways it wasn’t developed can cause bugs.
-	Unintended Dependency

### Hiding in Plain (Function) Scope

You can wrap the variable and functions in an outer function an only return the functions that you want, that way the state of the variables remains but are hidden.
Example: if you want to have an array with numbers and a function that returns the greatest value you can wrap both in an outer function.

```
function getGreatestNumber() {
  var numbers = [7,5,1];
  return function getGreatest() {
		return numbers[0];
  }
}
var getGreatest = getGreatestNumber();
console.log(getGreatest());
```

This way `getGreatestNumber` function creates an scope cache that holds the `numbers` array.

### Invoking Function Expressions Immediately

This feature lets us define a function and call it in mediately, this is done by wrapping the function in parenthesis ` () ` and calling it ` () `.

```
var result = (
  function getSum() {
    return 10 + 20;
  }
)()
```
### Scoping with Blocks

A block `{}` only becomes in scope if there are block-scope declarations(let, const).
There are cases where the curly braces`{}` doesn’t mean scope:

-	In object literals declarations
-	In Class definitions
-	Functions definitions
-	The switch statements

You can use the block scope to hide the variables so it is only accessible when it is needed.

### var and let

Based on the suggestion of the book, you should prefer use `let` if the variable scope fits in a block, and if the variable is used in the whole function, it should be `var`. Also, you should prefer use `let` in the `for` loop. This is only the opinion of the author of the book.

### The catch block

The catch keyword uses the “block-scoping declaration capability”, it creates a block scope when you declare the “error” parameter or if you declare another block scope variable.

### Function Declaration in Blocks

This feature is when you declare a function inside a block, based on the JS standard the function should be only accessible inside the block that declares it but, in the browsers environment there is a difference, here the function name is hoisted to the function scope and initialized as undefined. This is because the definition came after the browser already implemented it, so decided to keep it.

![Function in Block](img/functionInBlock.PNG)

## Chapter 7: Using Colsures

Closure helps you to encapsulate the variables and preserve the access from inside functions. “Functions can remember these referenced scoped variables via closure”.
Closure is a mathematical concept, from lambda calculus. To observe the closure you need to call the function in a different scope. Closure is when a function from inner scope uses variables defined in outer scopes, so the variable will still be accessible from the inner scope even if the function is called in other scope.
Example:

```
function studentsList() {
  var students = [“Pepe”, “Lola”, “Maria”];
  return function listStudents() {
		console.log(`students list: ${students.join(“, ”)} `);
  }
}
var getStudents = studentsList();
getStudents();
//students list: Pepe, Lola, Maria
```

In the example you can see how the students list is still accessible even when the `studentList`  finished its execution. The students variable is still in memory and is no recollected by the Garbage Collector.

### Closure instances

Based on the following example you can see how each time the function is called a new closure is created. This happens at runtime.

```
function sumA(a) {
	return sumB(b) {
	  return a  + b;
  }
}

let sum1 = sumA(10);
let sum2 = sumA(20);

conole.log(sum1(10));
// 20
conole.log(sum2(20));
// 40
```
Those variables that are accessible aren’t snapshots instead a live links, so you can still update those values. 

### When a closure is not created

A closure won’t be created in the following cases:

-	If the inner function is invoked in the scope it was created.
-	If the function if it uses variables in the global scope.
-	If the function doesn’t use any variable from the outer scope.

### Closure definition

>  “Closure is observed when a function uses variables from outer scope even while running in a scope where whose variables wouldn’t be accessible”.

### The closure lifecycle and Garbage Collection

The closure of a variables will be available while there is a reference to that function.
It’s important to clean the references to the functions with closures, that way the GC can remove the closures.

About if the closure is for the scope or only the variables, conceptually it should be by variables.

## Chapter 8: The Module Pattern

Encapsulation in a broad meaning is to bundle information and behavior together to server a common purpose. It also helps to control the visibility of the functionality; in JS it can be done through lexical scope.

### What is a Module?

> “Module is a collection of related data, which can be private or public accessible”
A module is also stateful, it keeps the information over time.

### Namespace (Stateless Grouping)

A namespace is a group of functions but, without data.

### Data Structures (Stateful Grouping)

It is a group of data and functions but there is not hiding of information.

### Modules (Stateful Access Control)

It groups data and function, also controls the visibility of the information.
Example: 

```
var students = (function defineStudents() {
	var studentList = [“Pepe”, “Lola”, “Leo”];
	var publicAPI = {
		getFirstStudent
  };

  return publicAPI;

  function getFirstStudent() {
    return studentList[0];
  }
})()
students. getFirstStudent();
```

In the example above you can see how the ` studentList ` is hidden and only accessible through the ` getFirstStudent ` function that is public.

### Module Factory (Multiple Instances)

```
function defineStudents() {
	var studentList = [“Pepe”, “Lola”, “Leo”];
	var publicAPI = {
		getFirstStudent
  };

  return publicAPI;

  function getFirstStudent() {
    return studentList[0];
  }
}
const students = defineStudents();
students. getFirstStudent();
```

The difference between this example and the previous one, is that this one doesn’t use the IIFE, this way each time you call the function ` defineStudents ` you are creating a new instance of the variable ` studentList `.

### Node CommonJS Modules

CommonJS is file based, this means that each file is a module, if you want to make any feature public you need to use the object provided `module.exports`.

```
module.exports.getName = getName;

var name = [“Pepe”, “Lola”];

function getName() {
	return name[0];
}
```

If you want to import a module you need to use the `require`.

```
var students = require(“src/students.js”);

students.getName();
```

The CommonJS behaves a singleton module, doesn’t matter how many times you invoke the `require` it returns the same reference. The `require` always return the whole public API, if you want only import part of it you can use destructuring.

### ES Modules (ESM)

The ESM is file based (a module per file), it is singleton. The main difference with CommonJS is that ESM is by default ` strict mode`.
To export you use the keywork `export` and the `import` to get it.

```
var students = [“Pepe”, “Lola”];

export function getStudent() {
	return students[0];
}

----

import { getStudent } from “src/students.js”;

getStudent();
```

There are several ways to do the imports but one of them is the “namespace import”.
It imports everything(the default and name exports) and stores it all under the single namespace specified.

```
Import * as Student from “src/students.js”;

Student .getStudent();
```

## Appendix A: Exploring Further

### Implied Scopes

There are other scopes that weren’t discussed, those are:

#### Parameter scope

By default, we think that the parameters of functions have the same scope as local variables of the function, but in some cases, it is no true. There are two types of parameters, the simple and non-simple. The non-simple includes parameters with default value, rest parameters and destructured parameters.
Example: 
```
function getStudent(studentID = 0) { }
```
There are some corner cases where we need to be aware of this.
Example: 

```
function getStudent(studentID = maxID, maxID) { }
```

In the example above the studentID will fail, because the maxID wasn’t declared yet, so you need to reorder the params and first put the maxID and then the studentID.
We could also use function expression in the default value of the parameter an create a new inner scope.

```
function getStudent(id, defaultID = () => ID) {
	defaultID();
}
```

> Note: there are corner cases with shadowing parameter variables with local variables, avoid do that.

#### Function Name Scope

The name of a function expression is added to the function’s own scope.
```
var askQuestion = function ofTheTeacher() {}
```

> “The function name “ofTheTeacher” is not added to the enclosing scope. The name identifier of a function expression is in its own implied scope, nested between the outer enclosing scope and the main inner function scope”.

### Arrow Functions

Arrow function are always anonymous functions, but it has a cost in readability. The purpose of the arrow function is having lexical `this` behavior. It doesn’t define `this` identifier, instead it looks in the scope chain.
