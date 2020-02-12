export interface ContainerRuntimeOptions {
  entrypoint: string
  environment: Record<string, string>
  interactive: string
  port: Record<number, number>
  rm: string
  tty: string
  volume: Record<string, string>
  workingDirectory: string
}
