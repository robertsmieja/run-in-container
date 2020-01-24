import Conf from "conf"
import schema, { containerRuntimes, properties } from "./schema"
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
const initConfig = async () => {
  const config = new Conf({
    projectName: "run-in-container", // TODO why can't this be autodetected?
    schema,
  })
  const questions: inquirer.DistinctQuestion[] = []

  if (!config.has(properties.containerRuntime)) {
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
      config.set(key, answers[key])
    }
  }
}

export default initConfig
