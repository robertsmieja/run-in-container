import { JSONSchema } from "json-schema-typed"

export const enum Properties {
  containerRuntime = "containerRuntime",
}

export enum ContainerRuntimes {
  docker = "docker",
  podman = "podman",
}

// https://github.com/Microsoft/TypeScript/issues/14106#issuecomment-280253269
export type SchemaKeys = keyof typeof Properties

export const Schema: Record<keyof typeof Properties, JSONSchema> = {
  [Properties.containerRuntime]: {
    type: "string",
    enum: Object.keys(ContainerRuntimes),
  },
}
