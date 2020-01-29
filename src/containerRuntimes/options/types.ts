export interface ContainerRuntimeOptions {
  entrypoint: string
  environment: Record<string, string>
  port: Record<number, number>
  workingDirectory: string
  volume: Record<string, string>
}
