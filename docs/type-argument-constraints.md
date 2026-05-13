# Type-Argument Constraints

Type argument constraints can limit the types that are allowed to operate with some generic function to some specification.

So, for example, the following code from the standard library (`std/crypto`), will disallow any argument passed to the type parameter `A` if it does not satisfy the `Allocator` constraint:

```
/// Compute HMAC-SHA256 for the given key and data.
///
/// Returns a 32-byte String allocated with the provided allocator.
pub fn hmac_sha256[A: allocators.Allocator, T](
    ac: A, 
    key: T,
    data: T
) string.String = trust {
    val heap_out: mut string.String = hmac_sha256_heap[T](key, data)
    if heap_out == none { return none }

    val out: string.String = copy_string[A](ac, heap_out)
    string.string_free(heap_out)
    return out
}
```
