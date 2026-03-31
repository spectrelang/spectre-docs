---
title: Contract System
sidebar_label: Contract System
sidebar_position: 4
---

# Contract System

The contract system is the foundation of Spectre's approach to software correctness. This document provides a comprehensive guide to pre-conditions, post-conditions, and the trust propagation system.

## Overview

Contracts in Spectre allow functions to specify their requirements and guarantees explicitly. This makes function behavior verifiable and documents intent directly in the code.

A contract consists of two parts:

- **Pre-conditions**: Conditions that must be true before function execution
- **Post-conditions**: Conditions that must be true before function return

## Pre-conditions

Pre-conditions define the requirements that callers must satisfy when calling a function. They are specified using the `pre` block.

### Basic Syntax

```spectre
fn function_name(param: Type) ReturnType = {
    pre {
        condition
    }
    // Function body
}
```

### Labeled Conditions

Pre-conditions can include labels for better error reporting:

```spectre
fn divide(a: i32, b: i32) i32 = {
    pre {
        not_zero : b != 0
    }
    val result = a / b
    return result
}
```

The label `not_zero` identifies this specific condition, making it easier to diagnose contract violations.

### Multiple Conditions

Multiple pre-conditions can be specified:

```spectre
fn some_function(some_arg: i32, some_other_arg: usize) void = {
    pre {
        is_bigger_than_ten      : some_arg > 10
        is_bigger_than_twenty   : some_other_arg > 20
    }
    // Function body
}
```

### Unlabeled Conditions

Labels are optional. Boolean expressions can be written without labels:

```spectre
fn divide(a: i32, b: i32) i32 = {
    pre {
        b != 0
        is_proper(b)
    }
    val result = a / b
    return result
}
```

### Complex Expressions

Pre-conditions can contain complex boolean expressions and function calls:

```spectre
fn process(x: i32, y: i32) i32 = {
    pre {
        x > 0 && y > 0
        is_valid_input(x)
        is_valid_input(y)
    }
    // Function body
}
```

## Post-conditions

Post-conditions define the guarantees that a function provides upon successful completion. They are specified using the `post` block.

### Basic Syntax

```spectre
fn function_name(param: Type) ReturnType = {
    pre {
        // Pre-conditions
    }
    // Function body
    post {
        condition
    }
    return result
}
```

### Example

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

### Multiple Post-conditions

```spectre
fn some_function(some_arg: i32) i32 = {
    pre {
        some_arg > 0
    }
    val x: i32 = 10
    val y: i32 = 20
    val z: i32 = 30
    post {
        x_is_ten : x == 10
        y_is_twe : y == 20
        z_is_thi : z == 30
    }
    return x + y + z
}
```

### Post-conditions with Function Calls

Post-conditions can include function calls and complex expressions:

```spectre
fn divide(a: i32, b: i32) i32 = {
    pre {
        b != 0
        is_proper(b)
    }
    val result = a / b
    post {
        result <= a
        is_a_good_result(result)
    }
    return result
}
```

## Contract Enforcement

### Runtime Behavior

In the current implementation (v0.1.0), contracts are lowered to runtime checks. If a contract condition fails, the program panics to prevent undefined behavior.

```spectre
val std = use("std")

type SomeType = {
    x: i32
    y: mut i32
}

pub fn trusted_function(x: i32, y: i32) i32 = {
    pre {
        is_above_zero : x > 0 && y > 0
    }
    post {
        x < 100 && y < 100
    }
    return x + y
}

pub fn main() void = {
    // This will cause a runtime error because y = -2 violates the pre-condition
    std.io.put_any("{d}", {trusted_function(1, -2)})
}
```

### Future Static Analysis

Future versions of Spectre aim to support static analysis and range-tracking to elide runtime checks where mathematical proof is possible. This would allow the compiler to verify contracts at compile-time rather than runtime.

## Trust System

The trust system in Spectre makes unverifiable operations explicit in the type system.

### The Trust Marker (!)

Functions that do not contain formal contracts or perform unverifiable side effects must append a `!` to their return type:

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

// Trusted function - no contracts
pub fn some_other_function() void! = {
    std.io.print("This function has no preconds, postconds, or invariants")
}
```

### When to Use the Trust Marker

The trust marker should be used when:

1. **No contracts are present**: Functions without pre-conditions or post-conditions
2. **Side effects**: Functions that perform I/O or other side effects
3. **External calls**: Functions that call external code or libraries
4. **Unverifiable operations**: Operations that cannot be formally verified

### Examples

```spectre
val std = use("std")

// I/O operation - must be marked as trusted
pub fn main() void! = {
    std.io.print("Hello, world.")
}

// Option return with side effects
fn can_fail(should_fail: bool) option[i32]! = {
    if (should_fail) {
        return some 10
    }
    return none
}

// Pure function that uses trusted operations
fn pure_function() void = {
    trust std.io.print("This is trusted now")
}
```

## Trust Propagation

When a verified function calls a trusted function, the trust requirement must be handled explicitly.

### Propagation Options

A verified function calling a trusted function must either:

### 1. Adopt the Trust Marker

Propagate the lack of verification up the call stack:

```spectre
fn verified_function() void! = {
    // Now also marked as trusted
    some_other_function()
}
```

### 2. Use Manual Override

Assert safety at the call site using the `trust` keyword:

```spectre
fn verified_function() void = {
    trust some_other_function()
}
```

The `trust` keyword tells the compiler that you have manually verified the safety of this call, allowing the function to maintain its verified status.

### Trust Propagation Example

```spectre
val std = use("std")

// Trusted function - performs I/O
fn print_message() void! = {
    std.io.print("Message")
}

// Verified function that adopts trust
fn caller_one() void! = {
    print_message()    // Inherits the trust marker
}

// Verified function that uses manual override
fn caller_two() void = {
    trust print_message()    // Manually verified
}
```

## Best Practices

### Writing Effective Contracts

1. **Be specific**: Use descriptive labels for contract conditions
2. **Cover edge cases**: Include pre-conditions for all potential failure modes
3. **Document guarantees**: Use post-conditions to specify what the function guarantees
4. **Keep it simple**: Complex contracts are harder to verify and understand

### Trust Management

1. **Minimize trusted code**: Use contracts wherever possible
2. **Document trust reasons**: Comment why a function is marked as trusted
3. **Limit propagation**: Use `trust` overrides judiciously
4. **Audit trusted functions**: Regularly review trusted code for correctness

### Example: Well-Documented Contracts

```spectre
val std = use("std")

fn divide(a: i32, b: i32) i32 = {
    pre {
        // Ensure divisor is not zero to prevent division by zero
        not_zero : b != 0
    }
    val result = a / b
    post {
        // Result should be scaled appropriately
        is_scaled : result <= a
    }
    return result
}

fn process_data(data: []char) void = {
    pre {
        // Data must not be empty
        data_not_empty : length(data) > 0
    }
    post {
        // Processing completes successfully
        processing_complete : true
    }
    // Processing logic
}
```

## Common Patterns

### Input Validation

```spectre
fn process_positive(x: i32) i32 = {
    pre {
        x_is_positive : x > 0
    }
    // Process positive value
    return x * 2
}
```

### Range Constraints

```spectre
fn clamp(value: i32, min: i32, max: i32) i32 = {
    pre {
        valid_range : min <= max
    }
    post {
        in_range : result >= min && result <= max
    }
    // Clamp logic
    return value
}
```

### Resource Management

```spectre
fn use_resource(handle: i32) void = {
    pre {
        handle_valid : handle > 0
        resource_available : is_available(handle)
    }
    post {
        resource_released : is_released(handle)
    }
    // Use and release resource
}
```

## Error Handling with Contracts

Contracts provide a form of error handling by ensuring that functions are called correctly and produce expected results.

### Contract Violations

When a contract condition fails, the program panics. This prevents undefined behavior and makes errors explicit.

```spectre
// This will panic at runtime if the pre-condition fails
pub fn main() void = {
    std.io.put_any("{d}", {trusted_function(1, -2)})
    // -2 violates the pre-condition x > 0 && y > 0
}
```

### Option Types for Recoverable Errors

For recoverable errors, use option types instead of contracts:

```spectre
fn check(fail: bool) option[i32]! = {
    if (fail) {
        return some 10
    }
    return none
}
```

Option types are covered in detail in the [Type System](./type-system.md) documentation.

## Summary

The Spectre contract system provides:

- **Pre-conditions**: Specify function requirements
- **Post-conditions**: Specify function guarantees
- **Labels**: Enable clear error reporting
- **Trust markers**: Make unverifiable operations explicit
- **Trust propagation**: Ensure trust requirements are visible

Contracts are a powerful tool for writing correct, verifiable code. They document function behavior, catch errors early, and support future static analysis capabilities.
