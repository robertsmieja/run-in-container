import { JSONSchema } from "json-schema-typed"

export enum properties {
  containerRuntime = "containerRuntime",
}

export enum containerRuntimes {
  docker = "docker",
  podman = "podman",
}

export const schema: Record<any, JSONSchema> = {
  [properties.containerRuntime]: {
    type: "string",
    enum: Object.keys(containerRuntimes),
  },
}

export const schemaKeys = Object.keys(schema)
