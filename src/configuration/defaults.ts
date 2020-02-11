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
  const defaults = configuration.get(SchemaProperties.defaults) as {
    [key in DefaultLevelKeys]:
      | GlobalDefaultsType
      | RuntimeDefaultsType
      | ContainerDefaultsType
  }

  const globalDefaults = defaults.global as ContainerRuntimeOptions
  const runtimeDefaults = defaults.containerRuntime as RuntimeDefaultsType
  const containerDefaults = defaults.container as ContainerDefaultsType

  return {
    ...containerDefaults[container],
    ...runtimeDefaults[containerRuntime],
    ...globalDefaults,
  }
}