# Assertions

Assertions are runtime checks that are independent of contract annotations. The `assert` statement evaluates a boolean expression and terminates the program if the result is false. Assertions are checked in every build mode, including release builds.

For example:

```spectre
assert 1 + 1 == 2
```

More complex expressions may also follow the `assert` keyword. Parentheses around the condition are optional.
