---
title: Portfolio
category: local
---

# My Portfolio

These are projects I’ve worked on either for class or my own personal pursuits.

## Senior Design

My Senior Design project is by far the largest and most complex project I have
to show. The code itself is available on [my GitHub profile][srd]. We also
created a [YouTube video][yt] summary of the completed vehicle. I can provide
other documents such as our design specifications, presentations, and reports
upon request.

For this project, I designed a primitive Real-Time Operating System capable of
using a combinations of sheduled and interrupt-driven tasks to drive an
autonomous vehicle. I also wrote the hardware drivers for my peripherals – GPS,
compass, ultrasonic sensors, and motors – and the RTOS modules which consumed
them.

My software design received high marks from my professors, and the system
interfaced flawlessly with the hardware. Our public demonstration was a complete
success, and we were able to navigate our route fully without colliding with
pedestrians or straying off of the sidewalk.

While this project is somewhat rudimentary in details – the path is hard-coded
into the program binary, and the avoidance strategy is to halt and wait, and the
navigation algorithms are fairly crude – my implementation showcases the design
patterns and processes requisite in any complex project.

## This Website

My talents lean far more to the architecture and engineering side of software,
and I have less strength for the artistic and design side. My website may not
be beautiful, but it is hand-written and responsive. The code for it is also
[available on GitHub][site]. I use [Middleman][mm] as my compiler; the text is
written in Markdown, the page templates in ERb, the stylesheet in [Sass], and
the scripts in [TypeScript][ts].

## Light Show

For my Digital Systems class, our final project involved creating a complex
show in Verilog for an Altera FPGA. This was a rather rudimentary project, but
required a fairly elaborate state machine and use of functionality that while
basic in software languages, had to be hand-built in Verilog. [Code][vls].

### MIPS CPU

For the sequel to Digital Systems, Logic and Computer Design, we implemented a
32-bit pipelined MIPS CPU in Verilog. I am not able to showcase the code from
that class due to some licensing constraints. Features of our designs included:

- five-stage pipeline with operand forwarding and stall detection
- 32-element register file with half-cycle latency
- ALU with replaceable arithmetic logic
    - Ripple-carry addition at first
    - Look-ahead-carry addition
    - Finally, Kogge-Stone addition
- RAM access (we also designed the RAM banks and controllers)
- von Neumann architecture: we were able to load and run basic MIPS object code
onto our projects, and have self-modifying programs.
- Access to peripheral devices using drivers we wrote

## Hermaeus

Hermaeus ([source code][herm-gh], [Gem page][herm-gem]) is a scripted reddit
client designed to archive posts. It operates by scraping and parsing certain
index pages, then dereferencing links it finds on them to reach the content
posts those pages enumerate. Hermaeus is capable of reformatting the downloaded
text and storing it to disk; future goals include storing texts in SQL and NoSQL
databases, and powering a website for public browsing of the archive it manages.

One of my design goals with Hermaeus is to have it be usable by non-technical
people, namely, the moderators of a reddit community I frequent and for whom it
was designed. I have somewhat achieved this goal; the runtime interface is not
complex, but it is also a Ruby command-line tool, neither of which lend it to
use by non-technical users on Windows, who make up the audience for whom it is
intended.

## Computer Assembly and System Administration

I built my server and desktop. Both machines run Arch Linux; the desktop also
boots Windows, OpenBSD, and for a brief period OSX Yosemite. I am fully
self-hosted; every service at this domain is run on a three-year-old box in my
basement. Having a personal Linux server at home gave me a wealth of additional
experience for my classes and my own pursuits; as a result, I have been able to
maintain a network across my Windows, Linux, and Macintosh machines that keeps
folders and configuration synchronized (a feature which has saved me on more
than one occasion) and permits any two of my devices to communicate even under
NAT.

## /r/teslore CSS

I architect the stylesheet for [/r/teslore][tsl]. The source code for the
current sheet is [here][tsl-gh-old]; it is several years old and showing it. I
am rebuilding the sheet in my spare time, but unfortunately am not at liberty to
publicize any part of the code yet.

## Rawinbow Snake

I built a *very* simple Snake implementation for my C++ class, using Qt. I am
not sure I still have the source or binaries anymore. This was the only project
from my foundation classes that was publicly demonstrated, so I feel obliged to
mention it even if I can no longer showcase it.

[herm-gem]: https://rubygems.org/gems/hermaeus
[herm-gh]: https://github.com/myrrlyn/hermaeus
[mm]: https://middlemanapp.com
[sass]: http://sass-lang.com
[site]: https://github.com/myrrlyn/myrrlyn.net
[srd]: https://github.com/myrrlyn/SeniorDesign
[ts]: https://typescriptlang.org
[tsl]: https://reddit.com/r/teslore
[tsl-gh-old]: https://github.com/myrrlyn/teslore
[vls]: https://github.com/myrrlyn/DigitalSystemsProject
[yt]: https://www.youtube.com/watch?v=K3CKSovJbJQ
