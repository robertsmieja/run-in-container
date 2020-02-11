import Ajv from "ajv"
import { JSONSchema } from "json-schema-typed"
import { Schema } from "../../src/configuration/schema"

describe("Schema", () => {
  describe("validation", () => {
    // properties that are not defined in schema are allowed currently
    const validation = new Ajv().compile({
      type: "object",
      properties: Schema,
    } as JSONSchema)

    const validObjects = [
      {},
      { foo: "bar" }, // properties that are not defined in schema are allowed currently
      { containerRuntime: "docker" },
      {
        containerRuntime: "docker",
        defaults: {
          global: {
            environment: {
              FOO: "bar",
            },
            port: {
              "5000": 5000,
            },
            interactive: true,
            volume: { "/foo": "/bar" },
            tty: true,
          },
        },
      },
      {
        defaults: {
          containerRuntime: {
            docker: {
              interactive: true,
            },
          },
        },
      },
    ]

    for (const validObject of validObjects) {
      it(`object passes validation: < ${JSON.stringify(validObject)} >`, () => {
        const validationResults = validation(validObject)
        expect(typeof validationResults).toStrictEqual("boolean")
        expect(validationResults).toStrictEqual(true)
      })
    }

    const invalidObjects = [
      { containerRuntime: "I don't exist" },
      1,
      "someString",
      {
        containerRuntime: {
          executable: "docker",
        },
      },
    ]

    for (const invalidObject of invalidObjects) {
      it(`object fails validation: < ${JSON.stringify(
        invalidObject
      )} >`, async () => {
        const validationResults = validation(invalidObject)

        expect(typeof validationResults).toStrictEqual("boolean")
        expect(await validationResults).toStrictEqual(false)
      })
    }
  })
})
