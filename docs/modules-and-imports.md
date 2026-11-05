# Modules and imports

The module system is file-based: each file acts as a module. For example, a file `hello.sx` is imported from another file by binding a `use` expression to a value:

```spectre
val hello = use("hello.sx")
```

A value bound to a `use` expression at the top level that is not used is a compile-time error.

The filename `core.sx` has special significance: it provides an implicit entry point for a group of modules. For example, if a directory named `some_dir` contains a `core.sx` file, the module can be imported from another directory as follows:

```spectre
val some_mod = use("./path/to/some_dir")
```

The functions in `./path/to/some_dir/core.sx` are then accessible through `some_mod`.

The Spectre standard library uses `core.sx` to provide clean entry points to standard-library module groups. For example:

```spectre
val math = use("std/math")
```

This resolves to `<install-dir>/spectrelib/math/core.sx`.

Module imports cannot be marked as mutable, cannot have type annotations, and cannot appear in nested, non-top-level contexts.
