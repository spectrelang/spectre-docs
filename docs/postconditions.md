# Postconditions

A postcondition states an obligation on the function at the point at which the contract statement executes. It is introduced with the `post` keyword. To preserve the check in release builds, the `guarded` modifier is placed before `post`.

A contract statement may appear at any point in a function body. Postconditions are conventionally placed immediately before a `return` statement, because a postcondition placed after `return` is unreachable.

An ordinary postcondition is checked at runtime:

```spectre
fn some_function(x: i32) bool = {
    post {
        positive: x > 0
    }
    return true
}
```

A release-build persistent postcondition is declared as follows:

```spectre
fn some_other_function(x: usize) void = {
    guarded post {
        large_enough: x > 20
    }
    do_some_other_thing()
}
```
