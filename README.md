# myrrlyn.net

This is the repository powering my personal website, in all its glory.

## Usage

Building isn't a simple `git clone` anymore, what with submodules, TypeScript,
and site generators.

```sh
npm install tsc # or however you want to install TypeScript
npm install @types/{jquery{,ui},moment} # I'm not putting these in history
gem install middleman
git clone git@github.com:myrrlyn/myrrlyn.net --recursive # grab submodule(s) too
git lfs checkout # may or may not be necessary
cd myrrlyn.net
bundle
tsc
middleman build # or middleman serve for a temporary view at localhost:4567
```

The build command now attempts to cryptographically sign every artifact. This
wants `parallel`, `gpg` and `keybase` commands in `PATH`.

I use [mmstick parallel][1], but GNU Parallel should suffice as well.

[1]: https://github.com/mmstick/parallel
