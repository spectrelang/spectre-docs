---
title: Type System
sidebar_label: Type System
sidebar_position: 5
---

# Type System

Spectre's type system is designed to support safety and correctness through immutability, option types, and composite types. This document covers the complete type system including primitive types, option types, and structs.

## Overview

Spectre features:

- **Primitive types**: Standard integers, floats, and booleans
- **Option types**: Safe handling of potentially absent values
- **Struct types**: Composite types with field-level mutability
- **Immutability by default**: All bindings are immutable unless explicitly marked mutable

## Primitive Types

### Integer Types

Spectre provides signed and unsigned integer types:

| Type | Description | Size |
|------|-------------|------|
| `i32` | Signed 32-bit integer | 32 bits |
| `u32` | Unsigned 32-bit integer | 32 bits |
| `usize` | Unsigned pointer-sized integer | Platform-dependent |

### Examples

```spectre
val x: i32 = 10
val y: i32 = 20
val z: i32 = 30

val unsigned: u32 = 100
val size: usize = 1000
```

### Float Types

Float types are available for floating-point arithmetic (specific float types may vary by implementation).

### Boolean Type

The `bool` type represents boolean values:

```spectre
val flag: bool = true
val should_fail: bool = false
```

### Void Type

The `void` type indicates the absence of a value, typically used for functions that do not return a result:

```spectre
fn print_message() void = {
    // No return value
}
```

## Option Types

Option types provide a safe way to handle values that may or may not be present.

### Syntax

Option types use the `option[T]` generic syntax, where `T` is the contained type:

```spectre
fn check(fail: bool) option[i32]! = {
    if (fail) {
        return some 10
    }
    return none
}
```

### Variants

Option types have two variants:

- **`some`**: Contains a value
- **`none`**: Represents the absence of a value

### Creating Option Values

```spectre
// Some value
val some_value: option[i32] = some 10

// None value
val no_value: option[i32] = none
```

### Option Return Types

Functions that may not return a value should use option types:

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

### Trust Markers with Options

Option-returning functions that perform side effects may need the trust marker:

```spectre
fn can_fail(should_fail: bool) option[i32]! = {
    if (should_fail) {
        return some 10
    }
    return none
}
```

The `!` marker indicates that the function performs operations that cannot be formally verified.

## Struct Types

Structs are composite types that group related values together.

### Defining Structs

Structs are defined using the `type` keyword:

```spectre
type Point = {
    x: mut i32
    y: mut i32
}
```

### Field Mutability

Individual struct fields can be marked as mutable or immutable:

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

### Mutable Struct Instances

To modify mutable fields, the struct instance itself must be mutable:

```spectre
// Immutable instance - no fields can be modified
val st: SomeType = {x: 30, y: 40}
st.y = 30            // Error: st is immutable

// Mutable instance - mutable fields can be modified
val st: mut SomeType = {x: 30, y: 40}
st.y = 30            // Valid: st is mutable and y is mutable
st.x = 10            // Error: x is an immutable field
```

### Two-Level Mutability

Spectre implements a two-level mutability system for structs:

1. **Instance-level mutability**: The struct instance must be mutable to allow any modifications
2. **Field-level mutability**: Individual fields must be marked mutable to be modifiable

Both conditions must be satisfied for a field to be writable:

```spectre
type SomeType = {
    x: i32           // Immutable field
    y: mut i32       // Mutable field
}

// This will error - instance is immutable
val st: SomeType = {x: 30, y: 40}
st.y = 30            // Error: st is immutable

// This will error - field is immutable
val st: mut SomeType = {x: 30, y: 40}
st.x = 10            // Error: x is an immutable field

// This is valid - both conditions satisfied
val st: mut SomeType = {x: 30, y: 40}
st.y = 30            // Valid
```

### Struct Usage in Functions

```spectre
val std = use("std")

type SomeType = {
    x: i32
    y: mut i32
}

pub fn main() void! = {
    val st: mut SomeType = {x: 30, y: 40}
    st.y = 30
    std.io.put_any("{d}", {st.y})
}
```

## Buffer Types

Buffer types represent mutable sequences of characters or bytes.

### Mutable Buffers

```spectre
val buf: mut []char = "This can change"
```

The `[]char` syntax indicates a character buffer, and the `mut` modifier allows the buffer contents to be modified.

## Type Annotations

All variable bindings in Spectre require explicit type annotations:

```spectre
val x: i32 = 10
val y: mut i32 = 20
val buf: mut []char = "data"
val opt: option[i32] = some 5
val point: Point = {x: 1, y: 2}
```

## Type Inference

Type inference is not supported in Spectre (v0.1.0). All types must be explicitly annotated.

## Type Compatibility

### Assignment Compatibility

Values can be assigned to variables of the same type:

```spectre
val x: i32 = 10
val y: i32 = x    // Valid: same type
```

### Return Type Compatibility

Function return types must match the declared return type:

```spectre
pub fn add(x: i32, y: i32) i32 = {
    return x + y    // i32 returned, matches declaration
}

pub fn main() i32 = {
    return 0
}
```

## Generic Types

Currently, the only generic type in Spectre is `option[T]`. Future versions may support additional generic types.

### Option Generic

```spectre
option[i32]     // Option containing i32
option[usize]   // Option containing usize
```

## Examples

### Complete Type Usage Example

```spectre
val std = use("std")

// Primitive types
val x: i32 = 10
val y: i32 = 20
val z: i32 = 30

// Mutable primitive
val a: mut i32 = 100

// Mutable buffer
val buf: mut []char = "This can change"

// Struct type
type Point = {
    x: mut i32
    y: mut i32
}

// Option type
fn check(fail: bool) option[i32]! = {
    if (fail) {
        return some 10
    }
    return none
}

// Usage
pub fn main() void! = {
    val p: mut Point = {x: 1, y: 2}
    p.x = 10
    p.y = 20
    
    val result: option[i32] = check(false)
    
    std.io.put_any("{d} {d}", {p.x, p.y})
}
```

### Type Safety Example

```spectre
type SomeType = {
    x: i32
    y: mut i32
}

// This demonstrates type safety with mutability
pub fn demonstrate_types() void! = {
    // Immutable instance
    val st1: SomeType = {x: 30, y: 40}
    // st1.y = 30    // Error: st1 is immutable
    
    // Mutable instance
    val st2: mut SomeType = {x: 30, y: 40}
    st2.y = 30       // Valid
    // st2.x = 10    // Error: x is immutable field
}
```

## Summary

The Spectre type system provides:

| Category | Types |
|----------|-------|
| **Integers** | `i32`, `u32`, `usize` |
| **Floats** | Platform-dependent |
| **Boolean** | `bool` |
| **Void** | `void` |
| **Options** | `option[T]` with `some` and `none` |
| **Structs** | Custom types with field-level mutability |
| **Buffers** | `[]char` for character sequences |

Key principles:

1. **Explicit typing**: All variables require type annotations
2. **Immutability by default**: Types are immutable unless marked `mut`
3. **Field-level control**: Struct fields can have individual mutability
4. **Safe option handling**: Option types prevent null-related errors
5. **Trust markers**: Unverifiable operations are marked with `!`

For more information on using types with contracts, see the [Contract System](./contract-system.md) documentation.
