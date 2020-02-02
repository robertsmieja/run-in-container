/**
 * Boilerplate to mock out user configuration, and prevent real file I/O
 */

import { test } from "@oclif/test"
import { SchemaKeys } from "../src/configuration/schema"

const testWithExtensions = () => {
  test.register(
    "configuration",
    (configurationObject: Partial<Record<SchemaKeys, any>>) => {
      return {
        run(ctx: { configuration: typeof configurationObject }) {
          ctx.configuration = {}
        },
      }
    }
  )
}

export default testWithExtensions
