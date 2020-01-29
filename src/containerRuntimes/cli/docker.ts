import { ContainerRuntimeCLI } from "./types"

const DockerCLI: ContainerRuntimeCLI = {
  executable: "docker",
  options: {
    entrypoint: "--entrypoint",
    environment: "--env",
    port: "--publish",
    workingDirectory: "--workdir",
    volume: "--volume",
  },
}

export default DockerCLI
