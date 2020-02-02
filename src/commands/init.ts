import { Command } from "@oclif/command"
import { initConfig } from "../configuration"

export default class Init extends Command {
  static description = "Run the initial configuration setup"

  async run() {
    initConfig()
    // const { args, flags } = this.parse(Init)
  }
}
