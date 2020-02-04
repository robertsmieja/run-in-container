import Conf from "conf"
import { ContainerRuntimes, Properties, Schema } from "./schema"
import { lookpath } from "lookpath"
import inquirer, { ListQuestion } from "inquirer"

const configuration = new Conf<string>({
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

  if (rerun || !configuration.has(Properties.containerRuntime)) {
    const runtimes = await detectContainerRuntimes()

    questions.push({
      name: Properties.containerRuntime,
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

export default configuration
