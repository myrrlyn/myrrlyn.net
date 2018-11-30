---
title: BitVec
category: projects
---

# `BitVec`
{:.text-center}

[![Crate Version][1]{:.unset.badge}][2]

[![License][3]{:.unset.badge}][4]

[![Downloads][5]{:.unset.badge}][2]

[![Documentation][6]{:.unset.badge}][7]

- [Source Code][8]
- [Crate Page][2]

`BitVec` is a crate that allows manipulating memory at the bit level. It is an
implementation of `Vec` as if on `u1` as closely as is possible on machines that
do not provide addresses for individual bits.

I wrote this out of frustration with other bit-vector crates not providing the
freedom of expression and power that I needed to build up and tear down network
packets for my Cosmonaut project (forthcoming).

The `0.5.0` release has a nearly complete feature set, and I do not plan at this
time to expand functionality unless I find a need (or someone else does and asks
me).

# Why Would I Use This

This crate may be useful to you if you need a collection where the index is the
data – that is, you only need to check if a certain position is set or not. For
example, a list of numbers that satisfy a property can be implemented as a
`BitVec` where the index is the number you’re testing and the bit value, `true`
or `false`, states whether the number satisfies this property. The crate comes
with an example program that implements the Sieve of Eratosthenes algorithm this
way, to find primes less than a ceiling.

Another reason this crate may be useful to you is if you need to build up a
series of bytes where you have explicit control of the bit-level layout. This is
the use case for which I wrote the crate, as my Cosmonaut project requires
assembling and disassembling network packets with fine granularity and direction
control.

# Features

Allocation is separated from behavior by splitting the crate into two types,
`BitSlice` and `BitVec`. `BitSlice` is a reference to any slice of bits, and
holds all the basic functionality for getting and setting a position within the
slice, inspecting the slice contents, etc. `BitVec` owns its buffer, and defers
to `BitSlice` for most work but extends its functionality to include stack
behavior (push and pop) and more fully-fledged arithmetic.

`BitSlice` and `BitVec` have **different** behavior for the arithmetic operators
as `BitVec` has much more freedom to manipulate its memory that `BitSlice` does
not. This may come as a surprise if you are not aware of what specific type a
binding to a bit slice currently is. In particular, `&BitVec` and `&BitSlice`
are two different types (even though `BitVec` implements `Deref` to `&BitSlice`)
and will use their respective value type’s implementation sets.

## Maintenance Types

`BitSlice` and `BitVec` are generic over two traits: `Endian` and `Bits`.

The `Bits` trait is sealed, and is used to abstract over the Rust primitives
`u8`, `u16`, `u32`, and `u64`. No behavior from `Bits` is exposed outside the
crate, and it cannot be implemented by foreign types. You do need to import this
trait if you want to be generic over the storage type, but if you plan to only
have a single storage type for your `bitvec` types, then it is likely unneeded.

The `Endian` trait defines how a cursor moves through a storage element. This
trait is *not* generic over `Bits`, which means it is impossible to implement
your own cursor generic over storage that has access to information about the
storage width. `bitvec` provides `LittleEndian` and `BigEndian` marker structs,
which implement linear cursor behavior in their respective directions. If you,
for some reason, want to define a more esoteric sequencing, I will not help you.

## `BitSlice` Functionality

### Inherents

- Load and store at a position
- n-ary Boolean algebra, which can query if:
  - all bits are set high
  - at least one bit is set high
  - at least one but not all bits are high, and at least one but not all bits
    are set low
  - at least one bit is set low
  - all bits are set low
- Count how many bits are set high and low
- Count how many total bits are available
- Count how many storage elements are *full*
- Count how many bits a partial trailing element has (may be zero, in which case
  all elements are full)
- borrowing iterator
- `for_each` applies a closure to each bit in the slice, as a substitute for
  mutable iteration

### Traits

- `ToOwned` produces a `BitVec`
- Comparison:
  - `Eq` and `Ord` provide strict comparison between two `BitSlice`s of the
    exact same type
  - `PartialEq` and `PartialOrd` provide comparison between two `BitSlice`s of
    potentially different types
- `AsMut` and `AsRef` provide access to the underlying storage
- `From` builds a `&BitSlice` reference handle from a reference to `[T: Bits]`
- `Debug` and `Display` render the slice
- `Hash`
- `IntoIterator` provides an iterator that is double-ended and exact-sized
- `AddAssign` performs unsigned, 2’s-complement, addition into `self`
- `BitAndAssign`, `BitOrAssign`, `BitXorAssign`, and `Not` provide Boolean
  arithmetic into `self` (`Not` only works on mutable references)
- `Index` by bit number in the slice or by element in the slice and bit in the
  element
- `Neg` prerforms signed, 2’s-complement negation into `self` (only works on
  mutable references)
- `ShlAssign` and `ShrAssign` shift bits left and right, zero-filling the
  emptied bits.

## `BitVec` Functionality

### Inherents

- Most of the `Vec` API, including `new()`, `with_capacity()`, `capacity()`,
  `truncate()`, `clear()`, `shrink_to_fit()`, and `reserve()`
- Stack behavior with `push()` and `pop()`

All traits implemented by `BitSlice` are lofted to `BitVec`. Some traits differ
in implementation.

### Traits

- `Borrow` and `BorrowMut` downcast to `BitSlice` references
- `Clone`
- Comparison (defers to `BitSlice` implementation)
- `AsMut` and `AsRef` (defer to `BitSlice`)
- `From` builds a `BitVec` from:
  - a `BitSlice` handle
  - a slice of `bool`
  - a slice of storage elements
  - a boxed slice of storage elements
  - a `Vec` of storage elements
- `Debug` and `Display` render the vector, following the same format as
  `BitSlice`
- `Extend` concatenates an iterator of `bool` to a vector
- `FromIterator` provides `.collect()` on an iterator of `bool`
- `IntoIterator` provides the same iterator as `BitSlice`
- `Add` performs unsigned, growing, 2’s-complement arithmetic
- `AddAssign` performs `Add` in place. Differs from `BitSlice`!
- Bitwise operations `Bit{And,Or,Xor}{,Assign}` behave exactly like `BitSlice`
- `Deref` and `DerefMut` to `BitSlice` handles, for inherent inheritance
- `Drop`
- `Index` defers to `BitSlice`
- `Neg` differs from `BitSlice` in that it has no concept of a maximally
  negative number, and will always be able to negate any negative number into a
  positive number, except for `[1; usize::MAX]` which will panic.
- `Not` defers to `BitSlice`
- `{Shl,Shr}{,Assign}` grow and shrink the vector, zero-filling any bits added
- `Sub` performs signed, growing, 2’s complement arithmetic
- `SubAssign` performs `Sub` in place. `BitSlice` does not have any subtraction
  at all

# Restrictions

At this time, slices and vectors *must* point directly to an address boundary,
and do not support a partial head. I have no plans to change this, but that
means that range-based subsets are impossible. A range subset can be faked by
using an iterator to skip, take, and collect, such as:

```rust
use bitvec::*;
let src = bitvec![0, 0, 0, 1, 1, 1, 0, 0, 0];
let ones: BitVec = src.iter().skip(3).take(3).collect();
assert_eq!(ones, bitvec![1, 1, 1]);
```

It is impossible to provide `IndexMut`, as Rust requires that `IndexMut` provide
a pointer and there is no such thing as a pointer to a bit. Similarly, mutable
iteration is also impossible.

# Safety

`BitVec` achieves many things I have seen no other peer do, but the interesting
one from a safety perspective is that it uses only three words of stack space:
exactly the size of a `Vec`.

This is because `BitVec` is an opaque wrapper over `Vec` that breaks the `Vec`
invariants and imposes its own. The `Vec.len` field normally stores how many
allocated elements are considered live and in use; `BitVec` forcibly overrides
this field to store how many **bits** are live and in use. `BitVec` is therefore
forced to clobber the interior `Vec`’s `len` field on every change of the buffer
status, and to manually construct slice pointers to the buffer for raw memory
access.

The unsafety is managed in guard functions, such as

```rust
fn do_with_vec<F: Fn(&mut Vec<T>) -> R, R>(&mut self, op: F) -> R;
```

which is one of the few ways that `BitVec` is permitted to access its own `Vec`
member for manipulation. This guard function saves the `BitVec` state, restores
the `Vec` to a sane state that upholds `Vec` invariants, and permits the
argument function to mutably borrow the `Vec`. The argument function is free to
return things from operating on the `Vec`, but they *cannot* be references into
the `Vec`, because the guard function is not done with it yet.

Once the argument function returns, the guard function captures the return value
(if any), restores the `BitVec` invariants by mutating the `Vec` stack handle,
and then returns the captured return value.

This function is insufficient for calling `Vec.push`, because of complications
involved in ensuring that `do_with_vec` was able to correctly handle
manipulations of the `Vec` that changed the length of allocated memory.

A dedicated guard function,

```rust
fn push_elt(&mut self);
```

exists specifically to call `Vec.push` and uphold `BitVec` invariants around
doing so.

Lastly, a guard function

```rust
fn do_with_tail<F: Fn(&mut T) -> R, R>(&mut self, op: F) -> R;
```

provides mutable borrows to the tail element of the `Vec` for manipulation such
as by `BitVec.push` and `BitVec.pop`. This function ensures that a valid
allocated element is present to pass into the argument function, and creates a
new such element whenever the `BitVec` is at capacity.

All functions in `BitVec` eagerly `assert!` their preconditions, so that the
crate will panic in the event of memory conditions becoming inconsistent.

`BitVec` is able to hold `usize::MAX` bits, regardless of the storage element
type chosen; there is no space advantage to using `u64` over `u8`.

Lastly, the `AsRef` and `AsMut` implementations know how to query the `BitVec`
for how many `Vec` elements are live and use that to build `&[T]` and `&mut [T]`
slices for viewing the raw memory.

The slice type `BitSlice` uses manipulation of the actual slice value, and as
such has potential for staggering unsafety if misused. For this reason, it is
impossible to box `BitSlice` or put it in any pointer types other than `BitVec`.
Due to coherence rules, I would have to implement my own wrapper types around
each smart pointer type in the standard library in order to make it work
correctly. I *could* do this, but I do not plan to do so until a specific use
case for it comes up.

## Endianness

`BitVec` uses type parameters to offload the work of translating semantic
indices into bit-offsets within an element, so that the endianness order of bits
in an element is decoupled from the storage manager.

The crate only provides linear, monotonic, big- and little- endian orders by
default, but the `Endian` trait is left unsealed so that downstream crates may
implement any esoteric orders they choose.

## Utility

My experiences writing tests, examples, and documentation for this crate were
fairly positive, and I look forward to embedding it in Cosmonaut for my own
dogfooding, and welcome feedback from anyone else who finds it worthwhile.

I hope to advance to a 1.0 release before RustConf (six weeks from time of
writing).

## Education and Experimentation

Warning: A lot of rambling.

Writing this crate has been very beneficial to my understanding of Rust idioms
in regard to collection and iteration types. At first, I did not have a slice
type at all, and put everything under `BitVec` directly. I split off all the
collection work into `BitSlice` and left `BitVec` with only the allocation
management, which gave me a lot of insight into the difference between
`[T]`/`Vec<T>` and `str`/`String`. This also gave me an opportunity to really
learn the difference between

```rust
struct BitSlice<'a, T> { inner: &'a [T] }
```

and

```rust
struct BitSlice<T> { inner: [T] }
```

which, spoilers, is *a lot*. The former wraps the *reference value* in a newtype
and made working with it almost impossible. For instance, attempting to `Deref`
from `BitVec` to `BitSlice` using the first idiom took me on a wild adventure
through Higher Ranked Trait bounds, writing code that looked like

```rust
impl<E, T> Deref for BitVec<E, T>
where E: Endian, for<'a> T: 'a + Bits {
    type Target = BitSlice<'a, E, T>;
    fn deref(&'a self) -> &'a Self::Target {
        unsafe { ::std::mem::transmute(&self.inner as &[T]) }
    }
}
```

which, still didn’t compile, and if you can look upon that and not weep, you’re
a braver or more foolhardy soul than I.

So I changed `BitSlice` to be

```rust
struct BitSlice<E, T> { _endian: ::std::marker::PhantomData<E>, inner: [T] }
```

and now it is an unsized type that can only ever be accessed through `&` and
`&mut` references, which works much better with all the Rust traits that expect
references, not concrete types, like the `Deref` API and everything else that
deals with borrow conversions.

The downside of this is that `BitVec` and `BitSlice` both track the count of
live *bits* in their memory in the length field of their inner value, `Vec` for
`BitVec` and `[T]` for `BitSlice`. `BitVec` manages this by knowing how to
compute the correct number of `T` elements whenever it has to defer to the
`Vec` for memory management, but `BitSlice` cannot escape like this.

If you’re not familiar with what slice references in struct look like, they are
defined as a `transmute` of the following struct:

```rust
struct Repr<T> {
    ptr: *const T,
    len: usize,
}
```

and this two-word struct is used as a pointer everywhere slices are held by
reference. It is also the representation of `Box<[T]>`.

The value of a `BitSlice` reference looks exactly like this, except the `len`
field tracks bits, not elements. This is an enormous problem when trying to
put a `BitSlice` anywhere but a reference, because *reference values are*
*`Copy`*.

Nothing in Rust expects that code will ever manipulate the direct value of a
reference handle outside the bowels of the standard library. This means that,
for example, a `Box<BitSlice>` is a two-word handle and `Drop::drop` receives a
*copy* of that handle in a new stack frame, because in what world would `Drop`
have to mutate the **value of the `Box` itself** rather than just the buffer to
which the drop points?

Well, unfortunately, this one, because any attempt to drop a `Box<BitSlice>`
would try to deallocate `len` *elements* rather than `len` *bits*, and this
would *at best* crash the program.

So you can’t box `BitSlice`, is the moral of this story, and because Rust
coherence rules mean that `Box<BitSlice>` is considered property of the `std`
crate rather than the `bitvec` crate (a topic about which I have nebulous
thoughts), there’s nothing I can do to make smart pointers in `std` handle
`BitSlice` in a sane manner, so `bitvec` just doesn’t support them.

Reference shenanigans aside, I also got a lot better acquainted with the traits
Rust provides in the standard library and all the relationships between them.
Other than my frustration with `Index` requiring a reference return, I am
overall spectacularly pleased with how the standard library traits interplay and
work together.

My frustration with `Index` does have me pondering what an inversion-of-control
accessor/mutator pattern might look like. Right now, `Index` provides a
reference to the caller, and does no setup or teardown work other than seeking
out a memory address. A proper get/set API, like the `get` and `set` special
functions in C♯, might declare that they accept some closure which they will
provide with a reference, which the getter can only read and the setter can
freely mutate, and after the closure ends the setter will properly store back in
the collection

```rust
pub trait Property<Index> {
    type Item;
    fn get<F>(&self, key: Index, op: F) where F: Fn(&Self::Item);
    fn set<F>(&mut self, key: Index, op: F) where F: Fn(&mut Self::Item);
}

impl<E: Endian, T: Bits> Property<usize> for BitSlice<E, T> {
    type Item = bool;
    fn get<F>(&self, key: usize, op: F) where F: Fn(&Self::Item) {
        op(&self[key])
    }
    fn set<F>(&mut self, key: usize, op: F) where F: Fn(&mut Self::Item) {
        let mut tmp = self[key];
        op(&mut tmp);
        self.set(key, tmp);
    }
}

let mut bits = bitvec![1; 8];
Property::set(&mut bits, 5, |bit| {
    *bit = !*bit;
});
```

This would be an uncomfortably verbose API as it stands, but I think the idiom
that Ruby uses often, and Rust shows every now and then (such as `for/in` loops)
of syntax sugar over traits that provide setup/teardown work wrapped around
user code that only has to do the interesting part is a powerful pattern and one
worth exploring. Ruby’s indexing is implemented by the methods `[]` and `[]=`,
which can take user-provided blocks as arguments such as

```ruby
class Example
  def [] idx, &block
    puts "Yielding []"
    yield self.get(idx)
    puts "Yielded []"
  end
  def []= idx, &block
    puts "Yielding []="
    self.set(idx, yield(self.get(idx)))
    puts "Yielded []="
  end
end

e = Example.new

e[index] do |elt|
  read val
end

e.[]= index do |elt|
  write val
end
```

The Ruby isn’t perfect, since the sugar pass is not designed to have `[]=` be
abused in this manner, but it’s an interesting (at least to me) thought
experiment in how an `Index`/`IndexMut` trait allowed to perform arbitrary setup
and teardown work might look.

Of course, Rust doesn’t do this, because it’s aiming to match expectations of
system programmers about what indexing means so it’s supposed to be predictable
and relatively trivial.

(On the other hand, `BTreeMap` in the standard library implements `Index` and
that is *clearly* an $$O(log(n))$$ call of non-trivial complexity.)

Anyway. This has been a fun project, I learned a lot, I think it’s reasonably
sound and deliverable; I should get back to Cosmonaut and see if this actually
does what I need.

[1]: https://img.shields.io/crates/v/bitvec.svg
[2]: https://crates.io/crates/bitvec
[3]: https://img.shields.io/github/license/myrrlyn/bitvec.svg
[4]: https://github.com/myrrlyn/bitvec/blob/master/LICENSE.txt
[5]: https://img.shields.io/crates/dv/bitvec.svg
[6]: https://docs.rs/bitvec/badge.svg
[7]: https://docs.rs/bitvec
[8]: https://github.com/myrrlyn/bitvec
