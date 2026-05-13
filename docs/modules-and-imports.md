# Modules and imports

There is no complex module system. Instead, files act as modules. So for example, if we have a file `hello.sx`, we would simply import it from another file using a `use` directive bound to some `val`:

```spectre
val hello = use("hello.sx")
```

Note that values bound to use directives at the top-level that are *not* used is a compile-time error.

There is a magic filename for libraries, namely `core.sx`, that allows us to have an implicit entry point for some group of modules. So for example, if we had a file `core.sx` in a directory named `some_dir`, we could simply do, from another directory:

```spectre
val some_mod = use("./path/to/some_dir")
```

And this would allow us to access the functions available in `./path/to/some_dir/core.sx`.

`core.sx` is leveraged in the Spectre standard library to allow for clean entry points to standard library module-groups. So for example:

```spectre
val math = use("std/math")
```

Will point to `<install-dir>/spectrelib/math/core.sx`.

Module imports cannot be marked as mutable, cannot have type annotations, and cannot be used in nested (non-top-level) contexts.
