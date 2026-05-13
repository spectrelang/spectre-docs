# If statements

If statements work in Spectre as they would in any other language.

```spectre
if some_bool_value {
    // do some thing
}
```

If statements can also work on option types, for example:

```spectre
if some_opt is some v {
    @print("Got value: {s}", {v})    
}
```

In most cases, parenthesis are optional around the if condition. The same is true for `for` loops.

___

# For loops

A for loop without a body means an infinite loop:

```spectre
for {
    @puts("will print infinitely.")
}
```

A for loop with some condition in its body will act like a C-style while loop:

```spectre
val x: mut i64 = 0
for x < 10 {
    x++
}
```

And finally, the classic for loop is the only place for `;` in the language, otherwise `;` is not part of the language grammar at all:

```spectre
for i = 0; i < 10; i++ {
    @print("{d}\n", {i})
}
```

There is 100% no need to declare `i` with `val` prior to this, the for loop implicitly declares the iterated-over local.

