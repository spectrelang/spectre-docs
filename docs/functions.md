# Declaring functions

Functions are declared with the `fn` keyword. Like types and values, they may be declared public with `pub`.

The `main` function is the program entry point. It shall return `void` or a signed integer type, and it shall not declare parameters. Command-line arguments are obtained through the `@args()` intrinsic.

The following `main` function prints its command-line arguments. The `@args()` intrinsic returns a `list[ref u8]` containing the arguments as raw strings:

```spectre
val stdio = use("std/stdio")

pub fn main() void = {
    val arguments = @args()
    for arg in arguments {
        stdio.puts(arg)
    }
}
```

___

# Extern functions

External functions are declared with the `extern fn` construct:

```spectre
pub extern (C) fn my_malloc(size: usize) ref void = "malloc"
```

The example uses the libc `malloc` function. Depending on the linked libraries, any raw C symbol may be used in place of `malloc`.

___

# Other considerations

The language has no closures and no nested function declarations. This restriction keeps control flow explicit and reduces complexity in the compiler.
