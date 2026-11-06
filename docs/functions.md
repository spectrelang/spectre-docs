# Declaring functions

Functions are declared with the `fn` keyword. Like types and values, they may be declared public with `pub`.

The `main` function is the program entry point. It shall return `void` or a signed integer type, and it shall not declare parameters. Command-line arguments are obtained through the allocator-aware `@argsalloc[A](ac)` intrinsic.

The following `main` function prints its command-line arguments. `@argsalloc` returns a `result[list[ref u8], E]` containing the arguments as raw strings; the list is released with `@listfree`.

```spectre
val allocators = use("std/allocators")
val stdio = use("std/stdio")

pub fn main() void = {
    val ac: allocators.HeapAllocator = @zeroed
    val arguments: list[ref u8] = @argsalloc[allocators.HeapAllocator](ac)?
    defer {
        @listfree(arguments)
    }
    for arg in arguments {
        stdio.puts(arg)
    }
}
```

The reference implementation also retains the non-allocator `@args()` form for compatibility, but new code should use `@argsalloc`.

___

# Inline functions

The `inline` modifier asks the compiler to expand a function at its call sites.
It may be combined with `trust` when the body also needs a trusted context:

```spectre
fn mix(a: i64, b: i64, c: i64) i64 = inline {
    return (a * 31 + b * 17 - c * 13) ^ ((a + b) << 3)
}

fn peek(ptr: ref u8) u8 = inline trust {
    return @load8(ptr) as u8
}
```

The modifier is a performance hint; it never changes the observable behaviour of
the program. Both the QBE backend and the C backend accept it, and calls to
simple inline functions are expanded even in the QBE path.

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
