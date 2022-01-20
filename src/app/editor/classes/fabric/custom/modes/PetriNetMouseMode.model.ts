import { IEvent } from "fabric/fabric-impl";
import { PetriNetCanvasModeBase } from "../../bases/PetriNetCanvasModeBase.model";

export class PetriNetMouseMode extends PetriNetCanvasModeBase {


  onEnter(): void {
    this.ctx.selection = true;

    // Set places properties
    this.ctx.places.forEach(place => {
      place.selectable = place.hasControls = place.hasBorders = true;
    });

    // Set arcs properties
    this.ctx.arcs.forEach(arc => {
    });

    // Set transitions properties
    this.ctx.transitions.forEach(tr => {
      tr.selectable = tr.hasControls = tr.hasBorders = true;
    });
  }
  onExit(): void {
    this.ctx.discardActiveObject().renderAll();

    this.ctx.selection = false;

    // Set places properties
    this.ctx.places.forEach(place => {
      place.selectable = place.hasControls = place.hasBorders = false;
    });

    // Set arcs properties
    this.ctx.arcs.forEach(arc => {
      // arc.selectable = false;
    });

    // Set transitions properties
    this.ctx.transitions.forEach(tr => {
      tr.selectable = tr.hasControls = tr.hasBorders = false;
    });
  }
  onMouseDown(e: IEvent<MouseEvent>): void {
    //throw new Error("Method not implemented.");
  }
  onMouseUp(e: IEvent<MouseEvent>): void {
   // throw new Error("Method not implemented.");
  }
  onMouseMove(e: IEvent<MouseEvent>): void {
    //throw new Error("Method not implemented.");
  }

}
