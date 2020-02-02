import { ContainerRuntimeCLI } from "./types"

const PodmanCLI: ContainerRuntimeCLI = {
  executable: "podman",
  subCommand: "run",
  options: {
    entrypoint: "--entrypoint",
    environment: "--env",
    port: "--publish",
    workingDirectory: "--workdir",
    volume: "--volume",
  },
}

export default PodmanCLI
