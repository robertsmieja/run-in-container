import { JSONSchema } from "json-schema-typed"
import { ContainerRuntimeOptions } from "../containerRuntimes/options/types"

export const enum SchemaProperties {
  containerRuntime = "containerRuntime",
  defaults = "defaults",
}

// in order of specificity
export const enum DefaultLevel {
  global = "global",
  containerRuntime = "containerRuntime",
  container = "container",
}

export enum ContainerRuntimes {
  docker = "docker",
  podman = "podman",
}

// https://github.com/Microsoft/TypeScript/issues/14106#issuecomment-280253269
export type DefaultLevelKeys = keyof typeof DefaultLevel
export type SchemaKeys = keyof typeof SchemaProperties
export type ContainerRuntimeKeys = keyof typeof ContainerRuntimes

const defaultSchema = {
  type: "object",
  properties: {
    entrypoint: {
      type: "string",
    },
    environment: {
      type: "object", // string => string
      additionalProperties: {
        type: "string",
      },
    },
    interactive: {
      type: "boolean",
    },
    port: {
      type: "object", // number => number
      additionalProperties: {
        type: "number",
      },
    },
    rm: { type: "boolean" },
    tty: {
      type: "boolean",
    },
    volume: {
      type: "object", // string => string
      additionalProperties: {
        type: "string",
      },
    },
    workingDirectory: { type: "string" },
  } as { [key in keyof ContainerRuntimeOptions]: JSONSchema | boolean },
} as JSONSchema

export const Schema: Record<SchemaKeys, JSONSchema> = {
  [SchemaProperties.containerRuntime]: {
    type: "string",
    enum: Object.keys(ContainerRuntimes),
  },
  [SchemaProperties.defaults]: {
    type: "object",
    properties: {
      [DefaultLevel.global]: defaultSchema,
      [DefaultLevel.containerRuntime]: {
        type: "object",
        properties: {
          [ContainerRuntimes.docker]: defaultSchema,
          [ContainerRuntimes.podman]: defaultSchema,
        },
      },
      [DefaultLevel.container]: {
        type: "object", // string => Defaults object
        additionalProperties: defaultSchema,
      },
    },
  },
}
