import { load } from "@oclif/config"
import { mocked } from "ts-jest/utils"
import { initConfig } from "../../src/configuration"

jest.mock("../../src/configuration")

const initConfigMock = mocked(initConfig)

describe("init", () => {
  it(`calls initConfig with { rerun: true }`, async () => {
    const config = await load()
    await config.runCommand("init")

    expect(initConfigMock).toBeCalledTimes(1)
    expect(initConfigMock).toBeCalledWith({ rerun: true })
  })
})
