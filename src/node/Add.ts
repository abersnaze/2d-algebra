import { Assignments, Substitutions } from "../Expression";
import { add, INode, Identifier } from "./index";

export class Add implements INode {
  constructor(readonly a: INode, readonly b: INode) { }

  public eval(assign: Assignments): number {
    return this.a.eval(assign) + this.b.eval(assign);
  }

  public apply(subs: Substitutions): INode {
    return add(this.a.apply(subs), this.b.apply(subs));
  }

  public derivative(withRespectTo: Identifier): INode {
    const da = this.a.derivative(withRespectTo);
    const db = this.b.derivative(withRespectTo);
    return add(da, db);
  }

  public degree(): Map<INode, number> | undefined {
    return undefined;
  }

  public coefficient(): [number, INode] {
    return [1, this];
  }

  public exponent(): [number, INode] {
    return [1, this];
  }

  public toString(indent = ""): string {
    return "+" +
      "\n" + indent + "├ " + this.a.toString(indent + "│ ") +
      "\n" + indent + "└ " + this.b.toString(indent + "  ");
  }
}
