import { ConfigurationType } from "."
import { ContainerRuntimeOptions } from "../containerRuntimes/options/types"
import {
  ContainerRuntimeKeys,
  DefaultLevelKeys,
  SchemaProperties,
} from "./schema"

type GlobalDefaultsType = ContainerRuntimeOptions
type RuntimeDefaultsType = {
  [key in ContainerRuntimeKeys]: ContainerRuntimeOptions
}
type ContainerDefaultsType = Record<string, ContainerRuntimeOptions>

export const getDefaults = (
  configuration: ConfigurationType,
  containerRuntime: ContainerRuntimeKeys,
  container: string
) => {
  const defaults = configuration.get(SchemaProperties.defaults) as
    | {
        [key in DefaultLevelKeys]:
          | GlobalDefaultsType
          | RuntimeDefaultsType
          | ContainerDefaultsType
      }
    | undefined

  const globalDefaults = defaults?.global as ContainerRuntimeOptions | undefined
  const runtimeDefaults = defaults?.containerRuntime as
    | RuntimeDefaultsType
    | undefined
  const containerDefaults = defaults?.container as
    | ContainerDefaultsType
    | undefined

  const currentContainerDefaults = containerDefaults?.[container] ?? {}
  const currentRuntimeDefaults = runtimeDefaults?.[containerRuntime] ?? {}

  return {
    ...globalDefaults,
    ...currentRuntimeDefaults,
    ...currentContainerDefaults,
  }
}
