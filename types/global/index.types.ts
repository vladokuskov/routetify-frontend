export type IBoolean = 'true' | 'false'

export enum DrawType {
  None,
  Line,
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

export enum Route {
  GPX,
  KML,
}
