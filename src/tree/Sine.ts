import { Assignments } from "..";
import { cos, INode, mult, value } from "./INode";

export class Sine implements INode {
  constructor(readonly a: INode) { }

  public eval(assign: Assignments): number {
    return Math.sin(this.a.eval(assign));
  }

  public derivative(withRespectTo: symbol): INode {
    return mult(cos(this.a), this.a.derivative(withRespectTo));
  }

  public degree(): Map<INode, number> {
    return new Map<INode, number>([[this, 1], [value(0), 1]]);
  }

  public coefficient(): [number, INode] {
    return [1, this];
  }

  public exponent(): [number, INode] {
    return [1, this];
  }

  public toString(indent = ""): string {
    return " sine" +
      "\n" + indent + " └" + this.a.toString(indent + "  ");
  }
}