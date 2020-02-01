import { Hook, IConfig } from "@oclif/config"
import Run from "../commands/run"

const commandNotFound: Hook.CommandNotFound = async function(
  this: Hook.Context,
  options: { id: string; argv: string[] } & { config: IConfig } // argv is not in the type definition, but is present
) {
  const args = [options.id].concat(options.argv)
  this.debug(options)
  this.debug(args)

  return Run.run(args)
} as any // remove when type def is fixed

export default commandNotFound
