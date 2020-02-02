import { Hook, IConfig } from "@oclif/config"
import Run from "../commands/run"

const commandNotFound: Hook.CommandNotFound = async function(
  this: Hook.Context,
  options: { id?: string; argv?: string[] } & { config: IConfig } // argv is not in the type definition, but is present
) {
  if (options.id && options.argv && options.argv.length > 0) {
    this.debug(`commandNotFound Hook: 
      id: ${options.id},
      argv: ${options.argv}
    `)

    const args = [options.id].concat(options.argv)
    return Run.run(args)
  }
} as any // workaround for typedef

export default commandNotFound
