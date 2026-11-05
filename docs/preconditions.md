# Preconditions

A precondition states an obligation on the caller and on the program state at the point at which the contract statement executes. It is introduced with the `pre` keyword. To preserve the check in release builds, the `guarded` modifier is placed before `pre`.

A contract statement may appear at any point in a function body. By convention, preconditions are placed at the beginning of a function.

An ordinary precondition is checked at runtime, and at compile time where possible:

```spectre
fn some_function(x: i32) bool = {
    pre {
        positive: x > 0
    }
    return true
}
```

A release-build persistent precondition is declared as follows:

```spectre
fn some_other_function(x: usize) void = {
    guarded pre {
        large_enough: x > 20
    }
    do_some_other_thing()
}
```
