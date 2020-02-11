import { load } from "@oclif/config"
import { mocked } from "ts-jest/utils"
import configuration from "../../src/configuration"
import { spawnSync } from "child_process"
import { ContainerRuntimes } from "../../src/configuration/schema"
import { getDefaults } from "../../src/configuration/defaults"

jest.mock("child_process")
jest.mock("../../src/configuration")
jest.mock("../../src/configuration/defaults")

const configurationMock = mocked(configuration)
const spawnSyncMock = mocked(spawnSync)

describe("run", () => {
  configurationMock.get = jest.fn().mockReturnValue(ContainerRuntimes.docker)
  spawnSyncMock.mockReturnValue(jest.fn() as any)

  it(`handles no arguments`, async () => {
    const config = await load()
    await config.runCommand("run", [])

    expect(spawnSync).toBeCalledTimes(1)
    expect(spawnSync).toBeCalledWith("docker", ["run"], { stdio: "inherit" })
  })
})
