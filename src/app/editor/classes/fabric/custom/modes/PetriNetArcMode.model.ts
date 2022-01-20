import { IEvent, ILineOptions } from "fabric/fabric-impl";
import { PetriNetCanvasModeBase } from "../../bases/PetriNetCanvasModeBase.model";
import { ArcFabric } from "../objects/ArcFabric.model";

export class PetriNetArcMode extends PetriNetCanvasModeBase {

  arcToDraw: ArcFabric | undefined;

  arcLineOptions: ILineOptions = {
    hasBorders: false,
    hasControls: false,
    selectable: false,
    stroke: 'red',
    strokeWidth: 2,
    hoverCursor: 'default',
    canvas: this.ctx
  };

  onEnter(): void {
  }
  onExit(): void {
    if (this.arcToDraw) {
      this.ctx.remove(this.arcToDraw);
    }
  }
  onMouseDown(e: IEvent<MouseEvent>): void {
    // is there click object?
    if (e.target) {

      // Did I start drawing arc? no => true
      if (!this.arcToDraw) {

        // Is clicked object legitimate to start Arc
        if (ArcFabric.canConnectFrom(e.target)) {

          this.arcToDraw = new ArcFabric(
            e.target as any,
            e.pointer?.x!,
            e.pointer?.y!,
            undefined,
            this.arcLineOptions
          );
          this.arcToDraw.setCoords();
          this.ctx.add(this.arcToDraw);
        }
      } else {
        // Can arc connect to this endpoint?
        if (this.arcToDraw.canConnect(e.target)) {
          this.arcToDraw.set({
            x2: e.target.left!,
            y2: e.target.top!
          });
          this.arcToDraw.setCoords();

          this.arcToDraw.objectTo = e.target as any;

          this.ctx.arcs.push(this.arcToDraw);
          this.arcToDraw = undefined;
        }
      }


    }
    /*
    if (e.target && e.target instanceof PlaceFabric) {
      if (!this.arcToDraw) {


        this.arcToDraw = new ArcFabric(
          e.target,
          e.pointer?.x!,
          e.pointer?.y!,
          undefined,
          this.arcLineOptions
        );

        this.arcToDraw.setCoords();
        this.ctx.add(this.arcToDraw);

      } else {
        this.arcToDraw.set({
          x2: e.target.left!,
          y2: e.target.top!
        });
        this.arcToDraw.setCoords();
        this.arcToDraw.objectTo = e.target;
        this.ctx.arcs.push(this.arcToDraw);
        this.arcToDraw = undefined;
      }
    }*/
  }
  onMouseUp(e: IEvent<MouseEvent>): void {
   // throw new Error("Method not implemented.");
  }
  onMouseMove(e: IEvent<MouseEvent>): void {
    if (this.arcToDraw) {
      this.arcToDraw.set({
        x2: e.pointer?.x!,
        y2: e.pointer?.y!
      });
      this.arcToDraw.setCoords();
      this.ctx.requestRenderAll();
    }
  }


}
