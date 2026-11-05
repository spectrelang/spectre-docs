# Invariants

Invariants are type-level conditions. They are checked at compile time where possible and otherwise at runtime.

An invariant is declared inside a type body with the `invariant` keyword:

```spectre
pub type SomeType = {
    x: i32
    y: i32

    invariant {
        x > 10
        y > 20
    }
}
```

When the fields and the invariant are statically known, the reference implementation checks the invariant at compile time and rejects a violating construction. At runtime, invariants are checked at function return points for parameters declared directly as `mut T`, where `T` is a named type with an invariant. These runtime checks are omitted in release builds. Other mutations are not checked by the reference implementation.
