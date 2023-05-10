export type IBoolean = 'true' | 'false'

export enum DrawType {
  None,
  Road,
  Hand,
}

export enum LocationStatus {
  idle,
  fetching,
  success,
  error,
}
