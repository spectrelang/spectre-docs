---
title: Core Concepts
sidebar_label: Core Concepts
sidebar_position: 2
---

# Core Concepts

This section covers the fundamental concepts that distinguish Spectre from other programming languages. Understanding these concepts is essential for writing correct and idiomatic Spectre code.

## Immutability

Spectre follows an immutability-by-default approach. All variable bindings are immutable unless explicitly marked as mutable.

### Immutable Bindings

Variables declared without the `mut` modifier cannot be reassigned:

```spectre
val x: i32 = 10    // Immutable - cannot be changed
val y: i32 = 20    // Immutable - cannot be changed
```

Attempting to reassign an immutable variable results in a compile-time error.

### Mutable Bindings

To create a mutable variable, the mutability must be specified at the type level:

```spectre
val x: mut i32 = 10    // Mutable - can be reassigned
x = 20                 // Valid
```

### Mutable Buffers

For mutable string or buffer types, the same principle applies:

```spectre
val buf: mut []char = "data"    // Mutable buffer
```

### Struct Field Mutability

Struct fields can be individually marked as mutable, but the containing struct instance must also be mutable to allow field modification:

```spectre
type SomeType = {
    x: i32           // Immutable field
    y: mut i32       // Mutable field
}

// Immutable struct instance - no fields can be modified
val st: SomeType = {x: 30, y: 40}
st.y = 30            // Error: st is immutable

// Mutable struct instance - mutable fields can be modified
val st: mut SomeType = {x: 30, y: 40}
st.y = 30            // Valid: st is mutable and y is a mutable field
st.x = 10            // Error: x is an immutable field
```

This two-level mutability system (instance-level and field-level) provides fine-grained control over state changes while maintaining safety guarantees.

## Contract System

The contract system is the cornerstone of Spectre's approach to software correctness. Functions specify their behavior through pre-conditions and post-conditions.

### Pre-conditions

Pre-conditions define the requirements that must be satisfied before a function can be called. They are specified in a `pre` block:

```spectre
fn divide(a: i32, b: i32) i32 = {
    pre {
        not_zero : b != 0
    }
    val result = a / b
    return result
}
```

### Post-conditions

Post-conditions define the guarantees that a function provides upon completion. They are specified in a `post` block:

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

### Contract Labels

Contract conditions can be labeled for better error reporting:

```spectre
fn some_function(some_arg: i32, some_other_arg: usize) void = {
    pre {
        is_bigger_than_ten      : some_arg > 10
        is_bigger_than_twenty   : some_other_arg > 20
    }
    post {
        x_is_ten : x == 10
        y_is_twe : y == 20
    }
}
```

Labels are optional. Unlabeled conditions are also valid:

```spectre
fn divide(a: i32, b: i32) i32 = {
    pre {
        b != 0
        is_proper(b)
    }
    val result = a / b
    post {
        result <= a
        is_a_good_result(a)
    }
    return result
}
```

### Runtime Behavior

Currently, contracts are lowered to runtime checks. If a condition fails, the program panics to prevent undefined behavior. Future versions aim to support static analysis to elide runtime checks where mathematical proof is possible.

## Trust Model

Spectre's trust model makes unverifiable operations explicit in the type system.

### The Trust Marker (!)

Functions that do not contain formal contracts or perform unverifiable side effects (such as I/O) must append a `!` to their return type:

```spectre
// Verified function - has contracts
fn add(a: i32) i32 = {
    pre {
        a > 0
    }
    post {
        result > a
    }
    return a + 1
}

// Trusted function - no contracts, performs I/O
fn print_data() void! = {
    // Unverified operation
}
```

The `!` marker indicates that a function is "trusted" but not formally verified.

### Trust Propagation

When a verified function calls a trusted function, it must either:

1. **Adopt the trust marker**, propagating the lack of verification up the call stack:

```spectre
fn verified_function() void! = {
    // Now also marked as trusted
    print_data()
}
```

2. **Use a manual override** to assert safety at the call site:

```spectre
fn verified_function() void = {
    trust print_data()    // Assert safety manually
}
```

This propagation ensures that the trust requirements of a program are always visible in the type signatures.

### Example: Trust in Practice

```spectre
val std = use("std")

pub fn some_other_function() void! = {
    std.io.print("This function has no contracts, thus the return type is marked !")
}

fn pure_function() void = {
    trust std.io.print("This is trusted now, and can therefore run in a pure function")
}
```

## Option Types

Spectre provides option types for handling values that may or may not be present:

```spectre
fn check(fail: bool) option[i32]! = {
    if (fail) {
        return some 10
    }
    return none
}
```

Option types are covered in detail in the [Type System](./type-system.md) documentation.

## Functions and Return Types

Functions in Spectre use an assignment-style syntax with braces:

```spectre
fn name(arg: type) ReturnType = {
    // Body
}
```

### Return Type Variations

- **Standard return**: `fn add(a: i32) i32`
- **Void return**: `fn print() void`
- **Trusted return**: `fn io_operation() void!`
- **Option return**: `fn find() option[i32]`

### Simple Functions

Functions without contracts must be marked as trusted:

```spectre
pub fn main() i32 = {
    return 0
}
```

Note that this function has no contracts and no `!` marker. In a complete implementation, this would require the trust marker.

## Summary

The core concepts of Spectre work together to create a language focused on correctness:

1. **Immutability** reduces unintended side effects
2. **Contracts** make function behavior explicit and verifiable
3. **Trust propagation** ensures unverifiable operations are always visible
4. **Option types** provide safe handling of potentially absent values

These concepts form the foundation for writing reliable, verifiable Spectre programs.
