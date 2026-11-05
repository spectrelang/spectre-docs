---
# https://vitepress.dev/reference/default-theme-home-page
---

<div class="spectre-hero">
  <img
    src="/icon-transparent.png"
    alt="Spectre logo"
    class="spectre-hero-logo"
  />
</div>

# Spectre

Spectre is a statically typed, design-by-contract programming language intended for ease of use and high performance in low-level systems programming.

It provides type-level invariants and function-level preconditions and postconditions, and it enables safety through immutability by default.

This documentation aims to act as a user guide for the Spectre programming language.

## Justification

The design of Spectre is motivated by the combination of correctness, explicit data flow, and immutability by default, so that low-level programming can be safer without compromising the convenience of the language and its toolchain. Contract conditions are evaluated at compile time where possible. To avoid the complexity of systems such as Z3 (the SMT solver), and the inconvenience of conditions that the compiler cannot prove, checks that cannot be evaluated at compile time are executed at runtime instead. Whether runtime checks persist in release builds depends on the use of the `guarded` modifier.

Memory is managed manually to preserve low-level control, typically through a standard-library allocator such as `Arena` or `Stack`, or through a custom allocator.

The language compiles from high-level code to QBE IR, which is then lowered to platform-specific assembly. Experimental MSVC/Clang backends are also available. The `--translate-c` feature translates C source into equivalent Spectre source, which is useful when migrating existing projects.

## Getting Started

A minimal "hello world" program is shown below:

```spectre
val stdio = use("std/stdio")

pub fn main() i32 = trust {
    stdio.print("Hello, world: {d}.\n", {10})
    return 0
}
```

The `trust` keyword appears in this example. Any operation, such as formatted output, that has an underlying unsafe mechanism, such as the `@print` intrinsic used by `stdio.print`, must be explicitly trusted. Safe wrappers that use preconditions, invariants, and similar constructs, or simpler operations, do not require this. For example, `stdio.puts` does not require `trust`, because it is marked as safe in the standard library: barring a severe allocation failure, it cannot fail.

## Foreword

These documents describe the language and its standard-library conventions. The formal specification is the normative reference for the language.
