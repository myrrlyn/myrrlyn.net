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

# PASSWORD MANAGER

I’m putting this first because it is, in my opinion, critically important to the
rest of the list.

I have previously used [1Password], but recently switched to [Enpass]. In my
experience, these two managers are closely matched in features, though Enpass
wins out in that it has a Linux desktop client and 1Password does not. Enpass
furthermore has a Windows 10 Mobile app, so I can recommend it to my parents; I
do not recall if 1Password does (I believe it does not).

Enpass is free for desktop apps, and $10 per user per mobile OS. If you own an
iPhone, an Android, and/or a Windows Phone, you’ll pay per app. Otherwise, it is
free for personal use. The price is only invoked when you try to store your
21<sup>st</sup> credential, so you can give it a trial spin to see if you like
it without committment. I bought it immediately and regret nothing.

Enpass offers a number of features I find both compelling and, to be honest,
mandatory in any modern password manager. I know this reads like I’m shilling
for them and I swear I’m not; I’m just very enthusiastic about this.

- Synchronization

    Enpass has native hooks with a variety of synchronization services. At the
    time of this writing, that list includes Dropbox, OneDrive, Google Drive,
    OwnCloud, and Box. If none of these strike your fancy, you can also instruct
    it to store its database in a specific location and manage it yourself (such
    as via [SyncThing]).

    The database file is always stored fully encrypted. When an Enpass client
    seeks to update it, it locks the file, decrypts it in local memory, updates,
    re-encrypts, and then clobbers the file on disk with the new version. Don’t
    cause a race, I guess.

- Platform Support

    Essentially all of them. Windows, macOS, Linux, iOS, Android, Windows
    Mobile, Chromebook, and even BlackBerry. No BSD though, and as it’s closed
    source, you can’t port it yourself.

- Environment Integration

    On desktop, Enpass offers browser integrations for Firefox, Chrome, Safari,
    and Opera. On mobile, it offers an Android custom keyboard that can fill
    fields for you. I have found using it in both environments to be a pleasant
    mix of convenience and security.

    I recently switched to an iPhone, and Enpass is less well-integrated (no
    native keyboard, and applications have to explicitly opt-in to hooking into
    it for credential insertion with more effort than is needed to access the
    iOS Keychain), but it does offer a home-screen widget that holds your
    favorites, and is readily usable. I intend to keep using it, but the
    experience on Android was definitely better. I think that’s more of a
    commentary on the phone vendor, though.

- TOTP Support

    <dfn>Time-based One Time Password</dfn> algorithms are commonly used for Two
    Factor Authentication. If you so choose, you can use Enpass to store your
    TOTP seed and have it generate 2FA codes for you when unlocked. This is,
    however, moving your 2FA into the same database that stores your password,
    and thus both are compromised if your Enpass database is lost or breached. I
    am using it for my less-important services, but will likely continue to use
    Authy for more important 2FA accounts.

- Password Generation

    You can specify length and mix (uppercase, digits, yes or no visually
    similar characters, non-alphanumeric symbols) anywhere in the app, including
    (of course) browser extensions or the app keyboard, and auto-fill and copy
    to a self-destructing clipboard. After generation and entry, Enpass will
    detect a new or updated identity and ask you if it should update its
    database accordingly.

- Display of weak or duplicate passwords

    Identities with weak and/or duplicate passwords are displayed in their own
    categories so you can rapidly identify them and take action to change them.
    Enpass does not yet have Dashlane’s ability to change passwords en masse;
    you have to do so manually and individually. This is, regardless, good
    information to have

- Importing from other managers

    I exported my 1Password database to its 1pif format, and Enpass ate that
    archive directly with only minor loss of information.

- Display of aging passwords

    I have not yet experienced this, as Enpass believes all my passwords are a
    few days old (it did not collect their creation dates from the 1Password
    export). As my passwords age, it will display those identites in categories
    for various ages of password as an incentive to rotate regularly.

- Fingerprint Unlock

    **THIS IS A SECURITY REDUCTION**. However, it is very convenient, and Enpass
    takes every step to limit the security reduction of biometric unlocks. If
    your phone changes the fingerprint set in any way, Enpass invalidates the
    stored master password and requires that you re-authenticate with it.

    But yes, you can use Touch ID to unlock your password vault. I recommend
    disabling this if you are in an environment where this may be unsafe, such
    as heavy police or other security personnel presence, or an untrustworthy
    home environment.

    <aside markdown="block">
    I refuse to set up Face ID on my iPhone, so I can’t speak to how Enpass uses
    iOS biometrics.

    I encourage you to not use biometrics as a password, because they’re not.
    </aside>

The only thing Enpass does not have that 1Password does, *to my knowledge*, is
1Password’s recent feature add of Travel Mode. If you inform 1Password that you
are travelling, it will destroy local copies of select vaults and attempt to
reacquire onec you turn travel mode off. This makes it so that, if you are
compelled to open your password vault by, say, American TSA, your sensitive
items will be completely absent and you can do so safely.

If this is something likely to affect you, disable Enpass synchronization on the
affected devices and the local databases will be destroyed; reenable it later to
reacquire. This is not selective and you will temporarily lose all data, not
just the vaults you mark as sensitive as 1Password permits.

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

- [CoolerMaster HAF XB EVO][case] case (no I don’t know what those letters mean)
- [ASUS Z97-A][mobo] motherboard
- [Intel Core i7 4790K][core] CPU (not overclocked; I’m not a cool ricer)
- 2x [nVidia GeForce GTX960][gpu] GPUs (this was a mistake; identical cards
    means I can’t pass just one through to a VM. Also, VR support starts at the
    970)
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
currently dead. I also rent a [DigitalOcean][do] droplet because my apartment
isn’t in a great situation vis-a-vis uptime. *Thanks, <del>Comcast</del>*
*<ins>BlueRim</ins>.*

## Phone

I currently use an [iPhone X]. I had previously used a Moto Z, until I bought
the external battery mod and something went wrong in the phone itself (I think)
that caused its battery sensor firmware to panic and believe that the phone was
utterly without power, and shut down until plugged into the wall.

The problem escalated to the point that even when both batteries were full,
taking the phone outside in autumnal weather caused the phone to abort. This is,
obviously, unacceptable.

Naturally, shortly after I bought the iPhone, Apple released iOS 11.1.2, with
this patch note:

> – Fixes an issue where the iPhone X screen becomes temporarily unresponsive to
> touch after a rapid temperature drop

As northern Utah is the farthest *south* I have ever lived, I am particularly
annoyed by failures of technology to handle the environment in which it will see
use. In ordinary autumn/winter weather, I will encounter drops of -40℉ (building
at 70℉, air at freezing) and the most I’ve encountered in real life has been a
-100℉ (from 70℉ to -30℉). Isn’t it important that phones work in these
environments?

I’ve had the phone for almost a year now and I’m, by and large, okay with it. I
wouldn’t say *happy*, given that I strongly dislike the no-buttons aesthetic and
the notch is, while not crippling, still noticeable and moderately annoying. I
also strongly dislike the home screen layout choices Apple made.

But it’s functional, and the hardware quality is undeniably better than any
Android phone I’ve yet used, so I guess there’s that. I’ll probably keep it
until I finally manage to break it, or two or three years and it obsoletes.

## Keyboard

I have two [WASD] keyboards in the Dvorak layout that I greatly enjoy. My
favorite part of them is that the Dvorak scheme is controlled by a switch on the
back that remaps the scan codes of each key, so that it can be plugged into a
computer expecting the QWERTY US keymap without any change to software.

I also use a custom keyboard cover for my MacBook. This has the downside of
requiring a software change in order to use, and greatly confuses anyone who
wants to use my laptop, but I find it very convenient both in the occasional
glance down and in keeping the bare keyboard somewhat less weathered.

# Software

## Operating Systems

I run [Arch Linux] on my desktop and servers. I’ve been using it for the last few
years and while it was extremely rocky at first, now that I’ve figured out what
I’m doing it’s been very solid and a joy to use.

I have not yet changed my MacBook to use anything other than macOS, so, I use
that as well, though without nearly the fluency that I do Arch.

I haven’t used Windows personally in about two or three years, though I use it
at work. It’s still a good OS; I just personally prefer Arch+KDE at the moment.

## Desktop Environments

KDE’s [Plasma 5]. I know, I know; the only way I could get more generic and
boring is if I used GNOME. It works tremendously and I don’t use Vim either;
I’ve resigned myself to not being “cool”. <del>Plus, KDE Connect pairing with my
phone is very convenient.</del> <ins>No longer true now that I have an
iPhone.</ins>

I use [i3] occasionally when I want to have no extra power taken away from
Stellaris, but I am accustomed to neither it nor Vim and go back to my graphical
choices soon enough.

## Editors

Primarily [Visual Studio Code]. I know how to type in, save, AND exit Vim, so
I’ve got that going for me. I mostly use GNU Nano as my notepad when I can’t
leave the terminal environment, though.

### IDEs

I do half of my Rust work in [IntelliJ IDEA]. It is truly remarkable. It helps
that I have a `.edu` email address for the forseeable future.

### Fonts

I was introduced to the [Iosevka] font, and use it for all the monospaced text
on this site, as well as in my editors. The specific variant I use (with numbers
collapsed using `sh` syntax) is:

```sh
sans term ss03 cv{01,{0,1}{3,7},19,2{1,3,4},3{0,1,4,7,8},4{0,2,4,6}}
```

The `term` variant makes the box-drawing characters I use for text diagrams
render properly. I replace `term` with `type` for text I know will not contain
these characters, in scenarios where I want fancier features such as ligatures.

## Programming Languages

1. [Rust] is my personal language of choice. I’m slowly expanding the scope of
    where I use it, including working on rebuilding this website to be driven by
    it.

1. [Ruby]

    I use Ruby at work for driving the ground side of one of our missions, and
    to power this website (currently).

1. [Elixir], in which I’m practicing for future web work.

1. [C], split evenly between [GCC] and [Clang] compilers.

    I specialize in low-level systems languages, and Rust has not yet displaced
    this.

1. [Sass] is still my absolute favorite CSS super-language. I use it for all
    my CSS projects, and cannot yet imagine going back.

1. [TypeScript]

    I don’t really have a firm reason I picked TypeScript as my JavaScript
    super-language, but I really enjoy working in it.

## Web Development

This website is my only web development project. I use the [Middleman] static
site framework to compile it, and use Sass and TypeScript as the CSS and JS
source languages. The text content is all written in Markdown, as is good and
proper.

I really enjoy Middleman, and have so far found it very easy to set up and
extend. I haven’t done very much particularly complex with it, and I am missing
several features that other frameworks provide out of the box (Jekyll has an RSS
module for free, for instance) that I really should get in place.

But it’s a great static site generator for just getting something stood up with
little fuss, and I have no firm plans to move away just yet. I strongly
recommend it for anyone looking to get a website of their own (although I
recognize that Jekyll’s native support in GitHub makes it a more appealing
choice) and will happily help anyone out with it if they want.

## System Shells

[Zsh][zsh]. I strongly prefer it to Bash, though I am not well versed enough in
terminal lore to clearly state why. I am looking forward to some new shells
under development to experiment with, though as yet they don’t seem completely
ready for full time use.

I also use PowerShell at work, and a bit at home. I am incredibly impressed with
its piping object model and scripting language, but it’s not something I yet see
myself using personally.

## Data Synchronization

I use [SyncThing] for decentralized data sync; all my machines shunt
my Projects and Pictures folders, among others, this way. These folders
are *massive* and thus cannot use sync services that include cloud
storage as a target. SyncThing is a distributed network that operates by
having your machines introduce themselves to each other. You can then
select which folders are synchronized between which machines -- this can
also be used to maintain disparate sync networks, whereby each machine
has a different set of folders shared with different networks. For a
short time, that was how I deployed this website and shared project code
with a team of mine.

I also use Dropbox, OneDrive, and Google Drive as means of backing up
and/or sharing items with specific groups of people or ecosystems. These
are fairly mainstream and banal, so I won’t go into more detail.

[1Password]: //agilebits.com/
[Arch Linux]: //archlinux.org/
[C]: //en.wikipedia.org/wiki/C_(programming_language)
[Clang]: //clang.llvm.org/
[GCC]: //gcc.gnu.org/
[Elixir]: //elixir-lang.org/
[Enpass]: //enpass.io/
[IntelliJ IDEA]: //www.jetbrains.com/idea
[Iosevka]: //be5invis.github.io/Iosevka/
[Middleman]: //middlemanapp.com/
[Plasma 5]: //www.kde.org/plasma-desktop
[Ruby]: //ruby-lang.org/
[Rust]: //rust-lang.org/
[Sass]: //sass-lang.com/
[SyncThing]: //syncthing.net
[TypeScript]: //www.typescriptlang.org/
[Visual Studio Code]: //code.visualstudio.com/
[WASD]: //www.wasdkeyboards.com/
[case]: //www.coolermaster.com/case/lan-box-haf-series/haf-xb-evo
[core]: //ark.intel.com/products/80807
[do]: //digitalocean.com/
[gpu]: //www.geforce.com/hardware/desktop-gpus/geforce-gtx-960
[i3]: //i3wm.org/
[iPhone X]: //www.apple.com/iphone-x/
[mobo]: //www.asus.com/Motherboards/Z97A
[zsh]: //www.zsh.org/
