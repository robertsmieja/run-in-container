import { expect } from "@oclif/test"
import test from ".."
import * as configuration from "../../src/configuration"
import * as initHook from "../../src/hooks/init"
import sinon, { SinonStub } from "sinon"

describe("init", () => {
  test
    .stub(initHook, "default", sinon.stub()) // prevent initConfig from being called here
    .stub(configuration, "initConfig", sinon.stub())
    .command(["init"])
    .it(`calls initConfig with { rerun: true }`, () => {
      const initConfigStub = configuration.initConfig as SinonStub
      expect(initConfigStub.called).to.equal(true)
      expect(initConfigStub.calledOnce).to.equal(true)
      expect(
        initConfigStub.calledOnceWithExactly(sinon.match({ rerun: true }))
      ).to.equal(true)
    })
})
