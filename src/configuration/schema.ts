import { JSONSchema } from "json-schema-typed"
import { ContainerRuntimeOptions } from "../containerRuntimes/options/types"

export const enum Properties {
  containerRuntime = "containerRuntime",
  defaults = "defaults",
}

export const enum DefaultLevel {
  global = "global",
  runtime = "runtime",
  containerRuntime = "containerRuntime",
}

export enum ContainerRuntimes {
  docker = "docker",
  podman = "podman",
}

// https://github.com/Microsoft/TypeScript/issues/14106#issuecomment-280253269
export type SchemaKeys = keyof typeof Properties

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
  [Properties.containerRuntime]: {
    type: "string",
    enum: Object.keys(ContainerRuntimes),
  },
  [Properties.defaults]: {
    type: "object",
    properties: {
      [DefaultLevel.global]: defaultSchema,
      [DefaultLevel.runtime]: {
        type: "object",
        properties: {
          [ContainerRuntimes.docker]: defaultSchema,
          [ContainerRuntimes.podman]: defaultSchema,
        },
      },
      [DefaultLevel.containerRuntime]: {
        type: "object", // string => Defaults object
        additionalProperties: defaultSchema,
      },
    },
  },
}
