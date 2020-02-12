import { ContainerRuntimeCLI } from "./types"

const DockerCLI: ContainerRuntimeCLI = {
  executable: "docker",
  subCommand: "run",
  options: {
    entrypoint: "--entrypoint",
    environment: "--env",
    interactive: "--interactive",
    port: "--publish",
    rm: "--rm",
    workingDirectory: "--workdir",
    tty: "--tty",
    volume: "--volume",
  },
}

export default DockerCLI
