# Postconditions

Postconditions are some conditions that are checked after the main function-body.

They can be applied at the function-level only, and are constructed through the use of the `post` keyword. If we want our postcondition check to persist into release builds, we would use the `guarded` keyword prior to `post`.

So a regular, non-release build persistent postcondition would happen at runtime only:

```
fn some_function(x: i32) bool = {
    post {
        x > 0
    }
    return true
}
```

And a release-build persistent postcondsition would be defined like so:


```
fn some_other_function(x: usize) void = {
    guarded post {
        x > 20
    }
    do_some_other_thing()
}
```
