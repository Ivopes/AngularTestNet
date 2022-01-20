import { fabric } from "fabric";
import { PetriNetCanvasObjectOrder } from "../../bases/PetriNetCanvasObjectBase.model";
import { PlaceFabric } from "./PlaceFabric.model";
import { TransitionFabric } from "./TransitionFabric.model";

export class ArcFabric extends fabric.Line implements PetriNetCanvasObjectOrder {

  orderInCanvas: number = 50;

  objectFrom: PlaceFabric | TransitionFabric | undefined;
  objectTo: PlaceFabric | TransitionFabric | undefined;

  startFromPlace: boolean | undefined;

  constructor(objectFrom: PlaceFabric | TransitionFabric, x2: number, y2: number, objectTo: PlaceFabric | undefined, objObjects?: fabric.ILineOptions | undefined) {
    super([
      objectFrom.left!,
      objectFrom.top!,
      x2,
      y2],
      objObjects
    );

    this.startFromPlace = objectFrom instanceof PlaceFabric

    this.objectFrom = objectFrom;

    if (objectTo) {
      if (this.startFromPlace && objectTo instanceof PlaceFabric) {
        throw new Error('Wrong end point object type, based on start');
      }
      this.objectTo = objectTo;
    }
  }

  override _render(ctx: CanvasRenderingContext2D): void {
    super._render(ctx);

    // Set selection are to minimum
    let padd = Math.max(this.width!, this.height!);
    this.padding = -padd / 2;

    let points = this.calcLinePoints();

    this.canvas_arrow(ctx, 0, 0, points.x2 *0.2,points.y2*.2);
  }

  canvas_arrow(context: CanvasRenderingContext2D, fromx: any, fromy: any, tox: any, toy: any) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
  }

  canConnect(connectTo: fabric.Object): boolean {

    if (!this.objectFrom) {
      return true;
    }
    if (this.objectFrom instanceof PlaceFabric) {
      return connectTo instanceof TransitionFabric;
    }
    if (this.objectFrom instanceof TransitionFabric) {
      return connectTo instanceof PlaceFabric
    }

    return false;
  }

  static canConnectFrom(connectTo: fabric.Object) {
    return connectTo instanceof PlaceFabric || connectTo instanceof TransitionFabric;
  }
}
