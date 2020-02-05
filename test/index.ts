/**
 * Boilerplate to mock out user configuration, inquirer, and prevent real file I/O
 */

import { test } from "@oclif/test"
import lookpath from "lookpath"
import sinon from "sinon"
import configuration from "../src/configuration"
import { SchemaKeys } from "../src/configuration/schema"

type ConfigurationObject = Partial<Record<SchemaKeys, any>>

const testWithExtensions = test
  .register(
    "configuration",
    (configurationObject: ConfigurationObject = {}) => {
      return {
        run(ctx: { configuration: ConfigurationObject }) {
          configuration.store = configurationObject
          ctx.configuration = configurationObject
        },
      }
    }
  )
  .register("containerRuntimes", (runtimes: string[] = []) => {
    return {
      run(ctx: { containerRuntimes: string[] }) {
        test.stub(lookpath, "lookpath", sinon.stub().returns(runtimes))
        ctx.containerRuntimes = runtimes
      },
    }
  })

export default testWithExtensions
