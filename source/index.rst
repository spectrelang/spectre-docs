.. spectre documentation master file, created by
   sphinx-quickstart on Wed Apr  1 01:21:52 2026.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Spectre
=======

Spectre is a simple programming language meant for safe and contract based low-level systems programming.

It allows for function-level invariants, preconditions and postconditions, and it enables safety through use of immutability by default.

This documentation aims to act as a user guide for the Spectre programming language.

----

Why?
====

There is a notable lack of contract based programming languages that enforce correctness at a low level.

The idea behind Spectre is that it enables correctness, sane data flow, and immutability by default, such that low level programming is safer, but not to the point of annoyance.

Memory is managed manually, typically through the use of a standard library allocator (Arena, Stack) or a custom allocator. The language compiles from high-level code to the QBE target.

----

What this guide isn't
=====================

This is not an idiomatic guide on how to write Spectre code, and given how niche the language is, there is unlikely to ever be a "standard" developed for it. Regardless, this aims to showcase the languages features and display how tasks can be achieved via the Spectre programming language.

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

You will notice the ``trust`` keyword here. Any operation (such as IO) that has an underlying unsafe mechanism (such as the printf builtin that std.stdio.print uses), must be explicitly trusted, as it is inherently impure.

This is of course unless you use the safe wrappers around those functions, that use preconds, invariants, etc..., or if you use simpler functions altogether. There is no need, for example, to "trust" a simple print, since, unless there's a severe OOM error, it won't fail. Thus, we mark it as safe in the standard library.

If we don't want the ``trust`` keyword to appear everywhere in our code, and if you're hell-bent on writing unsafe, non-contract based code, you can do so, but you must mark the function return type (which is compulsory) with ``!``

For example:

.. code-block:: spectre

    pub fn some_function() void! = {
        val x: usize = some_unsafe_function()
        std.stdio.print("Wow, now I can omit the trust keyword. {d}", {x})
    }

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

