# Trust Propagation

Trust is propagated across functions through the use of the `trust` keyword. So for example, if a function is marked with `trust` at the definition/top-level, like so:

```spectre
pub fn danger_func() void = trust {
    // ...
}
```

Then this function must be explicitly `trust`ed at each of its callsite, or be called from a trusted context. This is somewhat akin to the "unsafe" concept from other languages, however it adopts the inverse semantics and revolves around the DbC verification guarantees rather than generally-dangerous functions.

## Trust Blocks

Trust can be applied in blocks, for example:

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

Trust can be applied inline, too. For example:

```spectre
trust some_function()
trust some_other_function()
```