Type System 
======================

This document expands on Spectre's type system: additional primitive types, tagged unions and enums, type-level invariants, pointer and raw memory types, and practical guidance for using these features safely.

Overview
--------

Key features covered here:

- A broader set of primitive types (integers, floats, bool, char/pointer types)
- Compound types: arrays, lists, buffers, structs
- Sum types: tagged unions and enums, with constructors and destructuring
- Option and result for safe absence/error handling
- Two-level mutability (instance and field)
- Type-level invariants: `invariant` blocks attached to `type` declarations
- Trust markers (`!`) for unverifiable or externally-defined operations

Primitive types
--------------------------

Integers
~~~~~~~~

Spectre supports a range of integer types (choose appropriate size explicitly):

- Signed: `i8`, `i16`, `i32`, `i64`, `i128`
- Unsigned: `u8`, `u16`, `u32`, `u64`, `u128`
- Pointer-sized: `isize`, `usize` (platform-dependent)

Examples:

.. code-block:: spectre

   val a: i8   = 1
   val b: i64  = 1_000_000
   val p: usize = 16

Floating point
~~~~~~~~~~~~~~

- `f32` and `f64` are the floating point types. Use explicit casts with `as` when mixing integer and float arithmetic.

Character and string pointers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- `ref char` — pointer to a NUL-terminated character buffer (C-style string)
- `[N]char` — fixed-size character array
- `[]char` or `list[ref char]` — variable-length buffers and lists

Pointer and raw memory
~~~~~~~~~~~~~~~~~~~~~~

- `ref T` — typed pointer to `T`
- `ref void` — raw memory pointer
- Use primitives like `@alloc`, `@realloc`, `@free`, `@addr`, `@deref` carefully — these are often untrusted and require `!` on functions that call them.

Buffers and arrays
~~~~~~~~~~~~~~~~~~

- Fixed arrays: `[N]T` (e.g., `[256]char`)
- Lists: `list[T]` (growable, runtime-managed)

Option and result types
-----------------------

- `option[T]` — `some <T>` or `none`
- `result[O, E]` — `ok <O>` or `err <E>`
- Use `?` for convenient propagation of `result`/`option` failures (desugars to a `match` that returns early on `err`/`none`).

Tagged unions (sum types) and enums
----------------------------------

Two related constructs:

- `union` — tagged union where each variant may carry associated data
- `enum`  — simple discriminant-only variants (no payload)

Union example:

.. code-block:: spectre

   union SomeUnion = {
       Int32(i32)
     | Int64(i64)
     | ChrPtr(ref char)
     | Str(String)
     | Pair(i32, i32)
   }

Constructors and matching:

.. code-block:: spectre

   val u: SomeUnion = Pair(5, 10)

   match u {
       Int32 a => { /* a : i32 */ }
       Int64 _ => { /* discard payload */ }
       ChrPtr ptr => { /* ptr : ref char */ }
       Str s => { /* s : String */ }
       Pair x, y => { /* destructure pair */ }
       else => { /* fallback */ }
   }

Notes:

- Use `else` as a catch-all for unmatched variants.
- Use `_` to ignore a variant's payload when the value isn't needed.
- Destructuring supports binding multiple payload elements (e.g., `Pair a, b`).

Enums example:

.. code-block:: spectre

   enum SomeEnum = {
       HELLO,
       WORLD
   }

   stdio.print("{d}", {SomeEnum.HELLO})

Type-level invariants
---------------------

Types can declare invariants which are boolean expressions that must hold for instances of the type.

Syntax:

.. code-block:: spectre

   pub type Token = {
       kind: mut TokenKind
       line: mut i64
       col:  mut i64
   } invariant {
       line > 10
       col > 10
   }

Semantics and guidance:

- The compiler will perform static checks when values are compile-time known (literal initializers). Such violations are compile-time errors.
- When static checking is not possible, the compiler may emit runtime checks (typically enabled in debug builds) to validate invariants on construction and after mutations if the implementation chooses to do so.
- Invariants are intended to express lightweight, easily-evaluated constraints (e.g., size, non-null, range checks). Avoid heavy computations in invariants.
- Mutating fields that break an invariant will either be rejected at compile time (if provable) or may trigger a runtime assert/abort in checked builds.

Example (creating and mutating tokens):

.. code-block:: spectre

   pub fn mutate_token(t: mut Token) void = {
       @printf("{d}\n", {t.line})
       t.line = t.line - 20
       // If this leaves the invariant false, a runtime check may fail in debug builds.
   }

Pattern matching and destructuring
---------------------------------

Pattern matching is the primary way to work with `union`, `option`, and `result` types. It supports:

- Matching constructors and binding payloads
- Using `_` to discard values
- `else` to match any remaining cases

Example:

.. code-block:: spectre

   match maybe_val {
       some v => { /* v : T */ }
       none   => { /* absent */ }
   }

Other common types and constructs
---------------------------------

- Function types: `fn(T1, T2) R`
- Extern functions: `extern (C) fn foo(...) R! = "foo"` — extern functions are considered untrusted (return type often suffixed with `!`).
- Method receivers: `fn (Type) method(self, ...) R` — define methods on types
- Tests: `test { ... }` blocks for inline tests

Examples and idioms (quick reference)
------------------------------------

Destructuring a union and ignoring unused bindings:

.. code-block:: spectre

   match u {
       Int32 a => { stdio.print("{d}\n", {a}) }
       Int64 _ => { stdio.puts("big int") }
       else => { stdio.puts("other") }
   }

Working with `option` and `result`:

.. code-block:: spectre

   val r = add_two_strings("123", "456")
   match r {
       ok v => { stdio.print("sum = {d}", {v}) }
       err e => { /* handle error */ }
   }

Pointers and raw memory (careful — often untrusted):

.. code-block:: spectre

   fn make_buffer(size: usize) ref void! = {
       val buf: ref void = @alloc(size)
       @memset(buf, 0, size)
       return buf
   }

Best practices
--------------

- Prefer explicit typing and small, fast invariants.
- Use `option`/`result` instead of `null` or ad-hoc error codes.
- Keep mutable state localized and prefer immutable values where possible.
- Mark external/unknown operations with `!` and wrap them in a small trusted boundary.

See also
--------

- :doc:`contract-system` — pre/post/invariants and how they integrate with the language
- :doc:`language-reference` — full language reference and examples
- :doc:`syntax-guide` — syntactic details and edge cases

