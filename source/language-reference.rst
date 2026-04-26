Language Reference
==================

This document provides a complete reference for the Spectre programming language syntax, keywords, and constructs.

Keywords
--------

Reserved Keywords
~~~~~~~~~~~~~~~~~

+----------+--------------------------------+
| Keyword  | Description                    |
+==========+================================+
| val      | Declare a variable binding     |
+----------+--------------------------------+
| mut      | Mark a type as mutable         |
+----------+--------------------------------+
| fn       | Declare a function             |
+----------+--------------------------------+
| type     | Declare a type definition      |
+----------+--------------------------------+
| pre      | Define pre-conditions          |
+----------+--------------------------------+
| post     | Define post-conditions         |
+----------+--------------------------------+
| return   | Return from a function         |
+----------+--------------------------------+
| if       | Conditional statement          |
+----------+--------------------------------+
| for      | Loop statement                 |
+----------+--------------------------------+
| break    | Exit a loop                    |
+----------+--------------------------------+
| test     | Define a test block            |
+----------+--------------------------------+
| assert   | Assert a condition in tests    |
+----------+--------------------------------+
| pub      | Mark an item as public         |
+----------+--------------------------------+
| use      | Import a module                |
+----------+--------------------------------+
| trust    | Manually override trust        |
|          | requirement                    |
+----------+--------------------------------+
| some     | Option type variant with value |
+----------+--------------------------------+
| none     | Option type variant without    |
|          | value                          |
+----------+--------------------------------+
| invariant| Some invariant type conditions |
+----------+--------------------------------+

Contextual Keywords
~~~~~~~~~~~~~~~~~~~

+-----------+-------------+---------------------------+
| Keyword   | Context     | Description               |
+===========+=============+===========================+
| option    | Type system | Generic option type       |
+-----------+-------------+---------------------------+
| void      | Type system | Absence of a value        |
+-----------+-------------+---------------------------+
| void!     | Type system | Trusted void return       |
+-----------+-------------+---------------------------+

Syntax Reference
----------------

Variable Declarations
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   // Immutable variable
   val identifier: Type = expression

   // Mutable variable
   val identifier: mut Type = expression

   // Mutable buffer
   val identifier: mut []char = expression

Function Definitions
~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   // Basic function
   fn identifier(parameter: Type) ReturnType = {
       // Body
   }

   // Function with multiple parameters
   fn identifier(param1: Type1, param2: Type2) ReturnType = {
       // Body
   }

   // Public function
   pub fn identifier(parameter: Type) ReturnType = {
       // Body
   }

   // Trusted function
   fn identifier(parameter: Type) ReturnType! = {
       // Body
   }

   // Function with contracts
   fn identifier(parameter: Type) ReturnType = {
       pre {
           label : condition
       }
       // Body
       post {
           label : condition
       }
       return expression
   }

Type Definitions
~~~~~~~~~~~~~~~~

.. code-block:: spectre

   // Struct type
   type Identifier = {
       field: Type
   }

   // Struct with mutable fields
   type Identifier = {
       field1: Type
       field2: mut Type
   }

Contract Blocks
~~~~~~~~~~~~~~~

.. code-block:: spectre

   // Pre-conditions
   pre {
       label : boolean_expression
       boolean_expression
   }

   // Post-conditions
   post {
       label : boolean_expression
       boolean_expression
   }

Control Flow
~~~~~~~~~~~~

.. code-block:: spectre

   // If statement
   if (condition) {
       // Body
   }

   // For loop
   for {
       // Body
       break
   }

   // Return statement
   return expression

Module Imports
~~~~~~~~~~~~~~

.. code-block:: spectre

   // Import standard library
   val identifier = use("std")

   // Import specific file
   val identifier = use("filename.sx")

Test Blocks
~~~~~~~~~~~

.. code-block:: spectre

   test {
       assert condition
       assert expression == expected
   }

Trust Override
~~~~~~~~~~~~~~

.. code-block:: spectre

   trust function_call()

Type Reference
--------------

Primitive Types
~~~~~~~~~~~~~~~

+-------+-----------------------------+------------------------+
| Type  | Description                 | Example                |
+=======+=============================+========================+
| i32   | Signed 32-bit integer       | ``val x: i32 = 10``    |
+-------+-----------------------------+------------------------+
| u32   | Unsigned 32-bit integer     | ``val x: u32 = 10``    |
+-------+-----------------------------+------------------------+
| usize | Unsigned pointer-sized      | ``val x: usize = 10``  |
|       | integer                     |                        |
+-------+-----------------------------+------------------------+
| bool  | Boolean type                | ``val x: bool = true`` |
+-------+-----------------------------+------------------------+
| void  | Absence of value            | ``fn f() void``        |
+-------+-----------------------------+------------------------+

Generic Types
~~~~~~~~~~~~~

+-------------+-------------------------+------------------------+
| Type        | Description             | Example                |
+=============+=========================+========================+
| option[T]   | Optional value of type T| ``option[i32]``        |
+-------------+-------------------------+------------------------+

Composite Types
~~~~~~~~~~~~~~~

+-------------+-------------------------+------------------------+
| Type        | Description             | Example                |
+=============+=========================+========================+
| []T         | Buffer                  | ``val x: mut []char =  |
|             |                         | "text"``               |
+-------------+-------------------------+------------------------+
| { fields }  | Struct type             | ``type T = { x: i32 }``|
+-------------+-------------------------+------------------------+

Trust Markers
~~~~~~~~~~~~~

+-------+-----------------------------+------------------------+
| Marker| Description                 | Example                |
+=======+=============================+========================+
| !     | Trusted (unverified) return | ``fn f() void!``       |
+-------+-----------------------------+------------------------+

Expression Reference
--------------------

Arithmetic Expressions
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   x + y      // Addition
   x - y      // Subtraction
   x * y      // Multiplication
   x / y      // Division

Comparison Expressions
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   x == y     // Equality
   x != y     // Inequality
   x < y      // Less than
   x <= y     // Less than or equal
   x > y      // Greater than
   x >= y     // Greater than or equal

Logical Expressions
~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   x && y     // Logical AND
   x || y     // Logical OR
   !x         // Logical NOT (if supported)

Option Expressions
~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   some value    // Create some variant
   none          // Create none variant

Statement Reference
-------------------

Variable Binding Statement
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   val identifier: Type = expression

Assignment Statement
~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   identifier = expression    // For mutable variables

Field Assignment Statement
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   instance.field = expression    // For mutable struct fields

Expression Statement
~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   expression    // Expression as statement

Complete Grammar Summary
------------------------

Program Structure
~~~~~~~~~~~~~~~~~

::

   program     ::= import* type_def* function_def* test_def*
   import      ::= "val" identifier "=" "use" "(" string ")" ";"
   type_def    ::= "type" identifier "=" "{" field* "}" ";"
   field       ::= identifier ":" "mut"? type "\n"
   function_def ::= "pub"? "fn" identifier "(" params? ")" type "!"? "=" "{" body "}"
   test_def    ::= "test" "{" assert_stmt* "}"

Function Body
~~~~~~~~~~~~~

::

   body        ::= pre_block? val_stmt* post_block? stmt*
   pre_block   ::= "pre" "{" condition* "}"
   post_block  ::= "post" "{" condition* "}"
   condition   ::= identifier ":" boolean_expr | boolean_expr

Statements
~~~~~~~~~~

::

   stmt        ::= val_stmt | assign_stmt | if_stmt | for_stmt | return_stmt | expr_stmt
   val_stmt    ::= "val" identifier ":" "mut"? type "=" expression ";"
   assign_stmt ::= identifier "=" expression ";"
   if_stmt     ::= "if" "(" expression ")" "{" stmt* "}"
   for_stmt    ::= "for" "{" stmt* "}"
   return_stmt ::= "return" expression ";"
   expr_stmt   ::= expression ";"

Expressions
~~~~~~~~~~~

::

   expression  ::= logical_expr
   logical_expr ::= comparison_expr (("&&" | "||") comparison_expr)*
   comparison_expr ::= additive_expr (("==" | "!=" | "<" | "<=" | ">" | ">=") additive_expr)*
   additive_expr ::= multiplicative_expr (("+" | "-") multiplicative_expr)*
   multiplicative_expr ::= unary_expr (("*" | "/") unary_expr)*
   unary_expr  ::= primary_expr | "!" unary_expr
   primary_expr ::= identifier | literal | "(" expression ")" | "some" expression | "none"

Literals
~~~~~~~~

::

   literal     ::= integer_literal | string_literal | bool_literal
   integer_literal ::= digit+
   string_literal ::= '"' char* '"'
   bool_literal ::= "true" | "false"

Standard Library Reference
--------------------------

I/O Functions
~~~~~~~~~~~~~

+------------------------+------------------------+------------------------+
| Function               | Description            | Example                |
+========================+========================+========================+
| ``std.stdio.print(msg)``  | Print a string         | ``std.stdio.print("Hello``|
|                        |                        | ")``                   |
+------------------------+------------------------+------------------------+
| ``std.stdio.print(fmt,  | Print formatted output | ``std.stdio.print("{d}" |
| args)``                |                        | , {x})``               |
+------------------------+------------------------+------------------------+

Error Reference
---------------

Compile-Time Errors
~~~~~~~~~~~~~~~~~~~

+--------------------+------------------------+------------------------+
| Error              | Cause                  | Example                |
+====================+========================+========================+
| Type mismatch      | Incompatible types     | ``val x: i32 = "text"``|
+--------------------+------------------------+------------------------+
| Immutable          | Assigning to immutable | ``val x: i32 = 10;     |
| assignment         | variable               | x = 20``               |
+--------------------+------------------------+------------------------+
| Immutable field    | Assigning to immutable | ``st.x = 10`` where x  |
|                    | field                  | is immutable           |
+--------------------+------------------------+------------------------+
| Immutable instance | Modifying immutable    | ``st.y = 10`` where st |
|                    | struct                 | is immutable           |
+--------------------+------------------------+------------------------+

Runtime Errors
~~~~~~~~~~~~~~

+---------------------+------------------------+------------------------+
| Error               | Cause                  | Example                |
+=====================+========================+========================+
| Pre-condition       | Pre-condition evaluates| ``divide(10, 0)`` where|
| violation           | to false               | pre requires b != 0    |
+---------------------+------------------------+------------------------+
| Post-condition      | Post-condition         | Function returns value |
| violation           | evaluates to false     | not satisfying post    |
+---------------------+------------------------+------------------------+
| Division by zero    | Dividing by zero       | ``10 / 0``             |
+---------------------+------------------------+------------------------+

Quick Reference Card
--------------------

Declaring Variables
~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   val x: i32 = 10              // Immutable
   val x: mut i32 = 10          // Mutable

Defining Functions
~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   fn f(x: i32) i32 = { return x }
   fn f(x: i32) i32! = { ... }  // Trusted

Writing Contracts
~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   pre { label : x > 0 }
   post { label : result > 0 }

Using Options
~~~~~~~~~~~~~

.. code-block:: spectre

   fn f() option[i32] = { return some 10 }
   fn f() option[i32] = { return none }

Writing Tests
~~~~~~~~~~~~~

.. code-block:: spectre

   test {
       assert f(1) == 2
   }

Importing Modules
~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   val std = use("std")

Controlling Visibility
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   pub fn f() void    // Public
   fn f() void        // Private

Version Information
-------------------

**Language Version**: 0.1.0

This reference covers Spectre version 0.1.0. Future versions may include additional features and syntax.
