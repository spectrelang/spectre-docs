# Invariants

Invariants can only be applied at the type-level, and they are checked at compile-time where possible, otherwise they are checked at runtime.

An example of a type-level invariant:

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

If it can be checked at compile time and the type has breached/violated the invariant, then it will raise a compile time error. Otherwise, it will be a runtime error at the point of violation.
