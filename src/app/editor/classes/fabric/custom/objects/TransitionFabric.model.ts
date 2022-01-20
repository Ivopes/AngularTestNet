import { fabric } from 'fabric';
import { PetriNetCanvasObjectOrder } from '../../bases/PetriNetCanvasObjectBase.model';

export class TransitionFabric extends fabric.Rect implements PetriNetCanvasObjectOrder {

  orderInCanvas: number = 100;

  /**
   *
   */
  constructor(left: number, top: number) {
    super({
      left: left,
      top: top,
      fill: 'black',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hasControls: false,
      hasBorders: false,
      hoverCursor: 'default',
      width: 10,
      height: 40,
      padding: 10,
      borderColor: 'red',
      cornerColor: 'red',
      cornerStyle: 'circle'
    });
  }
}
