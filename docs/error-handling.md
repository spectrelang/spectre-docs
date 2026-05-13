# Error Handling

This will essentially be a re-iteration of the "Pattern Matching" section with the `err/ok` pattern, the following pattern should be used for error handling in idiomatic Spectre code:

```spectre
pub enum SomeError = {
    DidntWork
}

pub fn some_errorable_func() result[ref u8, SomeError] = {
    return err SomeError.DidntWork
}

pub fn main() void = {
    match some_errorable_func() {
        ok v => {
            @print("Not going to happen: {s}", {v})
        }
        err e => {
            @print("Got this error: {d}", {e})
        }
    }
}
```
