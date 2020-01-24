import { Hook } from "@oclif/config"
import initConfig from "../configuration"

const initHook: Hook<"init"> = async () => {
  await initConfig()
}

export default initHook
