# Type-Argument Constraints

A type-argument constraint restricts the types that may be supplied for a type parameter to those that conform to a specification.

For example, the following standard-library function from `std/crypto` constrains `A` with `allocators.Allocator`:

```spectre
/// Compute HMAC-SHA256 for the given key and data.
///
/// Returns a 32-byte String allocated with the provided allocator.
pub fn hmac_sha256[A: allocators.Allocator, T](ac: A, key: T, data: T) string.String = trust {
    val heap_out: mut string.String = hmac_sha256_heap[T](key, data)
    if heap_out == none {
        return none
    }

    val out: string.String = copy_string[A](ac, heap_out)
    string.string_free(heap_out)
    return out
}
```

An explicit type argument satisfies the constraint when the corresponding type declares conformance to the named specification. For `hmac_sha256`, the supplied type argument must implement the operations declared by `allocators.Allocator`.
