import { fabric } from "fabric";
import { Place } from "../../../data/Place.model";
import { PetriNetCanvasObjectOrder } from "../../bases/PetriNetCanvasObjectBase.model";

export class PlaceFabric extends fabric.Circle implements PetriNetCanvasObjectOrder {

  place: Place | undefined = undefined;

  orderInCanvas: number = 100;

  constructor(left: number, top: number) {
    super({
      left: left,
      top: top,
      radius: 30,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 5,
      originX: 'center',
      originY: 'center',
      selectable: false,
      hasControls: false,
      hasBorders: false,
      hoverCursor: 'default',
      borderColor: 'red',
      cornerColor: 'red',
    });
  }
}
