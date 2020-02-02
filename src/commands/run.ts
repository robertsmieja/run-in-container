import { Command } from "@oclif/command"
import configuration from "../configuration"
import { properties } from "../configuration/schema"
import ContainerRuntimeToCLI from "../containerRuntimes/cli"

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
    const containerRuntimeCli = ContainerRuntimeToCLI[containerRuntime]
    const commandToRun = `${
      containerRuntimeCli.executable
    } ${containerRuntimeCli.subCommand ?? ""} ${argv.reduce(
      (previous, current) => `${previous} ${current}`
    )}`

    this.log(commandToRun)
  }
}
