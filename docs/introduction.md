---
title: Introduction
sidebar_label: Introduction
sidebar_position: 1
---

# Spectre Programming Language

Spectre is a systems-level, contract-based programming language designed for formal verification and safety. In Spectre, software correctness is a first-class citizen, achieved through integrated pre-conditions, post-conditions, and a manual trust-propagation system.

## Overview

Spectre targets scenarios where reliability and correctness are paramount. The language enforces a disciplined approach to software development by requiring explicit contracts for function behavior and propagating trust requirements through the call stack.

### Key Features

- **Contract-Based Programming**: Functions define their success criteria through `pre` and `post` blocks that specify conditions which must hold before execution and after completion.

- **Explicit Trust Model**: Functions without formal contracts must be explicitly marked as trusted using the `!` suffix, making unverifiable operations visible in the type system.

- **Immutability by Default**: All variable bindings are immutable unless explicitly marked as mutable, reducing unintended side effects.

- **Formal Verification Support**: The language is designed to support static analysis and formal verification tools through its contract system.

## Design Philosophy

Spectre is built on three core principles:

### 1. Safety by Contract

Every function in Spectre can specify its requirements and guarantees through contract blocks. This makes function behavior explicit and verifiable.

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

### 2. Explicit Trust

Operations that cannot be formally verified (such as I/O or external calls) must be marked as trusted. This trust requirement propagates through the call stack, ensuring that unverifiable operations are always explicit.

### 3. Immutability by Default

Variables are immutable by default, requiring explicit opt-in for mutability. This reduces bugs related to unintended state changes and makes reasoning about code easier.

## Quick Example

A simple Spectre program demonstrates the language's contract-based approach:

```spectre
val std = use("std")

pub fn main() void! = {
    std.io.print("Hello, world.")
}
```

Note that the `main` function returns `void!` rather than `void`. The `!` suffix indicates that this function is trusted but not verified, as it performs I/O operations which cannot be formally verified.

A more complete example with contracts:

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
```

## Getting Started

### File Extension

Spectre source files use the `.spr` extension.

### Basic Syntax Structure

A Spectre program consists of:

1. **Module imports** using the `use` statement
2. **Type definitions** using the `type` keyword
3. **Function definitions** using the `fn` keyword
4. **Test blocks** for unit testing

### Compilation and Execution

Spectre contracts are lowered to runtime checks. If a contract condition fails, the program panics to prevent undefined behavior. Future versions aim to support static analysis and range-tracking to elide runtime checks where mathematical proof is possible.

## Document Structure

This documentation is organized into the following sections:

- **Core Concepts**: Fundamental principles of the Spectre language
- **Syntax Guide**: Detailed syntax for variables, functions, and expressions
- **Contract System**: Pre-conditions, post-conditions, and trust propagation
- **Type System**: Primitive types, option types, and structs
- **Modules and Packages**: Import system and visibility modifiers
- **Testing**: Writing and running tests
- **Error Handling**: Option types and runtime error handling
- **Language Reference**: Complete reference of keywords and syntax

## Version Information

**Current Version**: 0.1.0

Spectre is under active development. The language specification and implementation are evolving to support more advanced verification features.
