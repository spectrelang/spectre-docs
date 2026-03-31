---
title: Syntax Guide
sidebar_label: Syntax Guide
sidebar_position: 3
---

# Syntax Guide

This guide provides a comprehensive overview of Spectre's syntax, covering variable declarations, function definitions, expressions, and control flow.

## Variable Bindings

All variables in Spectre are declared using the `val` keyword. By default, variables are immutable.

### Basic Syntax

```spectre
val identifier: Type = expression
```

### Immutable Variables

```spectre
val x: i32 = 10
val y: i32 = 20
val z: i32 = 30
```

Once assigned, immutable variables cannot be reassigned.

### Mutable Variables

To create a mutable variable, add the `mut` modifier at the type level:

```spectre
val x: mut i32 = 10
x = 20    // Valid reassignment
```

### Mutable Buffers

For mutable string or buffer types:

```spectre
val buf: mut []char = "This can change"
```

### Type Inference

Type annotations are required for all variable declarations in Spectre.

## Function Definitions

Functions are defined using the `fn` keyword with an assignment-style syntax.

### Basic Syntax

```spectre
fn function_name(parameter: Type) ReturnType = {
    // Function body
}
```

### Function Parameters

Multiple parameters are separated by commas:

```spectre
fn some_function(some_arg: i32, some_other_arg: usize) void = {
    // Body
}
```

### Return Types

Functions can return various types:

```spectre
// Void return
fn print_message() void = {
    // No return value
}

// Primitive return
fn add(x: i32, y: i32) i32 = {
    return x + y
}

// Trusted return (unverified)
fn io_operation() void! = {
    // Performs I/O
}

// Option return
fn check(fail: bool) option[i32]! = {
    if (fail) {
        return some 10
    }
    return none
}
```

### Functions with Contracts

Functions can include pre-conditions and post-conditions:

```spectre
fn divide(a: i32, b: i32) i32 = {
    pre {
        not_zero : b != 0
    }
    val result = a / b
    post {
        is_scaled : result <= a
    }
    return result
}
```

### Public Functions

Functions can be marked as public using the `pub` keyword:

```spectre
pub fn main() void! = {
    // Entry point
}

pub fn add(x: i32, y: i32) i32 = {
    return x + y
}
```

## Struct Definitions

Structs are defined using the `type` keyword.

### Basic Syntax

```spectre
type StructName = {
    field_name: Type
}
```

### Struct with Multiple Fields

```spectre
type Point = {
    x: mut i32
    y: mut i32
}
```

### Mixed Mutability

Fields can have different mutability:

```spectre
type SomeType = {
    x: i32           // Immutable field
    y: mut i32       // Mutable field
}
```

### Struct Instantiation

Structs are instantiated using brace syntax:

```spectre
val st: SomeType = {x: 30, y: 40}
```

For mutable struct instances:

```spectre
val st: mut SomeType = {x: 30, y: 40}
st.y = 30    // Valid: st is mutable and y is mutable
```

## Module Imports

Modules are imported using the `use` statement.

### Basic Import

```spectre
val std = use("std")
```

### Importing Specific Files

```spectre
val some_other_module = use("some_other_module.spr")
```

## Expressions

### Arithmetic Expressions

```spectre
val result = x + y
val difference = a - b
val product = x * y
val quotient = a / b
```

### Comparison Expressions

```spectre
val is_greater = x > 10
val is_equal = a == b
val is_not_zero = b != 0
```

### Logical Expressions

```spectre
val both_true = x > 0 && y > 0
val either_true = a > 0 || b > 0
```

### Complex Expressions

Contract conditions can contain complex expressions:

```spectre
pre {
    is_above_zero : x > 0 && y > 0
}

post {
    x < 100 && y < 100
}
```

## Control Flow

### If Statements

```spectre
fn check(fail: bool) option[i32]! = {
    if (fail) {
        return some 10
    }
    return none
}
```

### For Loops

```spectre
for {
    std.io.print("its cool")
    break
}
```

### Return Statements

```spectre
pub fn main() i32 = {
    return 0
}

pub fn add(x: i32, y: i32) i32 = {
    return x + y
}
```

## Test Blocks

Test blocks are used for unit testing:

```spectre
pub fn add(x: i32, y: i32) i32 = {
    return x + y
}

test {
    assert add(1, 2) == 3
}
```

## Constants

Public constants are declared using `pub val`:

```spectre
pub val some_constant = 1000
```

## Comments

Single-line comments use double slashes:

```spectre
val x: i32 = 10    // This is a comment
val y: i32 = 20    // Neither can this...
val z: i32 = 30    // Or this.
```

## Complete Example

A complete Spectre program combining multiple syntax elements:

```spectre
val std = use("std")

type Point = {
    x: mut i32
    y: mut i32
}

fn some_function(some_arg: i32, some_other_arg: usize) void = {
    pre {
        is_bigger_than_ten      : some_arg > 10
        is_bigger_than_twenty   : some_other_arg > 20
    }

    val x: i32 = 10
    val y: i32 = 20
    val z: i32 = 30
    val a: mut []char = "This can change"

    post {
        x_is_ten : x == 10
        y_is_twe : y == 20
        z_is_thi : z == 30
    }

    std.io.put_any("{d} {d}", {x, y})
}

pub val some_constant = 1000

fn pure_function() void = {
    trust std.io.print("This is trusted now")
}

fn can_fail(should_fail: bool) option[i32]! = {
    if (should_fail) {
        return some 10
    }
    return none
}

pub fn some_other_function() void! = {
    std.io.print("This function has no contracts")
}
```

## Syntax Summary

| Construct | Syntax |
|-----------|--------|
| Variable | `val name: Type = expression` |
| Mutable Variable | `val name: mut Type = expression` |
| Function | `fn name(params) ReturnType = { body }` |
| Public Function | `pub fn name(params) ReturnType = { body }` |
| Trusted Function | `fn name(params) ReturnType! = { body }` |
| Struct | `type Name = { fields }` |
| Import | `val name = use("module")` |
| Pre-condition | `pre { label : condition }` |
| Post-condition | `post { label : condition }` |
| If Statement | `if (condition) { body }` |
| For Loop | `for { body }` |
| Return | `return expression` |
| Test Block | `test { assert condition }` |
| Constant | `pub val name = expression` |

This syntax guide covers the fundamental constructs of Spectre. For more detailed information on specific features, refer to the dedicated sections on [contracts](./contract-system.md) and [types](./type-system.md).
