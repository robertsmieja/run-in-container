import { ContainerRuntimeOptions } from "../options/types"

export interface ContainerRuntimeCLI {
  executable: string
  options: Record<keyof ContainerRuntimeOptions, string>
}
