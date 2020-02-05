import { expect } from "@oclif/test"
import * as lookpath from "lookpath"
import sinon from "sinon"
import test from ".."
import { detectContainerRuntimes } from "../../src/configuration"

describe("detectContainerRuntimes", () => {
  test
    .stub(lookpath, "lookpath", () => Promise.resolve(undefined))
    .it("works with no runtimes", async () => {
      const runtimes = await detectContainerRuntimes()
      expect(runtimes).to.have.lengthOf(0)
      expect(runtimes).to.deep.equal([])
    })

  test
    .stub(
      lookpath,
      "lookpath",
      sinon
        .stub()
        .onFirstCall()
        .resolves("/bin/docker")
        .resolves(undefined)
    )
    .it("works with 1 runtime", async () => {
      const runtimes = await detectContainerRuntimes()
      expect(runtimes).to.have.lengthOf(1)
      expect(runtimes).to.deep.equal([{ exec: "docker", path: "/bin/docker" }])
    })

  test
    .stub(
      lookpath,
      "lookpath",
      sinon
        .stub()
        .onFirstCall()
        .resolves("/bin/docker")
        .onSecondCall()
        .resolves("/bin/podman")
        .resolves(undefined)
    )
    .it("works with 1 runtime", async () => {
      const runtimes = await detectContainerRuntimes()
      expect(runtimes).to.have.lengthOf(2)
      expect(runtimes).to.deep.equal([
        { exec: "docker", path: "/bin/docker" },
        { exec: "podman", path: "/bin/podman" },
      ])
    })

  const expectedError = new Error("mock error")
  test
    .stub(lookpath, "lookpath", sinon.stub().rejects(expectedError))
    .it("works with 1 runtime", () => {
      detectContainerRuntimes()
        .then(() => {
          throw new Error("expected error")
        })
        .catch(error => expect(expectedError).to.be.equal(error))
    })
})
