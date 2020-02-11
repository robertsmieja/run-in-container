import Conf from "conf"
import inquirer, { ListQuestion } from "inquirer"
import { lookpath } from "lookpath"
import { ContainerRuntimes, Schema, SchemaProperties } from "./schema"

const configuration = new Conf<string | object | boolean>({
  projectName: "run-in-container", // TODO why can't this be autodetected?
  schema: Schema,
})

export const detectContainerRuntimes = async () => {
  const runtimes = []
  for (const runtime of Object.keys(ContainerRuntimes)) {
    // eslint-disable-next-line no-await-in-loop
    const runtimePath = await lookpath(runtime)

    if (runtimePath) {
      runtimes.push({
        exec: runtime,
        path: runtimePath,
      })
    }
  }

  return runtimes
}

export const initConfig = async (options = { rerun: false }) => {
  const { rerun } = options
  const questions: inquirer.DistinctQuestion[] = []

  if (rerun || !configuration.has(SchemaProperties.containerRuntime)) {
    const runtimes = await detectContainerRuntimes()

    questions.push({
      name: SchemaProperties.containerRuntime,
      message: "Which container runtime should be the default?",
      type: "list",
      choices: runtimes.map(({ exec, path }) => {
        return {
          name: `${exec} - ${path}`,
          value: exec,
          short: exec,
        }
      }),
    } as ListQuestion)
  }

  if (questions.length !== 0) {
    const answers = await inquirer.prompt(questions)

    for (const key of Object.keys(answers)) {
      configuration.set(key, answers[key])
    }
  }
}

export type ConfigurationType = typeof configuration

export default configuration
