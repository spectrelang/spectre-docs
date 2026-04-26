.. spectre documentation master file, created by
   sphinx-quickstart on Wed Apr  1 01:21:52 2026.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Spectre
=======

Spectre is a simple programming language meant for safe and contract based low-level systems programming.

It allows for type-level invariants, and function-level preconditions and postconditions, it enables safety through use of immutability by default.

This documentation aims to act as a user guide for the Spectre programming language.

----

Why?
====

There is a notable lack of contract based programming languages that enforce correctness at a low level.

The idea behind Spectre is that it enables correctness, sane data flow, and immutability by default, such that low level programming is safer, though at the same time prevents interrupting the convenience and DX of the language and its toolchain. Contracts are evaluated at compile-time where possible, however to avoid the complexity of similar systems such as Z3, and the inconveniences associated with the compiler being unable to prove some conditions are true, checks that cannot be evaluated at compile-time are automatically executed at runtime instead, though the persistence of the runtime checks in release builds depends on the use of the `guarded` construct.

Memory is managed manually to preserve low-level control, typically through the use of a standard library allocator (Arena, Stack) or a custom allocator. 

The language compiles from high-level code to QBE IR, which then lowers to platform-specific assembly. There are also experimental LLVM and C99 backends. Notably there is a `--translate-c` feature that allows for C code to be translated to the equivalent Spectre code, which is useful for the migration of existing projects to Spectre.

----

Note that the information in this guide may be out of date with the current Spectre API, as it is rapidly evolving.

----

Getting started
===============

The simple hello world can be achieved via the following:

.. code-block:: spectre

    val std = use("std")

    pub fn main() i32 = {
        trust std.stdio.print("Hello, world: {d}.", {10})
        return 0
    }

You will notice the ``trust`` keyword here. Any operation (such as IO) that has an underlying unsafe mechanism (such as the @print builtin that std.stdio.print uses), must be explicitly trusted, as it is inherently impure.

This is of course unless you use the safe wrappers around those functions, that use preconds, invariants, etc..., or if you use simpler functions altogether. There is no need, for example, to "trust" a simple print, since, unless there's a severe OOM error, it won't fail. Thus, we mark it as safe in the standard library.

If we don't want the ``trust`` keyword to appear everywhere in our code, and if you're hell-bent on writing unsafe, non-contract-reliant code, you can do so, but you must mark the function return type (which is compulsory) with ``!``.

For example:

.. code-block:: spectre

    pub fn some_function() void! = {
        val x: usize = some_unsafe_function()
        std.stdio.print("Wow, now I can omit the trust keyword. {d}", {x})
    }

Ideally ``trust`` should not appear everywhere in Spectre code, as it should be surrounded by guards and checks that reduce the density of ``trust``, if a function relies primarily on blind trust of unsafe functions, simply skimming over the function body will make this blatantly clear.

Further information on the language's spec can be found in the links below.


.. toctree::
   :maxdepth: 2
   :caption: Contents:

   core-concepts
   syntax-guide
   contract-system
   type-system
   modules-and-packages
   testing
   error-handling
   language-reference

