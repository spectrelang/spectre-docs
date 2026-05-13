# Specifications

These are defined with the `spec` keyword and define some interface for the purposes of static dispatch. Specifications defined with `spec` result in NO runtime overhead.

Example definition of a specification:

```spectre
spec SomeSpec = {
    pub fn some_user_facing_function() option[ref u8]
    fn some_function() void
    fn some_other_function(x: usize) i32
}
```

A type can derive from a specification through the use of the Oberon-style syntax previously described in the "Types" section of the documentation.

To re-iterate the example:

```spectre
type (SomeSpec) SomeType = {
    name: ref u8
    age: usize
}
```
