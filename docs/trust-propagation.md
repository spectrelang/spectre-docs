# Trust Propagation

Trust is propagated across function boundaries through the `trust` keyword. A function whose body is introduced with `trust` is a trusted function:

```spectre
pub fn danger_func() void = trust {
    // ...
}
```

A call to a trusted function from an untrusted context must itself be wrapped in `trust`, or must occur in a context that is already trusted. This is related to the `unsafe` concept in other languages, although it has inverse semantics and is centered on design-by-contract verification guarantees rather than on generally dangerous operations.

## Trust Blocks

Trust may be applied to a block:

```spectre
trust {
    statement_one()
    statement_two()
    if whatever {
        statement_three()
    }
}
```

## Inline Trust

Trust may also be applied to an individual expression:

```spectre
trust some_function()
trust some_other_function()
```
