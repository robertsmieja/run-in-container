import Conf from "conf"
import { containerRuntimes, properties, schema } from "./schema"
import { lookpath } from "lookpath"
import inquirer, { ListQuestion } from "inquirer"

const detectContainerRuntimes = async () => {
  const runtimes = []
  for (const runtime of Object.keys(containerRuntimes)) {
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
const configuration = new Conf<string>({
  projectName: "run-in-container", // TODO why can't this be autodetected?
  schema,
})

export const initConfig = async (options = { rerun: false }) => {
  const { rerun } = options
  const questions: inquirer.DistinctQuestion[] = []

  if (rerun || !configuration.has(properties.containerRuntime)) {
    const runtimes = await detectContainerRuntimes()

    questions.push({
      name: properties.containerRuntime,
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
