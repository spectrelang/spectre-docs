# If statements

If statements have the usual form:

```spectre
if some_bool_value {
    // ...
}
```

They may also bind an option value:

```spectre
val some_opt: option[ref u8] = some "value"
if some_opt is some value {
    trust @print("Got value: {s}\n", {value})
}
```

In most cases, parentheses around the condition are optional. The same applies to `for` loop headers.

___

# For loops

A `for` loop without a header is an unconditional loop:

```spectre
for {
    @puts("will print indefinitely.")
}
```

A `for` loop with a condition in its header behaves like a C-style `while` loop:

```spectre
val x: mut i64 = 0
for x < 10 {
    x++
}
```

The C-style form consists of an initialization, a condition, and a post clause:

```spectre
for i = 0, i < 10, i++ {
    trust @print("{d}\n", {i})
}
```

The three clauses are separated by commas. Semicolons are not part of the language grammar. The loop variable is declared implicitly, so no preceding `val` declaration is required.
