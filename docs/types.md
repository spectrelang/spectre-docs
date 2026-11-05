# Declaring types

Unless a type is declared as an external type through the `extern` keyword, its layout is not compatible with the C ABI.

Types are declared with the `type` keyword:

```spectre
type Point = {
    x: i64
    y: i64
}
```

This declares a type with two fields, `x` and `y`.

A value of the type can be constructed as follows:

```spectre
val stdio = use("std/stdio")

type Point = {
    x: i64
    y: i64
}

pub fn main() void = trust {
    val point: Point = Point{x: 10, y: 20}
    stdio.print("x = {d}, y = {d}\n", {point.x, point.y})
}
```

If a C-compatible struct is required, the type can be declared as an external type:

```spectre
extern type SomeType = {
    x: i32
    y: i64
    z: f64
}
```

___

# Types that conform to specifications

A type may conform to a specification, which is declared with the `spec` keyword.

A type that conforms to a specification is written as follows:

```spectre
type (SomeSpec) SomeType = {
    name: ref u8
    age: usize
}
```

The type is then required to implement every function declared in `SomeSpec`. A specification may be declared as follows:

```spectre
pub spec SomeSpec = {
    fn some_function() void
    fn some_other_function() i32
}
```

This requires the functions `some_function` and `some_other_function` to be defined for `SomeType`, because `SomeType` conforms to `SomeSpec`.

Functions are defined on types with the Oberon-style receiver syntax:

```spectre
pub fn (SomeType) some_other_function() i32 = {
    return 42 as i32
}
```
