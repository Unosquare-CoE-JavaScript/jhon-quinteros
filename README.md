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
