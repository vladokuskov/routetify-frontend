export type IBoolean = 'true' | 'false'

export enum DrawType {
  None,
  Hand,
}

export enum LocationStatus {
  idle,
  fetching,
  success,
  error,
}

export enum Layer {
  default,
  satellite,
}
