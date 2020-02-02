import { ContainerRuntimeOptions } from "../options/types"

export interface ContainerRuntimeCLI {
  executable: string
  subCommand?: string
  options: Record<keyof ContainerRuntimeOptions, string>
}
