# Pattern Matching

Pattern matching can be done through the use of the `match` keyword followed by `some` or `none` if working on `option[T]`, otherwise you can use `ok _` and `err _` to capture the OK or error values.

Example for `option[T]`:

```spectre
val some_list = [1, 2, 3]
val x_opt = @get(some_list, 5)

match x_opt {
    some v => {
        // Not going to happen.
        // But we have to use v in this scope anyway
        // ...because otherwise we will get an unused variable error.
    }
    none => {
        @puts(
            \\ As expected, the list isn't big enough to get index 5 from it
            \\ So instead of panicking, we do this.
        )
    }
}
```

Note that `\\` is the syntax for multiline strings. Not to be confused with the comments, which are prefixed with `//`.

Same for error values, we could, for example, do the following:

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

Pattern matching also works on strings, enums, and numerical values.

For example:

```spectre
val stdio = use("std/stdio")

fn get_platform_name() ref u8 = {
    return "Linux"
}

pub fn main() void = {
    val platform = get_platform_name()

    match platform {
        "Windows" => { stdio.puts("Running on Windows") }
        "Linux"   => { stdio.puts("Running on Linux") }
        "Darwin"  => { stdio.puts("Running on macOS") }
    }
}
```
