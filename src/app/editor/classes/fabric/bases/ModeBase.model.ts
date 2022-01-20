import { CustomCanvasBase } from "./CustomCanvasBase.model";

export abstract class ModeBase {

  name: string = '';

  abstract onEnter(): void;
  abstract onExit(): void;
  abstract onMouseDown(e: fabric.IEvent<MouseEvent>): void;
  abstract onMouseUp(e: fabric.IEvent<MouseEvent>): void;
  abstract onMouseMove(e: fabric.IEvent<MouseEvent>): void;
}
