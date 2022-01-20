import { fabric } from 'fabric';
import { ModeBase } from './ModeBase.model';

export abstract class CustomCanvasBase extends fabric.Canvas {

  selectedMode: ModeBase | undefined;

  abstract changeMode(newMode: ModeBase): void;

  abstract onMouseDown(e: fabric.IEvent<MouseEvent>): void;
  abstract onMouseUp(e: fabric.IEvent<MouseEvent>): void;
  abstract onMouseMove(e: fabric.IEvent<MouseEvent>): void;
}
