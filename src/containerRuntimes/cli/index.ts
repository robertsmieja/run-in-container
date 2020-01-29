import PodmanCLI from "./podman"
import DockerCLI from "./docker"
import { ContainerRuntimeCLI } from "./types"

const ContainerRuntimeToCLI: Record<string, ContainerRuntimeCLI> = {
  docker: DockerCLI,
  podman: PodmanCLI,
}

export default ContainerRuntimeToCLI
