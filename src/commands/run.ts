import { Command, flags } from "@oclif/command"
import configuration from "../configuration"
import { Properties } from "../configuration/schema"
import ContainerRuntimeToCLI from "../containerRuntimes/cli"
import { spawnSync } from "child_process"
import { ContainerRuntimeOptions } from "../containerRuntimes/options/types"

export default class Run extends Command {
  static description = `Run a container. Similar to 'docker run'. 
  Any unrecognized arguments will be passed directly to the underlying CLI`

  static strict = false

  static flags = {
    interactive: flags.boolean({ char: "i", default: false }),
    tty: flags.boolean({ char: "t", default: false }),
    volume: flags.string({ char: "v", multiple: true }),
    // help: flags.help({ char: "h" }),
    // // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: "n", description: "name to print" }),
    // // flag with no value (-f, --force)
    // force: flags.boolean({ char: "f" }),
  }

  // static args = [{ name: "file" }]

  static usage = `run [CONTAINER OPTIONS]`

  static examples = [
    `$ run-in-container run alpine echo "Hello world"`,
    `$ run-in-container run --interactive --tty alpine sh`,
    `$ run-in-container run -it alpine`,
  ]

  async run() {
    const parseOutput = this.parse(Run)
    this.debug(JSON.stringify(parseOutput))

    const { argv, flags } = parseOutput

    const containerRuntime = configuration.get(Properties.containerRuntime)
    const { executable, subCommand, options } = ContainerRuntimeToCLI[
      containerRuntime
    ]

    let parsedArgv: string[] = []
    for (const [flagKey, flagValue] of Object.entries(flags)) {
      if (flagValue) {
        if (typeof flagValue === "boolean") {
          parsedArgv = parsedArgv.concat([`--${flagKey}`])
        } else {
          parsedArgv = parsedArgv.concat([
            `--${flagKey}`,
            options[flagKey as keyof ContainerRuntimeOptions],
          ])
        }
        // parsedArgv.concat(options[flagKey]
      }
    }

    const processArgv = parsedArgv.concat(argv)
    // const flagKeys = Object.keys(flags)

    // for (const key of flagKeys) {
    //   flags[key]
    // }
    // const
    // for (const key of Object.keys(flags as Record<string, any>)) {
    //   flags[key] as any
    // }

    // for (const key of Object.keys(flags)) {
    //   console.log(key, flags[key] as boolean)
    // }
    // flagKeys.filter(key => flags[`${key}`]).f
    this.debug(`parsedArgv: ${parsedArgv}`)
    this.debug(`executable: ${executable}`)
    this.debug(`subCommand: ${subCommand}`)
    this.debug(`argv: ${argv}`)
    this.debug(`processArgv: ${processArgv}`)

    const containerProcess = spawnSync(executable, processArgv, {
      stdio: "inherit",
    })
    if (containerProcess.error) {
      this.log(JSON.stringify(containerProcess.error))
      this.exit(1)
    }
  }
}
