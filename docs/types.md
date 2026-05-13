# Declaring types

Unless types are declared as external types through the use of the `extern` keyword, their attributes are not compatible with the C ABI.

Types can be declared through the use of the `type` keyword, like so:

```spectre
type Point = {
    x: i64
    y: i64
}
```

This is a simple type with two attributes, x and y. 

It can be instantiated like so:

```spectre
pub fn main() void = {
    val x: Point = {
        x: 10
        y: 20
    }
    @print("{p}\n", {x})
}
```

The above program, when combined with the `Point` type definition, will print the memory location of the value `x`.

If we wanted the C compatible version of a "struct", we would do the following:

```spectre
extern type SomeType = {
    x: i32
    y: i64
    z: f64
}
```
___

# Types that derive from specifications

Note that types can derive from specifications, which are declared with the `spec` keyword.

A type derived from a specification might look like:

```spectre
type (SomeSpec) SomeType = {
    name: ref u8
    age: usize
}
```

Note that this type will then require all the functions defined in the abstract `SomeSpec` to be implemented for the type `SomeType`.

Thus, `SomeSpec` may look something like this:

```spectre
pub spec SomeSpec = {
    fn some_function() void
    fn some_other_function() i32
}
```

This would require the functions `some_function` and `some_other_function` to be defined for `SomeType`, since it derives from `SomeSpec`.

To define functions on types, we would use the familiar Oberon-style syntax:

```
pub fn (SomeType) some_other_function() i32 = {
    return 42 as i32
}
```