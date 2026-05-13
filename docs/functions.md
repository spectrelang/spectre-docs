# Declaring functions

Functions are declared through the use of the `fn` keyword. Like types and values, they can be declared as public through the use of `pub`.

The main function is a special case, in that it acts as the entry point of the program automatically. The main function must return void or a signed integer, and should not take any arguments. To read commandline arguments you would use the `@args()` builtin.

An example of a main functions that prints out the arguments, note that `@args` returns a `list[ref u8]` containing all the commandline arguments as raw strings:

```spectre
pub fn main() void = {
    val arguments = @args()
    for arg in arguments {
        @print("{s}\n", {arg})
    }
}
```

___

# Extern functions

Externs can be declared through the use of the `extern fn` construct, like so:

```spectre
pub extern (C) fn my_malloc(size: usize) = "malloc"
```

Here we're using the libc malloc as our extern example, but depending on what is linked, you can use any raw C symbol in the place of malloc in the above example.