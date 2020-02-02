import { Command } from "@oclif/command"
import configuration from "../configuration"
import { properties } from "../configuration/schema"
import ContainerRuntimeToCLI from "../containerRuntimes/cli"
import { spawnSync } from "child_process"

export default class Run extends Command {
  static description = "Run a container. Similar to 'docker run'"

  static strict = false

  static flags = {
    // help: flags.help({ char: "h" }),
    // // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: "n", description: "name to print" }),
    // // flag with no value (-f, --force)
    // force: flags.boolean({ char: "f" }),
  }

  // static args = [{ name: "file" }]

  async run() {
    const { argv } = this.parse(Run)

    const containerRuntime = configuration.get(properties.containerRuntime)
    const { executable, subCommand } = ContainerRuntimeToCLI[containerRuntime]
    const processArgv = (subCommand ? [subCommand] : []).concat(argv)

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
