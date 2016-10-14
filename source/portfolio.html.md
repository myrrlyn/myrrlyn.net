---
title: Portfolio
category: local
---

# My Portfolio

These are projects I’ve worked on either for class or my own personal pursuits.

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
[yt]: https://www.youtube.com/watch?v=K3CKSovJbJQ
