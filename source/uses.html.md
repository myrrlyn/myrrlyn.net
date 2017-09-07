---
title: Workbench
category: local
---

Unlike the folks whose “uses” page prompted me to write this, nobody ever asks
me what tools I use, because I don’t have an active audience. I’m quite content
with that; I maintain this place almost entirely for my own purposes and if you
happen to get some benefit from reading it, that’s cool too.

Anyway, here’s what I have in my virtual workshop.

1. ToC
{:toc}

# Hardware

I have six computers at the moment in various roles. Don’t look at me like that.

## Desktop

My primary desktop is a PC I built myself.

<aside markdown="block">
I grew up on a hobby farm in Minnesota where my dad had planted trees and
collected a woodworking shop before I was born, so when I was in grade school, I
was helping to work on our buildings and make furniture. We did the entire
process ourselves – we planted the trees, then harvested them, cut them into
planks, dried those planks in a kiln that we also built, and then built
furniture pieces in the shop.

So to me, the phrase “built myself” means a significant piece of the lifecycle
of the materials, if not the whole thing.

It is, of course, completely impossible to apply that definition to assembling a
computer. I bought all the parts pre-fabbed and just clicked them together.

It really grates on me to call that “building myself”, but I don’t have a better
term and to be fair this is an extremely industrial process that simply cannot
be done in a small shop behind your house. So … yeah.
</aside>

Here are the parts for it:

- [CoolerMaster HAF XB EVO][1] case (no I don’t know what those letters mean)
- [ASUS Z97-A][2] motherboard
- [Intel Core i7 4790K][3] CPU (not overclocked; I’m not a cool ricer)
- 2x [nVidia GeForce GTX960][4] GPUs (this was a mistake; identical cards means
    I can’t pass just one through to a VM. Also, VR support starts at the 970)
- A ThermalTake liquid cooler whose specific SKU I can’t remember and probably
    doesn’t matter.
- Two Seagate hybrid disks (4TB HDD/64GB SSD) and two Samsung 850 SSDs.

All told, I think this ran me roughly $2,000. It’s three years old and I’m
hoping to stretch it to at least five or six, unless some extremely cool
hardware comes out and I can’t restrain myself.

## Laptops

I use a MacBook Pro (2014) as my primary laptop. I don’t much care for macOS,
but it’s nice having a UNIX-y OS and I just haven’t bothered to install a Linux
distro on it yet.

I also have a Surface Pro 3, which I used extensively in college for notes and
less often now that my Office subscription has expired and I don’t really have
as strong a use case for it.

The third laptop is an Alienware M14x from 2011 that was my primary machine for
a long time, and is now a dev machine on which I test out new things. It’s run
Arch, FreeBSD, Qubes, and currently CentOS.

## Servers

I have a Mac Mini and an old (2012) homebrew PC acting as servers. The Mac Mini
lives with me in Utah; the old PC is with my parents in Michigan and is
currently dead. I also rent a [DigitalOcean][5] droplet because my apartment
isn’t in a great situation vis-a-vis uptime. *Thanks, Comcast*.

## Phone

I currently use a [Moto Z][6]. <del>I don’t have any of the mods for it, though
I should probably get some. I play Ingress and take landscape pictures, and the
battery packs and camera mod look extremely cool.</del> <ins>I bought the
battery and camera mods. The battery is tremendously helpful, though I’ve
discovered the magnet in it can, when placed on one specific part of my work
laptop, turn off the laptop’s screen. The camera is incredible; I took all of my
eclipse pictures with it.</ins>

## Keyboard

I have two [WASD][7] keyboards in the Dvorak layout that I greatly enjoy. My
favorite part of them is that the Dvorak scheme is controlled by a switch on the
back that remaps the scan codes of each key, so that it can be plugged into a
computer expecting the QWERTY US keymap without any change to software.

# Software

## Operating Systems

I run Arch Linux on my desktop and servers. I’ve been using it for the last few
years and while it was extremely rocky at first, now that I’ve figured out what
I’m doing it’s been very solid and a joy to use.

I have not yet changed my MacBook to use anything other than macOS, so, I use
that as well, though without nearly the fluency that I do Arch.

## Desktop Environments

KDE’s [Plasma 5][8]. I know, I know; the only way I could get more generic and
boring is if I used GNOME. It works tremendously and I don’t use Vim either;
I’ve resigned myself to not being “cool”. Plus, KDE Connect pairing with my
phone is very convenient.

## Editors

Primarily [Visual Studio Code][9]. I know how to type in, save, AND exit Vim, so
I’ve got that going for me. I mostly use GNU Nano as my notepad when I can’t
leave the terminal environment, though.

### IDEs

I do half of my Rust work in [IntelliJ IDEA][10]. It is truly remarkable. It
helps that I have a `.edu` email address for the forseeable future.

## Programming Languages

1. [Rust][11]

    Personal language of choice. I’m slowly expanding the scope of where I use
    it, including working on rebuilding this website to be driven by it.

1. [Ruby][12]

    I use Ruby at work for driving the ground side of one of our missions, and
    to power this website (currently).

1. [C][13], split evenly between [GCC][14] and [Clang][15] compilers.

    I specialize in low-level systems languages, and Rust has not yet displaced
    this.

1. [Sass][16]

    Still my absolute favorite CSS super-language. I use it for all my CSS
    projects, and cannot yet imagine going back.

1. [TypeScript][17]

    I don’t really have a firm reason I picked TypeScript as my JavaScript
    super-language, but I really enjoy working in it.

## System Shells

[Zsh][18]. I strongly prefer it to Bash, though I am not well versed enough in
terminal lore to clearly state why. I am looking forward to some new shells
under development to experiment with, though as yet they don’t seem completely
ready for full time use.

I also use PowerShell at work, and a bit at home. I am incredibly impressed with
its piping object model and scripting language, but it’s not something I yet see
myself using personally.

[1]: http://www.coolermaster.com/case/lan-box-haf-series/haf-xb-evo
[2]: https://www.asus.com/Motherboards/Z97A
[3]: https://ark.intel.com/products/80807
[4]: http://www.geforce.com/hardware/desktop-gpus/geforce-gtx-960
[5]: https://digitalocean.com
[6]: https://www.motorola.com/us/products/moto-z
[7]: http://www.wasdkeyboards.com
[8]: https://www.kde.org/plasma-desktop
[9]: https://code.visualstudio.com
[10]: https://www.jetbrains.com/idea
[11]: https://rust-lang.org
[12]: https://ruby-lang.org
[13]: https://en.wikipedia.org/wiki/C_(programming_language)
[14]: https://gcc.gnu.org
[15]: http://clang.llvm.org
[16]: https://sass-lang.com
[17]: https://www.typescriptlang.org
[18]: https://www.zsh.org
