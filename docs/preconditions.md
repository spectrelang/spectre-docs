# Preconditions

Preconditions can be applied at the function-level only, and are constructed through the use of the `pre` keyword. If we want our precondition check to persist into release builds, we would use the `guarded` keyword prior to `pre`.

So a regular, non-release build persistent precondition would happen at runtime (or compile-time where possible):

```
fn some_function(x: i32) bool = {
    pre {
        x > 0
    }
    return true
}
```

And a release-build persistent precondition would be defined like so:


```
fn some_other_function(x: usize) void = {
    guarded pre {
        x > 20
    }
    do_some_other_thing()
}
```
