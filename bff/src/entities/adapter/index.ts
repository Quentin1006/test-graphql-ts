import { IAdapter } from "../../typings";

export default class Adapter<T> implements IAdapter {
  public exposed: T;
  constructor(exposed: T) {
    this.exposed = exposed;
  }
}
