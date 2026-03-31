---
title: Language Reference
sidebar_label: Language Reference
sidebar_position: 9
---

# Language Reference

This document provides a complete reference for the Spectre programming language syntax, keywords, and constructs.

## Keywords

### Reserved Keywords

| Keyword | Description |
|---------|-------------|
| `val` | Declare a variable binding |
| `mut` | Mark a type as mutable |
| `fn` | Declare a function |
| `type` | Declare a type definition |
| `pre` | Define pre-conditions |
| `post` | Define post-conditions |
| `return` | Return from a function |
| `if` | Conditional statement |
| `for` | Loop statement |
| `break` | Exit a loop |
| `test` | Define a test block |
| `assert` | Assert a condition in tests |
| `pub` | Mark an item as public |
| `use` | Import a module |
| `trust` | Manually override trust requirement |
| `some` | Option type variant with value |
| `none` | Option type variant without value |

### Contextual Keywords

| Keyword | Context | Description |
|---------|---------|-------------|
| `option` | Type system | Generic option type |
| `void` | Type system | Absence of a value |
| `void!` | Type system | Trusted void return |

## Syntax Reference

### Variable Declarations

```spectre
// Immutable variable
val identifier: Type = expression

// Mutable variable
val identifier: mut Type = expression

// Mutable buffer
val identifier: mut []char = expression
```

### Function Definitions

```spectre
// Basic function
fn identifier(parameter: Type) ReturnType = {
    // Body
}

// Function with multiple parameters
fn identifier(param1: Type1, param2: Type2) ReturnType = {
    // Body
}

// Public function
pub fn identifier(parameter: Type) ReturnType = {
    // Body
}

// Trusted function
fn identifier(parameter: Type) ReturnType! = {
    // Body
}

// Function with contracts
fn identifier(parameter: Type) ReturnType = {
    pre {
        label : condition
    }
    // Body
    post {
        label : condition
    }
    return expression
}
```

### Type Definitions

```spectre
// Struct type
type Identifier = {
    field: Type
}

// Struct with mutable fields
type Identifier = {
    field1: Type
    field2: mut Type
}
```

### Contract Blocks

```spectre
// Pre-conditions
pre {
    label : boolean_expression
    boolean_expression
}

// Post-conditions
post {
    label : boolean_expression
    boolean_expression
}
```

### Control Flow

```spectre
// If statement
if (condition) {
    // Body
}

// For loop
for {
    // Body
    break
}

// Return statement
return expression
```

### Module Imports

```spectre
// Import standard library
val identifier = use("std")

// Import specific file
val identifier = use("filename.spr")
```

### Test Blocks

```spectre
test {
    assert condition
    assert expression == expected
}
```

### Trust Override

```spectre
trust function_call()
```

## Type Reference

### Primitive Types

| Type | Description | Example |
|------|-------------|---------|
| `i32` | Signed 32-bit integer | `val x: i32 = 10` |
| `u32` | Unsigned 32-bit integer | `val x: u32 = 10` |
| `usize` | Unsigned pointer-sized integer | `val x: usize = 10` |
| `bool` | Boolean type | `val x: bool = true` |
| `void` | Absence of value | `fn f() void` |

### Generic Types

| Type | Description | Example |
|------|-------------|---------|
| `option[T]` | Optional value of type T | `option[i32]` |

### Composite Types

| Type | Description | Example |
|------|-------------|---------|
| `[]char` | Character buffer | `val x: mut []char = "text"` |
| `{ fields }` | Struct type | `type T = { x: i32 }` |

### Trust Markers

| Marker | Description | Example |
|--------|-------------|---------|
| `!` | Trusted (unverified) return | `fn f() void!` |

## Expression Reference

### Arithmetic Expressions

```spectre
x + y      // Addition
x - y      // Subtraction
x * y      // Multiplication
x / y      // Division
```

### Comparison Expressions

```spectre
x == y     // Equality
x != y     // Inequality
x < y      // Less than
x <= y     // Less than or equal
x > y      // Greater than
x >= y     // Greater than or equal
```

### Logical Expressions

```spectre
x && y     // Logical AND
x || y     // Logical OR
!x         // Logical NOT (if supported)
```

### Option Expressions

```spectre
some value    // Create some variant
none          // Create none variant
```

## Statement Reference

### Variable Binding Statement

```spectre
val identifier: Type = expression
```

### Assignment Statement

```spectre
identifier = expression    // For mutable variables
```

### Field Assignment Statement

```spectre
instance.field = expression    // For mutable struct fields
```

### Expression Statement

```spectre
expression    // Expression as statement
```

## Complete Grammar Summary

### Program Structure

```
program     ::= import* type_def* function_def* test_def*
import      ::= "val" identifier "=" "use" "(" string ")" ";"
type_def    ::= "type" identifier "=" "{" field* "}" ";"
field       ::= identifier ":" "mut"? type "\n"
function_def ::= "pub"? "fn" identifier "(" params? ")" type "!"? "=" "{" body "}"
test_def    ::= "test" "{" assert_stmt* "}"
```

### Function Body

```
body        ::= pre_block? val_stmt* post_block? stmt*
pre_block   ::= "pre" "{" condition* "}"
post_block  ::= "post" "{" condition* "}"
condition   ::= identifier ":" boolean_expr | boolean_expr
```

### Statements

```
stmt        ::= val_stmt | assign_stmt | if_stmt | for_stmt | return_stmt | expr_stmt
val_stmt    ::= "val" identifier ":" "mut"? type "=" expression ";"
assign_stmt ::= identifier "=" expression ";"
if_stmt     ::= "if" "(" expression ")" "{" stmt* "}"
for_stmt    ::= "for" "{" stmt* "}"
return_stmt ::= "return" expression ";"
expr_stmt   ::= expression ";"
```

### Expressions

```
expression  ::= logical_expr
logical_expr ::= comparison_expr (("&&" | "||") comparison_expr)*
comparison_expr ::= additive_expr (("==" | "!=" | "<" | "<=" | ">" | ">=") additive_expr)*
additive_expr ::= multiplicative_expr (("+" | "-") multiplicative_expr)*
multiplicative_expr ::= unary_expr (("*" | "/") unary_expr)*
unary_expr  ::= primary_expr | "!" unary_expr
primary_expr ::= identifier | literal | "(" expression ")" | "some" expression | "none"
```

### Literals

```
literal     ::= integer_literal | string_literal | bool_literal
integer_literal ::= digit+
string_literal ::= '"' char* '"'
bool_literal ::= "true" | "false"
```

## Standard Library Reference

### I/O Functions

| Function | Description | Example |
|----------|-------------|---------|
| `std.io.print(msg)` | Print a string | `std.io.print("Hello")` |
| `std.io.put_any(fmt, args)` | Print formatted output | `std.io.put_any("{d}", {x})` |

## Error Reference

### Compile-Time Errors

| Error | Cause | Example |
|-------|-------|---------|
| Type mismatch | Incompatible types | `val x: i32 = "text"` |
| Immutable assignment | Assigning to immutable variable | `val x: i32 = 10; x = 20` |
| Immutable field | Assigning to immutable field | `st.x = 10` where x is immutable |
| Immutable instance | Modifying immutable struct | `st.y = 10` where st is immutable |

### Runtime Errors

| Error | Cause | Example |
|-------|-------|---------|
| Pre-condition violation | Pre-condition evaluates to false | `divide(10, 0)` where pre requires b != 0 |
| Post-condition violation | Post-condition evaluates to false | Function returns value not satisfying post |
| Division by zero | Dividing by zero | `10 / 0` |

## Quick Reference Card

### Declaring Variables

```spectre
val x: i32 = 10              // Immutable
val x: mut i32 = 10          // Mutable
```

### Defining Functions

```spectre
fn f(x: i32) i32 = { return x }
fn f(x: i32) i32! = { ... }  // Trusted
```

### Writing Contracts

```spectre
pre { label : x > 0 }
post { label : result > 0 }
```

### Using Options

```spectre
fn f() option[i32] = { return some 10 }
fn f() option[i32] = { return none }
```

### Writing Tests

```spectre
test {
    assert f(1) == 2
}
```

### Importing Modules

```spectre
val std = use("std")
```

### Controlling Visibility

```spectre
pub fn f() void    // Public
fn f() void        // Private
```

## Version Information

**Language Version**: 0.1.0

This reference covers Spectre version 0.1.0. Future versions may include additional features and syntax.

## Index

- **A**: assert, assignment
- **B**: break, bool, buffer
- **C**: contracts, conditions
- **F**: fn, for, fields
- **I**: if, immutable, import, i32
- **M**: mut, modules
- **N**: none, none variant
- **O**: option, option types
- **P**: pre, post, pub, primitives
- **R**: return, runtime errors
- **S**: some, structs, std, statements
- **T**: test, trust, type, type definitions
- **U**: use, usize, u32
- **V**: val, void, variables
- **!**: trust marker
