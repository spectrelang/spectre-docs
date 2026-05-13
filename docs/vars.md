# Declaring variables

Variables are immutable by default at the time of their declaration. To mark a variable as mutable, use the `mut` keyword.

To declare a variable, simply use the `val` keyword, like so:

```spectre
pub fn main() void = {
    val x = 10
    @print("{d}", {x})
}
```

We use the variable in this program through the use of the `@print` builtin, as unused variables in Spectre are a hard compile time error.

To give a type to the variable explicitly, do the following:

```spectre
val x: i32 = 10
```

This particular example asserts to the compiler that the numerical value is a 32-bit signed integer.

Mutable values can be declared through the use of `mut`, as aforementioned:

```spectre
val x: mut i32 = 10
```

Note that `mut` is part of the type name, making it easier to pass around values with knowledge of their mutability status.

Variables that are marked as mutable and are not mutated will result in a hard compile time error.
