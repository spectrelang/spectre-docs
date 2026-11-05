# Error Handling

Error handling follows the `ok`/`err` pattern described in the pattern-matching section. The following pattern is idiomatic in Spectre:

```spectre
val stdio = use("std/stdio")

pub enum SomeError = {
    DidntWork
}

pub fn some_errorable_func() result[ref u8, SomeError] = {
    return err SomeError.DidntWork
}

pub fn main() void = trust {
    match some_errorable_func() {
        ok v => {
            stdio.print("Not going to happen: {s}\n", {v})
        }
        err e => {
            stdio.print("Got this error: {d}\n", {e})
        }
    }
}
```
