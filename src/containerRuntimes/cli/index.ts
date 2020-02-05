import DockerCLI from "./docker"
import PodmanCLI from "./podman"
import { ContainerRuntimeCLI } from "./types"

const ContainerRuntimeToCLI: Record<string, ContainerRuntimeCLI> = {
  docker: DockerCLI,
  podman: PodmanCLI,
}

export default ContainerRuntimeToCLI
