---
title: Portfolio
category: local
---

# My Portfolio

These are projects I’ve worked on either for my own edification or for class
assignments.

## Cosmonaut

Cosmonaut is a long-term, extremely incomplete, personal project on which I’m
working, inspired by things I encounter at my day job. It began as an
educational project for me to learn how to write a parser, and now aims to
provide a complement to the [COSMOS](//cosmosrb.com) project by Ball Aerospace.

Currently, it can parse COSMOS definition files and create a dictionary in Rust
whose members can be used to serialize a record into the bitstream that the
COSMOS text defines. I wrote the `bitvec` crate specifically to address the fact
that COSMOS definitions of wire protocols permit, and we use at work, fields
that are a combination of:

- not an even multiple of bytes in width
- not guaranteed to start or end on a byte boundary
- able to cross a byte boundary

These constraints are impossible to cleanly service in standard Rust, and the
other bit-vector libraries I encountered did not support such manipulation.
*Furthermore*, because I work in esoteric hardware, the endianness of *bits in*
*an element* matters to the network layer, so I need to bring both `bitvec` and
`endian_trait` into play in order to match the bitstream that actually transfers
over the wire.

## `bitvec`

I wrote the [`bitvec`](/bitvec) crate to satisfy a need I had in
Cosmonaut to fill up and manage a buffer by bits instead of bytes. The other
bit-vector crates I found were insufficient to my needs, and since this name
wasn’t taken, I opted to write my own.

The link above goes to my more detailed article about the crate, but as a brief
summary, `bitvec` offers:

- control over the element type used to hold the bits (`u8`, `u16`, `u32`,
  `u64`)
- extensible cursor behavior via the `Endian` trait, to define any ordering of
  bits in an element
- comprehensive support for Rust standard traits, operators, and type properties
  - iteration
  - bit arithmetic (`&`, `|`, `^`, `!`, `<<`, `>>`)
  - numeric arithmetic (`+`, `-`)
  - allocated type extends borrowed type, just as `Vec<T>` extends `[T]`
  - (immutable) indexing

The slice handle is two words in size and the vector handle is three words, just
as the slice and vector types in the Rust stdlib.

Due to limitations of how Rust implements indexing, mutable index cannot be
implemented.

## Lilliput

The [`endian_trait`](/lilliput) crate provides a trait and a custom-derive macro
to implement the trait that together enable complex structures to perform
endianness-conversions of their members. This is only valid to do on aggregates
of platform-independent primitives, so `endian_trait` only provides
implementations on the Rust primitive types, and not on pointers or `usize` or
`isize`. The crate also provides implementations on mutable slices over types
that are endian-convertible, flipping them in place, and on small arrays (up to
256), performing a large copy. Without `const` generics, Rust arrays are not
able to be fully targeted for generic use, so large arrays must be converted by
slice.

The goals of this crate are to ease the serialization to, and deserialization
from, the network for aggregate structs by performing the conversion before a
serializer reads their fields. This permits decoupling of the de/serialization
process from the byte ordering, so that order-agnostic de/serializers can work
without issue on systems where the sender, network, and/or receiver might have
byte-order mismatches.

## `libwyzyrdry`

Nothing says “cool” like puns on an author’s name. I trust I don’t need to
explain the thought process that created the above consonant salad.

There’s no such thing as an un-improveable tool, and everyone has their own
personal touches to make a tool or environment truly theirs. Much as dotfiles
make one’s `$HOME` (or `%HOMEPATH%`, Windows users are people too) a unique and
distinctive …home, collections of programming libraries make one’s workshop.

I use the base name `wyzyrdry` for my personal library projects, and decorate it
as each language requires.

Currently, I am only making my C and Rust libraries publicly available, as those
are the only languages in which I’m actively working and have noticed needs
strong enough to fill.

### `wyzyrdry-c`

The [C library][wyzyrdry-c] is currently getting the most activity, as I use C
for my day job and find its standard library extremely lacking. I will also
freely confess that the items populating it are inspired by, if not directly
stolen from, Rust. The `Vec` (growable array) and `Slice` (pointer/length tuple)
are absolute plagiarism.

I am also writing `Str` (length-prefixed variable length array) and `RingBuf`
components, which are taken directly from work projects and will be wheels I do
not wish to reinvent after this.

### `wyzyrdry-rs`

The [Rust library][wyzyrdry-rs] doesn’t have much, but I’ve found that macros
for early exit and for printing to `stderr` instead of `stdout` are invaluable
for my uses. So I wrote an `alert!` and `alertln!` macro that functions
identically to `print!` and `println!`, but targeting `stderr`, and an `exit!`
macro that supports custom program return values and optionally printing a
farewell message indicating the cause of the exit.

## Senior Design

My Senior Design project is the largest and most complex project I have
completed to date. The code itself is available on [my GitHub profile][srd]. Our
team also created a [YouTube video][yt] summary of the completed vehicle. I can
provide other documents such as our design specifications, presentations, and
reports upon request.

I designed a robust Real-Time Operating System capable of using both scheduled
and interrupt-driven tasks to drive an autonomous vehicle. I also wrote the
hardware drivers for my peripherals – GPS, compass, ultrasonic sensors, and
motors – and the RTOS modules which consumed them.

My software design received high marks from my professors, and the system
interfaced flawlessly with the hardware. Our public demonstration was a complete
success, and we were able to navigate our route fully without colliding with
pedestrians or straying off of the sidewalk.

The software I engineered demonstrates my excellent grasp of the software design
patterns and engineering principles requisite in any complex project.

## MIPS CPU

For my Logic and Computer Design class, I implemented a 32-bit pipelined MIPS
CPU in Verilog. I am not able to showcase the code from that class due to some
licensing constraints. My design included features such as:

- Five-stage pipeline with operand forwarding and stall detection
- 32-element register file with half-cycle latency
- ALU with replaceable arithmetic logic
  - Ripple-carry addition at first
  - Look-ahead-carry addition
  - Finally, Kogge-Stone addition
- RAM access (we also designed the RAM banks and controllers)
- von Neumann architecture: I was able to load and execute basic MIPS object
    code with my project, and support self-modifying program execution.
- Access to peripheral devices using drivers I wrote

## Light Show

Digital Systems, the precursor to Logic and Computer Design, had a final project
that required me to create a complex behavior sequence in Verilog for an Altera
FPGA. The project required an elaborate state machine and the construction from
scratch of functionality taken for granted in higher languages. [Code][vls].

## This Website

My talents and education lie primarily in architecture and engineering. I firmly
believe in the importance of a broad skill set and mastery of new topics. I
designed this website myself to understand design and UI concepts. I also
improved my understanding of systems administration and networking by hosting it
myself.

The code governing this site is [available on GitHub][site].

## Hermaeus

Hermaeus ([homepage][hm-myrr], [source code][hm-gh], [Gem page][hm-gem]) is a
scripted reddit client designed to archive posts. It operates by processing
index pages and retrieving the content they reference. Hermaeus is capable of
reformatting the downloaded text and storing it to disk; future goals include
storing texts in SQL and NoSQL databases, and powering a website for public
browsing of the archive it manages.

One of my design goals with Hermaeus is to have it be usable by non-technical
people, namely, the moderators of a reddit community I frequent and for whom it
was designed. Hermaeus achieves this goal with an easy-to-use launcher script.

## Computer Assembly and System Administration

I built my server and desktop. Both machines run Arch Linux; the desktop also
boots Windows, OpenBSD, and for a brief period OSX Yosemite. I am fully
self-hosted; every service at this domain is run on a three-year-old box in my
basement. By having a personal Linux server at home, I gained a wealth of
additional experience for my classes and my own pursuits. One of the fruits of
my labor is a personal VPN that allows me to distribute work and data across my
machines. I employ this network as a transparent backup system, which has
successfully kept my data intact through hardware failure.

## /r/teslore CSS

I architect the stylesheet for [/r/teslore][tsl]. The source code for the
current sheet is [here][tsl-gh-old]; it is several years old and showing it. I
am rebuilding the sheet in my spare time, but unfortunately am not at liberty to
publicize any part of the code yet.

## Rainbow Snake

I built a *very* simple Snake implementation for my C++ class, using Qt. I am
not sure I still have the source or binaries anymore. This was the only project
from my foundation classes that was publicly demonstrated, so I feel obliged to
mention it even if I can no longer showcase it.

[hm-gem]: https://rubygems.org/gems/hermaeus
[hm-gh]: https://github.com/myrrlyn/hermaeus
[hm-myrr]: https://myrrlyn.net/hermaeus
[mm]: https://middlemanapp.com
[sass]: http://sass-lang.com
[site]: https://github.com/myrrlyn/myrrlyn.net
[srd]: https://github.com/myrrlyn/SeniorDesign
[ts]: https://typescriptlang.org
[tsl]: https://reddit.com/r/teslore
[tsl-gh-old]: https://github.com/myrrlyn/teslore
[vls]: https://github.com/myrrlyn/DigitalSystemsProject
[wyzyrdry-c]: https://github.com/myrrlyn/wyzyrdry-c
[wyzyrdry-rs]: https://github.com/myrrlyn/wyzyrdry-rs
[yt]: https://www.youtube.com/watch?v=K3CKSovJbJQ
