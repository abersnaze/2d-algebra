import { Assignments, Expression, Substitutions } from "../Expression";
import { Format } from "../format";
import { InlineFormat } from "../format/InlineFormat";
import { cos, degreeSum, INode, mult, Identifier, sin } from "./index";

export class Sine implements INode {
  constructor(readonly a: INode) { }

  public op(): string {
    return undefined;
  }

  public eval(assign: Assignments): number {
    return Math.sin(this.a.eval(assign));
  }

  public apply(subs: Substitutions): INode {
    return sin(this.a.apply(subs));
  }

  public derivative(withRespectTo: Identifier): INode {
    return mult(cos(this.a), this.a.derivative(withRespectTo));
  }

  public degree(): Map<INode, number> {
    return new Map<INode, number>([[this, 1], [degreeSum, 1]]);
  }

  public coefficient(): [number, INode] {
    return [1, this];
  }

  public exponent(): [number, INode] {
    return [1, this];
  }

  public toString(indent = "", fmt = new InlineFormat()): string {
    return fmt.func(indent, "sin", this.a);
  }
}
