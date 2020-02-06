import { lookpath } from "lookpath"
import { mocked } from "ts-jest/utils"
import { detectContainerRuntimes } from "../../src/configuration"

jest.mock("lookpath")

describe("detectContainerRuntimes", () => {
  const lookpathMock = mocked(lookpath)

  it("works with no runtimes", async () => {
    lookpathMock.mockResolvedValueOnce((undefined as unknown) as string)

    const runtimes = await detectContainerRuntimes()

    expect(runtimes).toStrictEqual([])
  })

  it("works with 1 runtime", async () => {
    lookpathMock
      .mockResolvedValueOnce("/bin/docker")
      .mockResolvedValue((undefined as unknown) as string)

    const runtimes = await detectContainerRuntimes()
    expect(runtimes).toStrictEqual([{ exec: "docker", path: "/bin/docker" }])
  })

  it("works with 1 runtime", async () => {
    lookpathMock
      .mockResolvedValueOnce("/bin/docker")
      .mockResolvedValueOnce("/bin/podman")
      .mockResolvedValue((undefined as unknown) as string)

    const runtimes = await detectContainerRuntimes()
    expect(runtimes).toStrictEqual([
      { exec: "docker", path: "/bin/docker" },
      { exec: "podman", path: "/bin/podman" },
    ])
  })

  it("handles Errors", async () => {
    const expectedError = new Error("mock error")
    lookpathMock.mockRejectedValueOnce(expectedError)

    expect(detectContainerRuntimes()).rejects.toStrictEqual(expectedError)
  })
})
