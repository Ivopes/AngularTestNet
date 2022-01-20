import { fabric } from 'fabric';
import { ICanvasOptions, ILineOptions } from 'fabric/fabric-impl';
import { PetriNet } from '../../../data/PetriNet.model';
import { CustomCanvasBase } from '../../bases/CustomCanvasBase.model';
import { PetriNetCanvasModeBase } from '../../bases/PetriNetCanvasModeBase.model';
import { PetriNetCanvasObjectOrder } from '../../bases/PetriNetCanvasObjectBase.model';
import { ArcFabric } from '../objects/ArcFabric.model';
import { PlaceFabric } from '../objects/PlaceFabric.model';
import { TransitionFabric } from '../objects/TransitionFabric.model';

export class PetriNetCanvas extends CustomCanvasBase {

  petriNet: PetriNet | undefined = undefined;

  places: Array<PlaceFabric> = [];
  arcs: Array<ArcFabric> = [];
  transitions: Array<TransitionFabric> = [];

  constructor(element: HTMLCanvasElement | string | null, options?: ICanvasOptions) {
    super(element, options);

    this.configuration();

    this.places.push(new PlaceFabric(150,150));
    this.places.push(new PlaceFabric(150,250));
    this.places.push(new PlaceFabric(150,350));

    this.places.push(new PlaceFabric(500,150));
    this.places.push(new PlaceFabric(500,250));
    this.places.push(new PlaceFabric(500,350));

    this.transitions.push(new TransitionFabric(325,150));
    this.transitions.push(new TransitionFabric(325,250));
    this.transitions.push(new TransitionFabric(325,350));

    this.addSetup(this);

    this.on('mouse:down', (e: fabric.IEvent<MouseEvent>) => {
      this.onMouseDown(e);
    });
    this.on('mouse:move', (e: fabric.IEvent<MouseEvent>) => {
      this.onMouseMove(e);
    });
    this.on('mouse:up', (e: fabric.IEvent<MouseEvent>) => {
      this.onMouseUp(e);
    });
    this.on('object:moving', (e: fabric.IEvent<Event>) => {
      if (!e.target) {
        return;
      }
      this.arcs.forEach(arc => {
        if (arc.objectTo) {
          let from = arc.objectFrom?.calcTransformMatrix();
          let to = arc.objectTo?.calcTransformMatrix();

          arc.set({
            x1: from![4],
            y1: from![5],
            x2: to![4],
            y2: to![5]
          });
          arc.setCoords();
        }
      });
    })
    console.log(this.getObjects());
    this.drawGrid();
  }

  onMouseDown(e: fabric.IEvent<MouseEvent>) {
    if (this.selectedMode) {
      this.selectedMode.onMouseDown(e);
    }
  }
  onMouseUp(e: fabric.IEvent<MouseEvent>): void {
    if (this.selectedMode) {
      this.selectedMode.onMouseUp(e);
    }
  }
  onMouseMove(e: fabric.IEvent<MouseEvent>): void {
    if (this.selectedMode) {
      this.selectedMode.onMouseMove(e);
    }
  }


  addSetup(ctx: fabric.Canvas): void {
    ctx.add(...this.places);
    ctx.add(...this.transitions);
    ctx.add(...this.arcs);
  }

  changeMode(newMode: PetriNetCanvasModeBase): void {
    // Are modes the same?
    if (this.selectedMode?.constructor == newMode.constructor) {
      return;
    }

    this.selectedMode?.onExit();
    this.selectedMode = newMode;
    this.selectedMode.onEnter();

    console.log(this.places);
  }

  drawGrid(): void {
    let xOffset = 40;
    let yOffset = 40;
    let numberOfCols = this.width! / xOffset;
    let numberOfRows = this.height! / yOffset;

    let lineOptions: ILineOptions =  {
      strokeWidth: 1,
      stroke: '#AAA8',
      selectable: false,
      hasControls: false,
      hasBorders: false,
      hoverCursor: 'default'
    };

    for (let i = 1; i < numberOfCols; i++) {
      let line = new fabric.Line([i * xOffset, 0, i * xOffset, this.height!], lineOptions);
      line.canvas = this;

      this.add(line);
    }
    for (let i = 1; i < numberOfRows; i++) {
      let line = new fabric.Line([
        0,
        i * yOffset,
        this.width!,
        i * yOffset], lineOptions);
      line.canvas = this;

      this.add(line);
    }
  }

  sortObject(): void {
    let sorted = this.getObjects() as unknown as Array<PetriNetCanvasObjectOrder>;

    sorted.forEach(s => {
      if (!s.orderInCanvas) {
        s.orderInCanvas = -1;
      }
    })

    sorted = sorted.sort((a, b) => a.orderInCanvas - b.orderInCanvas);

    let sortedObjects = sorted as unknown as Array<fabric.Object>;

    sortedObjects.forEach(s => {
      this.bringToFront(s);
    });
  }
  override renderAll(): fabric.Canvas {
    this.sortObject();

    super.renderAll();

    return this;
  }
  override add(...object: fabric.Object[]): fabric.StaticCanvas {
    super.add(...object);

    this.renderAll();

    return this;
  }
  configuration(): void {
    this.preserveObjectStacking = true;
    this.stopContextMenu = true;
    //this.selectionFullyContained = true;
  }
}
