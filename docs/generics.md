# Generics

A generic function accepts one or more type arguments and may specialize its behavior on those arguments.

The following example defines a generic `swap` function:

```spectre
pub fn swap[T](x: mut ref T, y: mut ref T) void = trust {
    val tmp = @deref(x)
    @deref(x) = @deref(y)
    @deref(y) = tmp
}

pub fn main() void = trust {
    val x: mut i32 = 1
    val y: mut i32 = 2
    swap[i32](@addr(x), @addr(y))
    @print("x: {d}\ny: {d}\n", {x, y})
}
```

Type arguments are supplied explicitly at the call site, as in `swap[i32](...)`. The wildcard `_` may be used in a type-argument list to request inference from the value arguments.

Type arguments may also carry constraints that restrict the types that may be supplied. Constraints are described in the type-argument constraints section.
