# Installation

The Spectre toolchain can be installed in several ways. The simplest is to run the installation script from https://spectrelang.org/get.sh, or, on Windows, from https://spectrelang.org/get.ps1.

The corresponding commands for POSIX systems (macOS, Linux, and others) and for Windows are shown below.

On POSIX systems:

```sh
curl https://spectrelang.org/get.sh | sh
```

On Windows:

```powershell
irm https://spectrelang.org/get.ps1 | iex
```

After installation, the compiler version can be checked with:

```sh
spectre -v
```
