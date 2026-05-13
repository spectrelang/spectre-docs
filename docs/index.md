---
# https://vitepress.dev/reference/default-theme-home-page
---

# Spectre 

Spectre is a simple programming language meant for safe and contract based low-level systems programming.

It allows for type-level invariants, and function-level preconditions and postconditions, it enables safety through use of immutability by default.

This documentation aims to act as a user guide for the Spectre programming language.

## Why?

There is a notable lack of contract based programming languages that enforce correctness at a low level.

The idea behind Spectre is that it enables correctness, sane data flow, and immutability by default, such that low level programming is safer, though at the same time prevents interrupting the convenience and DX of the language and its toolchain. Contracts are evaluated at compile-time where possible, however to avoid the complexity of similar systems such as Z3 (the SMT solver), and the inconveniences associated with the compiler being unable to prove some conditions are true, checks that cannot be evaluated at compile-time are automatically executed at runtime instead, though the persistence of the runtime checks in release builds depends on the use of the guarded construct.

Memory is managed manually to preserve low-level control, typically through the use of a standard library allocator (Arena, Stack) or a custom allocator.

The language compiles from high-level code to QBE IR, which then lowers to platform-specific assembly. There are also experimental LLVM and C99 backends. Notably there is a –translate-c feature that allows for C code to be translated to the equivalent Spectre code, which is useful for the migration of existing projects to Spectre.

## Getting Started

The simple hello world can be achieved via the following:

```spectre
val std = use("std")

pub fn main() i32 = {
    trust std.stdio.print("Hello, world: {d}.", {10})
    return 0
}
```

You will notice the trust keyword here. Any operation (such as IO) that has an underlying unsafe mechanism (such as the @print builtin that std.stdio.print uses), must be explicitly trusted, as it is inherently impure.

This is unless you use the safe wrappers around those functions, that use preconds, invariants, etc…, or if you use simpler functions altogether. There is no need, for example, to "trust" a simple `@puts`, since, unless there’s a severe OOM error, it won’t fail. Thus, it is marked as safe in the standard library.