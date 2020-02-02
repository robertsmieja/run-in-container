import { Hook } from "@oclif/config"
import { initConfig } from "../configuration"

const initHook: Hook.Init = async () => {
  await initConfig()
}

export default initHook
