import { ContainerRuntimeCLI } from "./types"

const PodmanCLI: ContainerRuntimeCLI = {
  executable: "podman",
  subCommand: "run",
  options: {
    entrypoint: "--entrypoint",
    environment: "--env",
    interactive: "--interactive",
    port: "--publish",
    workingDirectory: "--workdir",
    tty: "--tty",
    volume: "--volume",
  },
}

export default PodmanCLI
