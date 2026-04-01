Testing
=======

Spectre provides built-in support for unit testing through test blocks and assertions. This document covers the testing framework and best practices for writing tests.

Overview
--------

Testing in Spectre is designed to verify that functions behave correctly according to their contracts. The testing framework includes:

- **Test blocks**: Dedicated blocks for organizing tests
- **Assertions**: Statements that verify expected behavior
- **Integration with contracts**: Tests can verify contract satisfaction

Test Blocks
-----------

Test blocks are defined using the ``test`` keyword. They contain assertions that verify function behavior.

Basic Syntax
~~~~~~~~~~~~

.. code-block:: spectre

   test {
       assert condition
   }

Test Block Location
~~~~~~~~~~~~~~~~~~~

Test blocks are typically placed after function definitions:

.. code-block:: spectre

   pub fn add(x: i32, y: i32) i32 = {
       return x + y
   }

   test {
       assert add(1, 2) == 3
   }

Multiple Assertions
~~~~~~~~~~~~~~~~~~~

Test blocks can contain multiple assertions:

.. code-block:: spectre

   pub fn add(x: i32, y: i32) i32 = {
       return x + y
   }

   test {
       assert add(1, 2) == 3
       assert add(0, 0) == 0
       assert add(-1, 1) == 0
       assert add(100, 200) == 300
   }

Assertions
----------

Assertions verify that a condition is true. If an assertion fails, the test fails.

Basic Assertions
~~~~~~~~~~~~~~~~

.. code-block:: spectre

   assert expression == expected_value

Assertion Examples
~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   // Equality assertions
   assert add(1, 2) == 3
   assert result == 0
   assert value == 100

   // Comparison assertions
   assert x > 0
   assert y <= 10
   assert z != 5

   // Boolean assertions
   assert is_valid
   assert has_completed

Testing Functions with Contracts
--------------------------------

Tests can verify that functions satisfy their contracts.

Testing Pre-conditions
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   fn divide(a: i32, b: i32) i32 = {
       pre {
           not_zero : b != 0
       }
       val result = a / b
       return result
   }

   test {
       assert divide(10, 2) == 5
       assert divide(100, 10) == 10
   }

Testing Post-conditions
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   fn double(x: i32) i32 = {
       pre {
           x > 0
       }
       val result = x * 2
       post {
           result_is_double : result == x * 2
       }
       return result
   }

   test {
       assert double(5) == 10
       assert double(10) == 20
   }

Testing Option Types
--------------------

Functions that return option types can be tested for both ``some`` and ``none`` cases.

Testing Some Values
~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   fn check(fail: bool) option[i32]! = {
       if (fail) {
           return some 10
       }
       return none
   }

   test {
       // Test some case
       assert check(true) == some 10
   }

Testing None Values
~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   test {
       // Test none case
       assert check(false) == none
   }

Testing Trusted Functions
-------------------------

Functions marked with the trust marker (``!``) can be tested like regular functions.

.. code-block:: spectre

   pub fn some_other_function() void! = {
       std.io.print("This function has no contracts")
   }

   test {
       // Test that the function completes without error
       some_other_function()
   }

Testing Structs
---------------

Structs can be tested by verifying field values and mutability.

Testing Struct Creation
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   type SomeType = {
       x: i32
       y: mut i32
   }

   test {
       val st: SomeType = {x: 30, y: 40}
       // Verify field values
       // Note: Direct field access syntax may vary by implementation
   }

Testing Mutable Structs
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   type Point = {
       x: mut i32
       y: mut i32
   }

   test {
       val p: mut Point = {x: 1, y: 2}
       p.x = 10
       p.y = 20
       // Verify mutations
   }

Complete Test Example
---------------------

A complete example demonstrating various testing patterns:

.. code-block:: spectre

   val std = use("std")

   pub fn add(x: i32, y: i32) i32 = {
       return x + y
   }

   pub fn subtract(x: i32, y: i32) i32 = {
       return x - y
   }

   fn multiply(x: i32, y: i32) i32 = {
       pre {
           x > 0 && y > 0
       }
       return x * y
   }

   test {
       // Test public functions
       assert add(1, 2) == 3
       assert add(0, 0) == 0
       assert add(-1, 1) == 0

       // Test subtraction
       assert subtract(5, 3) == 2
       assert subtract(10, 10) == 0

       // Test private function with contracts
       assert multiply(2, 3) == 6
       assert multiply(10, 10) == 100
   }

Test Organization
-----------------

Grouping Related Tests
~~~~~~~~~~~~~~~~~~~~~~

Tests for the same function can be grouped together:

.. code-block:: spectre

   pub fn add(x: i32, y: i32) i32 = {
       return x + y
   }

   pub fn subtract(x: i32, y: i32) i32 = {
       return x - y
   }

   test {
       // Addition tests
       assert add(1, 2) == 3
       assert add(0, 0) == 0
       assert add(-1, 1) == 0
       assert add(100, 200) == 300
   }

   test {
       // Subtraction tests
       assert subtract(5, 3) == 2
       assert subtract(10, 10) == 0
       assert subtract(0, 5) == -5
   }

Test Files
~~~~~~~~~~

Tests can be placed in the same file as the code they test, or in separate test files:

**math.spr:**

.. code-block:: spectre

   pub fn add(x: i32, y: i32) i32 = {
       return x + y
   }

   test {
       assert add(1, 2) == 3
   }

Best Practices
--------------

Writing Effective Tests
~~~~~~~~~~~~~~~~~~~~~~~

1. **Test edge cases**: Include tests for boundary conditions
2. **Test both success and failure**: For option types, test both ``some`` and ``none``
3. **Use descriptive test organization**: Group related assertions together
4. **Test contract satisfaction**: Verify that functions meet their contracts

Test Coverage
~~~~~~~~~~~~~

1. **Cover all public functions**: Every public function should have tests
2. **Test private functions**: Private functions with contracts should be tested
3. **Test error paths**: Include tests for error conditions

Example: Comprehensive Test Suite
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: spectre

   val std = use("std")

   type Point = {
       x: mut i32
       y: mut i32
   }

   pub fn add(x: i32, y: i32) i32 = {
       return x + y
   }

   fn multiply(x: i32, y: i32) i32 = {
       pre {
           x > 0 && y > 0
       }
       return x * y
   }

   fn check(fail: bool) option[i32]! = {
       if (fail) {
           return some 10
       }
       return none
   }

   // Test basic arithmetic
   test {
       assert add(1, 2) == 3
       assert add(0, 0) == 0
       assert add(-1, 1) == 0
       assert add(100, 200) == 300
   }

   // Test multiplication with contracts
   test {
       assert multiply(2, 3) == 6
       assert multiply(10, 10) == 100
       assert multiply(1, 1) == 1
   }

   // Test option types
   test {
       assert check(true) == some 10
       assert check(false) == none
   }

Running Tests
-------------

The method for running tests depends on the Spectre toolchain. Typically, tests are run using a command such as:

::

   spectre test <file.spr>

Or for a full project:

::

   spectre test

Test Output
-----------

When tests pass, the test runner typically reports success. When tests fail, the output includes:

- The failing assertion
- The expected value
- The actual value
- The location of the failure

Integration with Contracts
--------------------------

Tests and contracts work together to ensure correctness:

1. **Contracts define behavior**: Pre-conditions and post-conditions specify what functions do
2. **Tests verify behavior**: Tests confirm that functions behave as specified
3. **Contracts catch runtime errors**: Contract violations cause panics
4. **Tests catch logic errors**: Failed assertions indicate incorrect logic

Summary
-------

Spectre's testing framework provides:

- **Test blocks**: ``test { assert condition }``
- **Assertions**: ``assert expression``
- **Contract testing**: Verify contract satisfaction
- **Option type testing**: Test ``some`` and ``none`` cases
- **Trusted function testing**: Test functions with ``!`` marker

Key points:

1. Use ``test`` blocks to organize tests
2. Use ``assert`` to verify conditions
3. Test all public functions
4. Include edge cases and error conditions
5. Verify contract satisfaction through tests

For more information on error handling in tests, see the :doc:`error-handling` documentation.
