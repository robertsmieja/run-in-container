import { Command, flags } from "@oclif/command"

export default class Run extends Command {
  static description = "Run a container. Similar to 'docker run'"

  strict = false

  static flags = {
    // help: flags.help({ char: "h" }),
    // // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: "n", description: "name to print" }),
    // // flag with no value (-f, --force)
    // force: flags.boolean({ char: "f" }),
  }

  // static args = [{ name: "file" }]

  async run() {
    const { args, flags } = this.parse(Run)

    const name = flags.name || "world"
    this.log(
      `hello ${name} from /home/rsmieja/git/run-in-container/src/commands/run.ts`
    )
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
