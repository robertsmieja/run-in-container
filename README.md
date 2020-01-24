# run-in-container

CLI to assist running commands inside containers

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/run-in-container.svg)](https://npmjs.org/package/run-in-container)
[![Codecov](https://codecov.io/gh/robertsmieja/run-in-container/branch/master/graph/badge.svg)](https://codecov.io/gh/robertsmieja/run-in-container)
[![Downloads/week](https://img.shields.io/npm/dw/run-in-container.svg)](https://npmjs.org/package/run-in-container)
[![License](https://img.shields.io/npm/l/run-in-container.svg)](https://github.com/robertsmieja/run-in-container/blob/master/package.json)

<!-- toc -->

- [run-in-container](#run-in-container)
- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g run-in-container
$ run-in-container COMMAND
running command...
$ run-in-container (-v|--version|version)
run-in-container/0.0.1 linux-x64 node-v12.14.1
$ run-in-container --help [COMMAND]
USAGE
  $ run-in-container COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`run-in-container autocomplete [SHELL]`](#run-in-container-autocomplete-shell)
- [`run-in-container commands`](#run-in-container-commands)
- [`run-in-container conf [KEY] [VALUE]`](#run-in-container-conf-key-value)
- [`run-in-container hello [FILE]`](#run-in-container-hello-file)
- [`run-in-container help [COMMAND]`](#run-in-container-help-command)
- [`run-in-container update [CHANNEL]`](#run-in-container-update-channel)
- [`run-in-container which COMMAND`](#run-in-container-which-command)

## `run-in-container autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ run-in-container autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ run-in-container autocomplete
  $ run-in-container autocomplete bash
  $ run-in-container autocomplete zsh
  $ run-in-container autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.5/src/commands/autocomplete/index.ts)_

## `run-in-container commands`

list all the commands

```
USAGE
  $ run-in-container commands

OPTIONS
  -h, --help  show CLI help
  -j, --json  output in json format
  --hidden    also show hidden commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v1.2.3/src/commands/commands.ts)_

## `run-in-container conf [KEY] [VALUE]`

manage configuration

```
USAGE
  $ run-in-container conf [KEY] [VALUE]

ARGUMENTS
  KEY    key of the config
  VALUE  value of the config

OPTIONS
  -d, --cwd=cwd          config file location
  -d, --delete           delete?
  -h, --help             show CLI help
  -k, --key=key          key of the config
  -n, --name=name        config file name
  -p, --project=project  project name
  -v, --value=value      value of the config
```

_See code: [conf-cli](https://github.com/natzcam/conf-cli/blob/v0.1.9/src/commands/conf.ts)_

## `run-in-container hello [FILE]`

describe the command here

```
USAGE
  $ run-in-container hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ run-in-container hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/robertsmieja/run-in-container/blob/v0.0.1/src/commands/hello.ts)_

## `run-in-container help [COMMAND]`

display help for run-in-container

```
USAGE
  $ run-in-container help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `run-in-container update [CHANNEL]`

update the run-in-container CLI

```
USAGE
  $ run-in-container update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.9/src/commands/update.ts)_

## `run-in-container which COMMAND`

show which plugin a command is in

```
USAGE
  $ run-in-container which COMMAND
```

_See code: [@oclif/plugin-which](https://github.com/oclif/plugin-which/blob/v1.0.3/src/commands/which.ts)_

<!-- commandsstop -->
