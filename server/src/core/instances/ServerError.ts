export default class ServerError extends Error {
  code: number | null;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
