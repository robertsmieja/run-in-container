import { Hook } from "@oclif/config"
import { initConfig } from "../configuration"

const initHook: Hook.Init = async () => {
  await initConfig({ rerun: false })
}

export default initHook
