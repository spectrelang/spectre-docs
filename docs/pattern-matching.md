# Pattern Matching

Pattern matching is performed with the `match` keyword. An `option[T]` is matched with `some` and `none`; a `result[T, E]` is matched with `ok` and `err`.

Example for `option[T]`:

```spectre
val some_list = [1, 2, 3]
val x_opt = @get(some_list, 5)

match x_opt {
    some _ => {
        // Not reached.
    }
    none => {
        @puts(
            \\ As expected, the list is not large enough to contain index 5.
            \\ Instead of panicking, this branch handles the case explicitly.
        )
    }
}
```

The `\\` syntax denotes a multiline string literal, not a comment. Comments begin with `//`.

The following example handles a `result` value:

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

Pattern matching also applies to strings, enumerations, and numerical values:

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
