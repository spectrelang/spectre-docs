# Specifications

A specification declares an interface for static dispatch. It is introduced with the `spec` keyword and imposes no runtime overhead.

Example definition of a specification:

```spectre
spec SomeSpec = {
    pub fn some_user_facing_function() option[ref u8]
    fn some_function() void
    fn some_other_function(x: usize) i32
}
```

A type conforms to a specification through the Oberon-style syntax described in the types section:

```spectre
type (SomeSpec) SomeType = {
    name: ref u8
    age: usize
}
```
