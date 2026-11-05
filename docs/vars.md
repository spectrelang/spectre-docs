# Declaring variables

Variables are immutable by default at the time of their declaration. To mark a variable as mutable, use the `mut` modifier.

A variable is declared with the `val` keyword:

```spectre
val stdio = use("std/stdio")

pub fn main() void = trust {
    val x = 10
    stdio.print("{d}\n", {x})
}
```

The example uses the standard-library wrapper `stdio.print`, which delegates to the `@print` intrinsic. Unused variables are a compile-time error in Spectre.

To give a variable an explicit type:

```spectre
val x: i32 = 10
```

This example asserts to the compiler that the value is a 32-bit signed integer.

Mutable values are declared with `mut`:

```spectre
val x: mut i32 = 10
```

The `mut` modifier is part of the type, which makes the mutability of a value explicit when it is passed between functions.

A variable that is marked mutable but is never mutated is a compile-time error.
