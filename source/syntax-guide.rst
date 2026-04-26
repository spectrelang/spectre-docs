Syntax Guide
============

This guide provides a comprehensive overview of Spectre's syntax, covering variable declarations, function definitions, expressions, and control flow.

Variable Bindings
-----------------

All variables in Spectre are declared using the ``val`` keyword. By default, variables are immutable.

Basic Syntax
~~~~~~~~~~~~

.. code-block:: spectre

   val identifier: Type = expression

Immutable Variables
~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   val x: i32 = 10
   val y: i32 = 20
   val z: i32 = 30

Once assigned, immutable variables cannot be reassigned.

Mutable Variables
~~~~~~~~~~~~~~~~~

To create a mutable variable, add the ``mut`` modifier at the type level:

.. code-block:: spectre

   val x: mut i32 = 10
   x = 20    // Valid reassignment

Mutable Buffers
~~~~~~~~~~~~~~~

For mutable string or buffer types:

.. code-block:: spectre

   val buf: mut []char = "This can change"

Type Inference
~~~~~~~~~~~~~~

Type annotations are required for all variable declarations in Spectre.

Function Definitions
--------------------

Functions are defined using the ``fn`` keyword with an assignment-style syntax.

Basic Syntax
~~~~~~~~~~~~

.. code-block:: spectre

   fn function_name(parameter: Type) ReturnType = {
       // Function body
   }

Function Parameters
~~~~~~~~~~~~~~~~~~~

Multiple parameters are separated by commas:

.. code-block:: spectre

   fn some_function(some_arg: i32, some_other_arg: usize) void = {
       // Body
   }

Return Types
~~~~~~~~~~~~

Functions can return various types:

.. code-block:: spectre

   // Void return
   fn print_message() void = {
       // No return value
   }

   // Primitive return
   fn add(x: i32, y: i32) i32 = {
       return x + y
   }

   // Trusted return (unverified)
   fn io_operation() void! = {
       // Performs I/O
   }

   // Option return
   fn check(fail: bool) option[i32]! = {
       if (fail) {
           return some 10
       }
       return none
   }

Functions with Contracts
~~~~~~~~~~~~~~~~~~~~~~~~

Functions can include pre-conditions and post-conditions:

.. code-block:: spectre

   fn divide(a: i32, b: i32) i32 = {
       pre {
           not_zero : b != 0
       }
       val result = a / b
       post {
           is_scaled : result <= a
       }
       return result
   }

Public Functions
~~~~~~~~~~~~~~~~

Functions can be marked as public using the ``pub`` keyword:

.. code-block:: spectre

   pub fn main() void! = {
       // Entry point
   }

   pub fn add(x: i32, y: i32) i32 = {
       return x + y
   }

Struct Definitions
------------------

Structs are defined using the ``type`` keyword.

Basic Syntax
~~~~~~~~~~~~

.. code-block:: spectre

   type StructName = {
       field_name: Type
   }

Struct with Multiple Fields
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   type Point = {
       x: mut i32
       y: mut i32
   }

Mixed Mutability
~~~~~~~~~~~~~~~~

Fields can have different mutability:

.. code-block:: spectre

   type SomeType = {
       x: i32           // Immutable field
       y: mut i32       // Mutable field
   }

Struct Instantiation
~~~~~~~~~~~~~~~~~~~~

Structs are instantiated using brace syntax:

.. code-block:: spectre

   val st: SomeType = {x: 30, y: 40}

For mutable struct instances:

.. code-block:: spectre

   val st: mut SomeType = {x: 30, y: 40}
   st.y = 30    // Valid: st is mutable and y is mutable

Module Imports
--------------

Modules are imported using the ``use`` statement.

Basic Import
~~~~~~~~~~~~

.. code-block:: spectre

   val std = use("std")

Importing Specific Files
~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   val some_other_module = use("some_other_module.sx")

Expressions
-----------

Arithmetic Expressions
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   val result = x + y
   val difference = a - b
   val product = x * y
   val quotient = a / b

Comparison Expressions
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   val is_greater = x > 10
   val is_equal = a == b
   val is_not_zero = b != 0

Logical Expressions
~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   val both_true = x > 0 && y > 0
   val either_true = a > 0 || b > 0

Complex Expressions
~~~~~~~~~~~~~~~~~~~

Contract conditions can contain complex expressions:

.. code-block:: spectre

   pre {
       is_above_zero : x > 0 && y > 0
   }

   post {
       x < 100 && y < 100
   }

Control Flow
------------

If Statements
~~~~~~~~~~~~~

.. code-block:: spectre

   fn check(fail: bool) option[i32]! = {
       if (fail) {
           return some 10
       }
       return none
   }

For Loops
~~~~~~~~~

.. code-block:: spectre

   for {
       std.io.print("its cool")
       break
   }

Return Statements
~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   pub fn main() i32 = {
       return 0
   }

   pub fn add(x: i32, y: i32) i32 = {
       return x + y
   }

Test Blocks
-----------

Test blocks are used for unit testing:

.. code-block:: spectre

   pub fn add(x: i32, y: i32) i32 = {
       return x + y
   }

   test {
       assert add(1, 2) == 3
   }

Constants
---------

Public constants are declared using ``pub val``:

.. code-block:: spectre

   pub val some_constant = 1000

Comments
--------

Single-line comments use double slashes:

.. code-block:: spectre

   val x: i32 = 10    // This is a comment
   val y: i32 = 20    // Neither can this...
   val z: i32 = 30    // Or this.

Complete Example
----------------

A complete Spectre program combining multiple syntax elements:

.. code-block:: spectre

   val std = use("std")

   type Point = {
       x: mut i32
       y: mut i32
   }

   fn some_function(some_arg: i32, some_other_arg: usize) void = {
       pre {
           is_bigger_than_ten      : some_arg > 10
           is_bigger_than_twenty   : some_other_arg > 20
       }

       val x: i32 = 10
       val y: i32 = 20
       val z: i32 = 30
       val a: mut []char = "This can change"

       post {
           x_is_ten : x == 10
           y_is_twe : y == 20
           z_is_thi : z == 30
       }

       std.io.put_any("{d} {d}", {x, y})
   }

   pub val some_constant = 1000

   fn pure_function() void = {
       trust std.io.print("This is trusted now")
   }

   fn can_fail(should_fail: bool) option[i32]! = {
       if (should_fail) {
           return some 10
       }
       return none
   }

   pub fn some_other_function() void! = {
       std.io.print("This function has no contracts")
   }

Syntax Summary
--------------

+---------------+--------------------------------+
| Construct     | Syntax                         |
+===============+================================+
| Variable      | ``val name: Type = expression``|
+---------------+--------------------------------+
| Mutable       | ``val name: mut Type =         |
| Variable      | expression``                   |
+---------------+--------------------------------+
| Function      | ``fn name(params) ReturnType = |
|               | { body }``                     |
+---------------+--------------------------------+
| Public        | ``pub fn name(params)          |
| Function      | ReturnType = { body }``        |
+---------------+--------------------------------+
| Trusted       | ``fn name(params) ReturnType!  |
| Function      | = { body }``                   |
+---------------+--------------------------------+
| Struct        | ``type Name = { fields }``     |
+---------------+--------------------------------+
| Import        | ``val name = use("module")``   |
+---------------+--------------------------------+
| Pre-condition | ``pre { label : condition }``  |
+---------------+--------------------------------+
| Post-condition| ``post { label : condition }`` |
+---------------+--------------------------------+
| If Statement  | ``if (condition) { body }``    |
+---------------+--------------------------------+
| For Loop      | ``for { body }``               |
+---------------+--------------------------------+
| Return        | ``return expression``          |
+---------------+--------------------------------+
| Test Block    | ``test { assert condition }``  |
+---------------+--------------------------------+
| Constant      | ``pub val name = expression``  |
+---------------+--------------------------------+

This syntax guide covers the fundamental constructs of Spectre. For more detailed information on specific features, refer to the dedicated sections on :doc:`contract-system` and :doc:`type-system`.
