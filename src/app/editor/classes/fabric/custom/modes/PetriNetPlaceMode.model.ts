import { IEvent } from "fabric/fabric-impl";
import { PetriNetCanvasModeBase } from "../../bases/PetriNetCanvasModeBase.model";
import { PlaceFabric } from "../objects/PlaceFabric.model";

export class PetriNetPlaceMode extends PetriNetCanvasModeBase {

  placeToDraw: PlaceFabric | undefined;

  onEnter(): void {
    //throw new Error("Method not implemented.");
  }
  onExit(): void {
    if (this.placeToDraw) {
      this.ctx.remove(this.placeToDraw);
      //this.ctx.places.pop();
      this.placeToDraw = undefined;
    }
  }
  onMouseDown(e: IEvent<MouseEvent>): void {
    if (this.placeToDraw) {
      this.ctx.places.push(this.placeToDraw!);
      this.placeToDraw = undefined;
    }
  }
  onMouseUp(e: IEvent<MouseEvent>): void {
    //throw new Error("Method not implemented.");
  }
  onMouseMove(e: IEvent<MouseEvent>): void {
    if (!this.placeToDraw) {
      this.placeToDraw = new PlaceFabric(e.pointer?.x!, e.pointer?.y!);
      this.placeToDraw.canvas = this.ctx;

      this.ctx.add(this.placeToDraw);

    }

    this.placeToDraw.set({
      left: e.pointer?.x!,
      top: e.pointer?.y!
    });

    this.placeToDraw.setCoords();
    this.ctx.requestRenderAll();
  }
}
