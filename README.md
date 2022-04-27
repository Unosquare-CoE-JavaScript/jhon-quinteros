# jhon-quinteros

# YOU DON'T KNOW JS YET

## Chapter 1: What is JavaScript?

The language was conceived by Brendan Eich at Nescape, the name JavaScript was decided mainly by marketing. The language was standardized by TC39 as the ECMAScript.

### Language Specification

The TC39 committee gathers to add or change features of the language.
The process of transform a propose to a new feature is made in five stages (input the propose, describe it and show potential challenges, describe the syntax, refinement and feedback, inclusion in the ECMAScript).

### The Language Implementation

All the environments that implement JavaScript (browsers, servers) should follow the ECMAScript and in most cases it happens, but sometimes could happen that the engines that implements the ECMAScript doesn’t match with was defined. Also the engines add some features that are not defined in the specification i.e: the Console.log(), alert(), the REPL, etc…

### Multi-Paradigm

A paradigm is the approach of structuring the code, Javascript is multi-paradigm, it lets you code in a procedural, Object Oriented or Functional way.

### Backward & Forward Combability

Once a feature is accepted as standard it won’t be changed or removed, that way no matters how old is the code it will work. It also implies that every feature added should be carefully reviewed as it would be permanently. There are exceptions, but any change is evaluated to measure the impact of that change.

The forward compatibility means that new features added won’t break the code, Javascript is not forwards-compatible, because if code ignores the new features and it still runs it could fail or give undesirable results.

### Fixing compatibility Issues

As Javascript is not forwards compatible, you can use tool that will transpile the code to an older version of the standard that way the developer can still use the new feature without to worry about the compatibility.

Another technique is the use of pollyfills, it is code that is added to fill the gaps of the standard API, there are tools that already look for the missing features and add it, that way the code will still work.

### Javascript is Interpreted or Compiled

A language is considered interpreted when it runs from top to down line by line, one of the main drawbacks of it is the detections of errors, that are discovered at runtime when it execute the code line with the error.
A compiled language is when the code is parsed, optimized and it does a check the code, helping to find error before it runs.

Javascript is a parsed language, it means that before the code is executed it generates code (binary) checking possible errors. Once the binary code is generated, it is handled by the JS virtual machine. 
We can consider Javascript as a compiled language because it does several steps before it is executed, starting by the transpilation and addition of polyfills by babel and other tools, then the JS engine parse the code to AST(Abstract Syntax Tree), after that it is converted in a binary code (IR) and finally the JS VM execute the code.

### Web Assembly

It is a tool that let convert code thar is not in Javascript and run it over the JS VM. It does the compilation of the code ahead of time (AOT) so it can run in the JS VM, the main idea was to do performance improvement and bring no JS developers to the web, but there are new opportunities with this tool trying make it cross-platform.

### Strict mode

Javascript added the Strict mode `“use strict”;` in the ES5 version, this adds new  set of rules to the code you write below it, i.e: the value of `this` in the strict mode is `undefined`. Most of the projects by default uses strict mode either by the transpilers that add it or if you use the ES6 modules that also add it.


## Chapter 2: Surveying JS

### Each File is a Program

In Javascript each file is considered a program and they can interact among them by the global context. In the ES6 was added the module, there you can export the state and methods or import other ones.

### Values

Javascript has two categories of values, the primitives (numbers, string, Boolean, null, undefined and symbol) and objects.
An object is and unordered keyed collection of values, but Javascript also has arrays that are numerically ordered list of data. 

### Declaring Variable

A value can be literal (declared inline in the code) or held in a variable. You can use three keywords to declare a variable: the `var` it lets you declare and reassign its value it use a function scope, `let` is almost the same as `var` but it has a block scope, `const` it is block scope and it doesn’t let you reassign its value.

### Function

It is a group of statement that can be called several times, there are two was to define a function:

-	Declaring a function: the name is associated to the function at compilation time.

```
function test() {
}
```

-	Function expression: the function is assigned to the variable at runtime.

```
Var test = function() {
}
```

>  Note: in Javascript a function is a first class citizenship, it means that can be threated  as other types in Javascript, you can assign it to a variable or pass it as a parameter in other function.

### Comparisons

It lets you take decisions in the code based on the comparing values, in JS there are many ways to do it.

-	Strict Comparison: the operator for this is the `===` which compares the values and doesn’t let do coercion but there are two exception that fail with this operator, the `NaN ` and the `-0` for the `NaN ` you can use Number.isNaN() and for `-0` you can use Object.is().
In case of the objects, it does a comparison of the reference no by the content of the object(structure equality).

-	Coercive Comparisons: the operator == does comparison of value and type, but in case the types are different, it first does a coercion and then it does the comparison

### Classes

> ”Classes are a definition of a type of custom data structure that includes data and behaviors”
and to have concrete values of a class you need to insatiate it, i.e.

```
Class Page {
  Constructor(text) {
    this.text = text;
  }
  print() {
    console.log(this.text);
  }
}

var newPage = new Page(“test sample”);
newPage.print();
```

### Class Inheritance

It lets you share common behavior among classes i.e.

```
Class Publication {
  Constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  print() {
    console.log(`
      Title: ${this.title}
      By: ${}
    `)
  }
}

Class Book extends Publication {
	constructor(title, author, ISBN) {
		super(title, author);
		this.ISBN = this.ISBN;
	}
	print() {
		super.print();
		console.log(`ISBN: ${ISBN}`);
  }
}
```

The `super` keyword is used to access the parent constructor and also to call it’s methods. The option of overriding the parent’s methods is called polymorphism.

### Modules

Modules are other way to organize the code, it helps you to group the code and import other modules to interact with.
Javascript defined the standard in the ES6 but there are also other implementation of modules: 
-	Asynchronous Module Definition(AMD)
-	Universal Modules Definition(UMD)
-	CommonJS

#### ES Module

It is the standard definition and these modules are always file based, one file one module. You need to use the keyword `export` in your module with the code that you want make available and `import` to get it. Note that those modules are singleton it is only instantiate the first time it is called.

Example:

```
export function printDetails(title, author) {
	console.log(`
		Title: ${title}
    By: ${author}
  `);
}
```
Then you can import this function in another module:

```
Import { printDetails } from “./file.js”;

printDetails(“title print”, ”Me”);
```

### Iteration

When you have big amounts of data instead of handle it at once you would prefer iterate with small chunks of the data until you process the whole, that is why Javascript standardized the protocol for iterator where you need to define the next() method.
JavaScript also give methods for consuming iterators one of the is the `for of ` another way is using the spread operator`(…)` both options help you to get the information from an iterator.

### Iterables

> Iterable is a value that can be iterated over. ES6 defined some structures as iterable: arrays, strings, maps, sets, etc. that are consumed by iterators.

## Chapter 3: Digging to the Roots of JS

### Closure

> Closure is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.
Example:

```
function greeting(msg) {
	Return function who(name) {
		Console.log(`${msg}, ${who}`);
  }
}

var hello = greeting(“hello”);
var howdy = greeting(“howdy”);

hello(“Kyle”);
howdy(”Grant”);
```
In the above example we can see how the `greeting` function return another inner function `who`, but `who` can still access to the parameter sent to `greeting`.
What happens under hood is that the `msg` parameter is not deleted from the memory, it lets to have still access from the inner function even you can update that value.

### this Keyword

The keyword `this` is not static and is not based on the function definition, it can be changed based on how the function is called. It is defined by the “execution context”(we could this as an object whose properties are available to the function).

Example:

```
function study() {
	console.log(`Studying ${this.subject}`);
}

let math = {
  subject: “Math”,
  study: study
}

let biology = {
  subject: “Biology”,
  study: study
}

math.study();
biology.study();
```

### Prototypes

It helps to solve property access in objects, letting an object A access to methods of an object B creating a prototype chain. In Javascript the inheritance is made by prototypes.

### Object Linkage

You can assign the prototype of an object with the method `Object.create()`, this method create a new object with it’s prototype linked to the parameter sent.

```
let animal = {
    eat: function(){
        console.log("eating");
    }
}
let dog = Object.create(animal);
```

(img/object.create.PNG)
