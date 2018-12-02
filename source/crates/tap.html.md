---
title: Tap
category: projects
---

# `Tap` — In-Place Value Inspection
{:.text-center}

- [Source Code][git]

This crate consists of a number of traits which serve to provide convenient
value-threading expressions. Essentially, the methods allow use of unchainable
methods in method chains.

The main trait is `Tap`. It implements on all `Sized` types the following
methods:

```rust
pub trait Tap: Sized {
    fn tap<F: FnOnce(&Self) -> R, R>(self, func: F) -> Self {
        func(&self);
        self
    }
    fn tap_mut<F: FnOnce(&mut Self) -> R, R>(mut self, func: F) -> Self {
        func(&mut self);
        self
    }
}
impl<T: Sized> Tap for T {}
```

This means that any expression can have a `tap` or `tap_mut` call appended to it
in order to run a borrowing function on the value of the expression. The value
is taken and then returned, so the tapping call does not cause any change in the
type of the expression at that point.

Because the tapping methods return the receiver, they can also be *pre*pended to
any method call or other expression that expected the expression in front of the
call.

Rust’s set of ownership and mutability rules also mean that values can change
mutability at each binding site, such as in the argument position of a function.
This allows `tap_mut` to be called on expressions that are otherwise bound
immutably.

Taps are adaptors between value-threading expressions (take and return self) and
borrowing methods. This allows API authors to write borrowing methods without
needing to consider or explicitly favor any specific styles of value
manipulation, and allows users to modify expressions for logging or modification
without needing to change anything about the neighboring code.

Example:

```rust
use tap::Tap;

let v: Vec<i32> = vec![5, 1, 4, 2, 3]
    .tap_mut(|v| v.sort())
    .tap(|v| println!("Vector: {:?}", v))
    .tap_mut(|v| v.reverse())
    .tap(|v| println!("Vector: {:?}", v));
```

This creates an immutable binding to a sorted, reversed, vector, and prints the
contents after the sort and after the reverse.

This removed the need to bind mutably, modify, and rebind immutably. The method
chain is also one single expression, so using the taps makes it possible to
modify an expression without creating statements and potentially requiring a
block to wrap the whole structure.

In addition to these taps, the crate also provides debug-only equivalents. Add
the suffix `_dbg` to any tap call in order to only run the tap in debug builds,
and remove it entirely from release.

For convenience, the crate *also* provides traits that are aware of the `Option`
and `Result` carrier types, and act on the interior values they contain. The
`TapOption` trait provides `tap_some`, `tap_some_mut`, and `tap_none` that run
only when the carrier is of the correct variant, and operate on the inner value
(if present). The `TapResult` trait provides `tap_ok`, `tap_err`, and the `_mut`
alternates, that run on the inner value or error only if the carrier is the
denoted variant.

These traits provide the `_dbg`-suffixed alternates as well.

In conclusion, `tap` is a powerful crate that greatly enhances the experience of
writing Rust, by providing a bridge between holding a value and running methods
on references to it.

[git]: //git.myrrlyn.net/myrrlyn/tap
