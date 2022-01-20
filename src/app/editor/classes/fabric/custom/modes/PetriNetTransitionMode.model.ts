import { IEvent } from "fabric/fabric-impl";
import { PetriNetCanvasModeBase } from "../../bases/PetriNetCanvasModeBase.model";
import { TransitionFabric } from "../objects/TransitionFabric.model";

export class PetriNetTransitionMode extends PetriNetCanvasModeBase {

  transitionToDraw: TransitionFabric | undefined;

  onEnter(): void {

  }
  onExit(): void {
    if (this.transitionToDraw) {
      this.ctx.remove(this.transitionToDraw);
      //this.ctx.places.pop();
      this.transitionToDraw = undefined;
    }
  }
  onMouseDown(e: IEvent<MouseEvent>): void {
    if (this.transitionToDraw) {
      this.ctx.transitions.push(this.transitionToDraw!);
      this.transitionToDraw = undefined;
    }
  }
  onMouseUp(e: IEvent<MouseEvent>): void {
  }
  onMouseMove(e: IEvent<MouseEvent>): void {
    if (!this.transitionToDraw) {
      this.transitionToDraw = new TransitionFabric(e.pointer?.x!, e.pointer?.y!);
      this.transitionToDraw.canvas = this.ctx;

      this.ctx.add(this.transitionToDraw);
    }

    this.transitionToDraw.set({
      left: e.pointer?.x!,
      top: e.pointer?.y!
    });

    this.transitionToDraw.setCoords();
    this.ctx.requestRenderAll();
  }

}
