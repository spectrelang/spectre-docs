# Generics

Generic functions are those that take type arguments and engage in variant behaviour (optionally) depending on those type arguments.

For example, the following is an example of the type-argument function usage:

```spectre
pub fn swap[T](x: mut ref T, y: mut ref T) void = {
    val tmp = @deref(x)
    @deref(x) = @deref(y)
    @deref(y) = tmp
}

pub fn main() void = {
    val x: mut i32 = 1
    val y: mut i32 = 2
    swap[i32](@addr(x), @addr(y))
    trust @print("x: {d}\ny: {d}\n", {x, y})
}
```

Type arguments can also have constraints to prevent undesirably typed values to be passed as T, T2, Tn, which is covered in the "Type-Argument Constraints" section of the docs.