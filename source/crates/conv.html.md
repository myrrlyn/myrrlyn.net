---
title: Conv
category: projects
---

# `Conv` — Directed Type Conversion
{:.text-center}

- [Source Code][git]

This crate provides a companion trait to [`From`] that allows you to call the
conversion method in the middle of an expression.

This code does not compile:

```rust
let s: String = "static".into().clone();
```

Even though `Clone` has the signature `fn clone(&self) -> Self`, and the output
type of the `.clone()` call is known, the compiler’s type resolver is incapable
of finding a unique solution for `Into<T>`. This problem is amplified in
non-trivial expressions.

The `Conv` trait permits that expression to compile:

```rust
let s = "static".conv::<String>().clone();
```

## What Is It

The entire crate is this code:

```rust
pub trait Conv: Sized {
  fn conv<T: Sized + From<Self>>(self) -> T {
    <T as From<Self>>::from(self)
  }
}
impl<T: Sized> Conv for T {}
```

That’s it. It is equivalent in simplicity to the `Into` definition:

```rust
pub trait Into<T: Sized>: Sized {
  fn into(self) -> T;
}
impl<T: Sized, U: Sized + From<T>> Into<U> for T {
  fn into(self) -> U {
    <U as From<T>>::from(self)
  }
}
```

## How To Use It

1. Depend on this crate in your `Cargo.toml`:

  ```toml
  [dependencies.conv]
  git = "https://git.myrrlyn.net/myrrlyn/conv.git
  version = "1"
  ```

2. Import the trait:

  ```rust
  extern crate conv; // not for much longer!

  use conv::Conv;
  ```

3. Write `impl From<Source> for Destination {}` blocks.

4. Call `.conv::<Destination>()` on `Source` values!

## When Is It Useful

`Conv` is the only conversion trait that can be called as a method in
non-trailing position in an expression.

## When Is It Not Useful

`Conv` cannot be used as a trait bound. `T: Into<U>` is the correct trait bound
for calling single conversions generically.

## Generic Usage

The trait bound `T: From<U>` allows calling `.conv::<T>()` on instances of `U`.

## `#![no_std]` Usage

By default, this crate uses the standard library. `#![no_std]` projects can
disable this by turning off defalut features. The standard library can be
re-added by enabling the `std` feature.

```toml
# Cargo.toml

[dependencies.conv]
default-features = false

[features]
std = [
  "conv/std",
]
```

[`From`]: https://doc.rust-lang.org/std/convert/trait.From.html
[`Into`]: https://doc.rust-lang.org/std/convert/trait.Into.html

[git]: https://git.myrrlyn.net/myrrlyn/conv
