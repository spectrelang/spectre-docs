---
title: Modules and Packages
sidebar_label: Modules and Packages
sidebar_position: 6
---

# Modules and Packages

Spectre provides a module system for organizing code into reusable units. This document covers module imports, visibility modifiers, and package organization.

## Module Imports

Modules are imported using the `use` statement. The `use` statement loads a module and binds it to a variable for use in the current scope.

### Basic Import Syntax

```spectre
val module_name = use("module_path")
```

### Importing the Standard Library

The standard library is imported using the `use` statement:

```spectre
val std = use("std")
```

Once imported, the standard library's functionality is accessible through the `std` binding:

```spectre
val std = use("std")

pub fn main() void! = {
    std.io.print("Hello, world.")
}
```

### Importing Specific Files

Specific source files can be imported by providing the file path:

```spectre
val some_other_module = use("some_other_module.spr")
```

### Module Binding

The module is bound to a `val` binding, which means the binding itself is immutable:

```spectre
val std = use("std")
// std = something_else    // Error: cannot reassign immutable binding
```

## Visibility Modifiers

Spectre uses the `pub` keyword to control visibility of functions and constants.

### Public Functions

Functions marked with `pub` are visible outside their module:

```spectre
pub fn main() void! = {
    // Entry point - visible to runtime
}

pub fn add(x: i32, y: i32) i32 = {
    return x + y
}
```

### Private Functions

Functions without the `pub` keyword are private to their module:

```spectre
fn helper_function() void = {
    // Only visible within this module
}

pub fn public_function() void = {
    helper_function()    // Valid: called within same module
}
```

### Public Constants

Constants can be marked as public:

```spectre
pub val some_constant = 1000
```

### Visibility Summary

| Modifier | Scope |
|----------|-------|
| `pub` | Visible outside the module |
| (none) | Private to the module |

## Module Structure

A typical Spectre module follows this structure:

```spectre
// 1. Module imports
val std = use("std")
val other_module = use("other_module.spr")

// 2. Type definitions
type Point = {
    x: mut i32
    y: mut i32
}

// 3. Private functions and constants
val private_constant = 100

fn helper_function() void = {
    // Implementation
}

// 4. Public API
pub val public_constant = 1000

pub fn some_function(some_arg: i32, some_other_arg: usize) void = {
    pre {
        is_bigger_than_ten      : some_arg > 10
        is_bigger_than_twenty   : some_other_arg > 20
    }
    
    post {
        operation_complete : true
    }
    
    // Implementation
}

pub fn main() void! = {
    some_function(15, 25)
}
```

## Standard Library

The Spectre standard library provides common functionality for I/O, data structures, and utilities.

### Importing Standard Library

```spectre
val std = use("std")
```

### Standard Library I/O

The standard library provides I/O functionality through the `io` module:

```spectre
val std = use("std")

pub fn main() void! = {
    std.io.print("Hello, world.")
    std.io.put_any("{d} {d}", {x, y})
}
```

### I/O Functions

Based on the sample code, the standard library provides:

- **`print`**: Print a string message
- **`put_any`**: Print formatted output with placeholders

```spectre
// Print a simple string
std.io.print("Hello, world.")

// Print formatted output
std.io.put_any("{d} {d}", {x, y})
```

## Cross-Module Calls

Functions from other modules can be called after importing:

```spectre
val std = use("std")
val utils = use("utils.spr")

pub fn main() void! = {
    // Call standard library function
    std.io.print("Starting...")
    
    // Call function from utils module
    utils.process_data()
}
```

## Trust and Modules

When importing modules, trust markers must be respected across module boundaries.

### Trusted Module Functions

Functions from imported modules that are marked as trusted must be handled appropriately:

```spectre
val std = use("std")

// Trusted function from standard library
pub fn main() void! = {
    std.io.print("This is trusted")
}
```

### Using Trust with Module Calls

```spectre
val std = use("std")

fn pure_function() void = {
    trust std.io.print("This is trusted now")
}
```

## Examples

### Basic Module Structure

```spectre
val std = use("std")

type Point = {
    x: mut i32
    y: mut i32
}

pub fn main() void! = {
    std.io.print("Hello, world.")
}
```

### Multi-Module Program

**main.spr:**
```spectre
val std = use("std")
val math = use("math.spr")

pub fn main() i32 = {
    val result = math.add(1, 2)
    std.io.print("Result computed")
    return 0
}
```

**math.spr:**
```spectre
pub fn add(x: i32, y: i32) i32 = {
    return x + y
}

test {
    assert add(1, 2) == 3
}
```

### Module with Contracts

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
    std.io.put_any("{d}", {trusted_function(1, 2)})
}
```

## Best Practices

### Module Organization

1. **Group related functionality**: Keep related functions and types in the same module
2. **Minimize public API**: Only expose what is necessary
3. **Use descriptive names**: Module names should reflect their purpose
4. **Document dependencies**: Clearly indicate which modules depend on others

### Import Conventions

1. **Standard library first**: Import `std` before other modules
2. **Consistent naming**: Use consistent names for common modules (e.g., `std` for standard library)
3. **Explicit paths**: Use explicit file paths for local modules

### Visibility Guidelines

1. **Default to private**: Keep functions private unless they need to be public
2. **Public API documentation**: Document all public functions and types
3. **Minimize trusted code**: Use contracts wherever possible, even in public APIs

## File Organization

Spectre source files use the `.spr` extension. A typical project structure:

```
project/
├── main.spr           # Entry point
├── utils.spr          # Utility functions
├── types.spr          # Type definitions
└── std/               # Standard library
    └── io.spr         # I/O functionality
```

## Summary

Spectre's module system provides:

- **`use` statement**: Import modules with `val name = use("path")`
- **`pub` modifier**: Control visibility of functions and constants
- **Standard library**: Access via `val std = use("std")`
- **Private by default**: Functions are private unless marked `pub`

Key points:

1. Modules are imported using `val name = use("path")`
2. The standard library is imported as `std`
3. Public items are marked with `pub`
4. Private items are only visible within their module
5. Trust markers propagate across module boundaries

For information on testing modules, see the [Testing](./testing.md) documentation.
