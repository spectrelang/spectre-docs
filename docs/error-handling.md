---
title: Error Handling
sidebar_label: Error Handling
sidebar_position: 8
---

# Error Handling

Spectre provides multiple mechanisms for handling errors and exceptional conditions. This document covers option types, contract violations, and runtime errors.

## Overview

Error handling in Spectre is approached through:

- **Option types**: For recoverable errors and absent values
- **Contract violations**: For specification violations
- **Trust markers**: For unverifiable operations
- **Compile-time errors**: For type and mutability violations

## Option Types

Option types are the primary mechanism for handling recoverable errors in Spectre.

### Option Type Syntax

```spectre
fn check(fail: bool) option[i32]! = {
    if (fail) {
        return some 10
    }
    return none
}
```

### Some and None

Option types have two variants:

- **`some T`**: Contains a value of type `T`
- **`none`**: Represents the absence of a value

### When to Use Option Types

Use option types when:

1. A function may not return a valid value
2. An operation may fail in an expected way
3. A value is optional or may be absent

### Example: Safe Division

```spectre
fn safe_divide(a: i32, b: i32) option[i32] = {
    if (b == 0) {
        return none
    }
    return some (a / b)
}
```

### Example: Lookup Operations

```spectre
fn find_element(index: i32) option[i32] = {
    pre {
        index >= 0
    }
    if (index < 10) {
        return some index
    }
    return none
}
```

## Contract Violations

Contract violations occur when pre-conditions or post-conditions are not satisfied.

### Pre-condition Violations

When a pre-condition fails, the program panics:

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

### Post-condition Violations

When a post-condition fails, the program panics before returning:

```spectre
fn bad_function(x: i32) i32 = {
    pre {
        x > 0
    }
    val result = x * 2
    post {
        result_is_positive : result > 0    // Will fail if x is negative
    }
    return result
}
```

### Contract Error Messages

Contract labels provide better error reporting:

```spectre
fn divide(a: i32, b: i32) i32 = {
    pre {
        not_zero : b != 0
    }
    val result = a / b
    return result
}
```

If the contract fails, the label `not_zero` helps identify the specific violation.

## Compile-Time Errors

Spectre catches many errors at compile-time through its type system and mutability rules.

### Mutability Errors

Attempting to modify an immutable variable results in a compile-time error:

```spectre
type SomeType = {
    x: i32
    y: mut i32
}

pub fn main() void! = {
    val st: SomeType = {x: 30, y: 40}
    st.y = 30    // Error: st is immutable, regardless of the mut y field
}
```

### Immutable Field Errors

Attempting to modify an immutable field results in a compile-time error:

```spectre
type SomeType = {
    x: i32
    y: mut i32
}

pub fn main() void! = {
    val st: mut SomeType = {x: 30, y: 40}
    st.y = 30
    st.x = 10    // Error: x is an immutable field
}
```

### Type Errors

Type mismatches are caught at compile-time:

```spectre
val x: i32 = "string"    // Error: type mismatch
```

## Runtime Errors

Runtime errors occur during program execution when contracts are violated or invalid operations are performed.

### Division by Zero

```spectre
fn divide(a: i32, b: i32) i32 = {
    pre {
        not_zero : b != 0
    }
    return a / b
}

// Calling with b = 0 causes a runtime error
divide(10, 0)
```

### Contract Violation Example

The following sample demonstrates a runtime error caused by contract violation:

```spectre
val std = use("std")

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
    // Runtime error: y = -2 violates the pre-condition
    std.io.put_any("{d}", {trusted_function(1, -2)})
}
```

## Trust Markers and Errors

Functions marked with `!` indicate operations that cannot be formally verified.

### Trusted Functions

```spectre
pub fn some_other_function() void! = {
    std.io.print("This function has no contracts")
}
```

The `!` marker indicates that this function is trusted but not verified. It may perform operations that could fail at runtime.

### Trust Propagation

When calling trusted functions, the trust requirement must be handled:

```spectre
val std = use("std")

// Option 1: Adopt the trust marker
fn caller() void! = {
    std.io.print("Now also trusted")
}

// Option 2: Use manual override
fn pure_function() void = {
    trust std.io.print("This is trusted now")
}
```

## Error Handling Patterns

### Pattern 1: Option Type for Recoverable Errors

```spectre
fn parse_number(input: []char) option[i32] = {
    // Attempt to parse
    if (is_valid(input)) {
        return some value
    }
    return none
}
```

### Pattern 2: Contracts for Preconditions

```spectre
fn process_data(data: []char) i32 = {
    pre {
        data_not_empty : length(data) > 0
        data_valid : is_valid(data)
    }
    // Process data
    return result
}
```

### Pattern 3: Trust for I/O Operations

```spectre
fn read_file(path: []char) option[i32]! = {
    // I/O operation - must be trusted
    if (file_exists(path)) {
        return some content
    }
    return none
}
```

## Best Practices

### Choosing Error Handling Mechanisms

1. **Use option types** for expected, recoverable errors
2. **Use contracts** for specification violations that indicate bugs
3. **Use trust markers** for operations that cannot be verified

### Writing Robust Code

1. **Validate inputs**: Use pre-conditions to validate function inputs
2. **Document guarantees**: Use post-conditions to specify behavior
3. **Handle absent values**: Use option types for potentially absent values
4. **Minimize trusted code**: Use contracts wherever possible

### Example: Comprehensive Error Handling

```spectre
val std = use("std")

// Recoverable error - use option type
fn safe_divide(a: i32, b: i32) option[i32] = {
    if (b == 0) {
        return none
    }
    return some (a / b)
}

// Specification violation - use contracts
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

// Unverifiable operation - use trust marker
fn read_input() option[i32]! = {
    // I/O operation
    return some 42
}

pub fn main() void! = {
    // Handle option type
    val result = safe_divide(10, 2)
    
    // Call with valid inputs
    val exact = divide(10, 2)
    
    // Use trust for I/O
    val input = trust read_input()
}
```

## Debugging Errors

### Contract Violations

When a contract violation occurs:

1. Check the contract label for the specific violation
2. Verify that inputs satisfy pre-conditions
3. Verify that outputs satisfy post-conditions

### Type Errors

When a type error occurs:

1. Check variable type annotations
2. Verify function return types match declarations
3. Ensure struct field types match definitions

### Mutability Errors

When a mutability error occurs:

1. Check if the variable/struct instance is marked `mut`
2. Check if struct fields are marked `mut`
3. Remember: both instance and field must be mutable

## Summary

Error handling in Spectre includes:

| Mechanism | Use Case | Behavior |
|-----------|----------|----------|
| **Option types** | Recoverable errors | Returns `some T` or `none` |
| **Pre-conditions** | Input validation | Panics on violation |
| **Post-conditions** | Output validation | Panics on violation |
| **Trust markers** | Unverifiable operations | Propagates trust requirement |
| **Type system** | Type safety | Compile-time errors |
| **Mutability rules** | State safety | Compile-time errors |

Key points:

1. Use option types for expected, recoverable errors
2. Use contracts for specification violations
3. Use trust markers for unverifiable operations
4. Leverage the type system to catch errors at compile-time
5. Handle both `some` and `none` cases for option types

For more information on testing error conditions, see the [Testing](./testing.md) documentation.
