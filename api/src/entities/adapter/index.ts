export interface IAdapter {
  exposed: any;
}

export default class Adapter<T> implements IAdapter {
  public exposed: T;
  constructor(exposed: T) {
    this.exposed = exposed;
  }
}
