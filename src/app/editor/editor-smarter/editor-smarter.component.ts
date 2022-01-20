import { Component, OnDestroy, OnInit } from '@angular/core';
import { PetriNetArcMode } from '../classes/fabric/custom/modes/PetriNetArcMode.model';
import { PetriNetCanvas } from '../classes/fabric/custom/canvases/PetriNetCanvas.model';
import { PetriNetMouseMode } from '../classes/fabric/custom/modes/PetriNetMouseMode.model';
import { PetriNetPlaceMode } from '../classes/fabric/custom/modes/PetriNetPlaceMode.model';
import { fabric } from 'fabric';
import { PetriNetTransitionMode } from '../classes/fabric/custom/modes/PetriNetTransitionMode.model';


@Component({
  selector: 'app-editor-smarter',
  templateUrl: './editor-smarter.component.html',
  styleUrls: ['./editor-smarter.component.scss']
})
export class EditorSmarterComponent implements OnInit, OnDestroy{

  canvas: PetriNetCanvas | undefined = undefined;

  modes: string[] = [
    'mouse',
    'place',
    'arc',
    'transition'
  ]

  selected: string  = 'mouse';

  constructor() { }

  ngOnInit(): void {
    this.canvas = new PetriNetCanvas('fabricCanvas');
    this.canvas.changeMode(new PetriNetMouseMode(this.canvas));

    //this.canvas.add(new fabric.Circle({top:500, left:500, fill:'red', radius:20}));
    //this.canvas.renderAll();
  }
  ngOnDestroy(): void {
      this.canvas?.dispose();
  }
  changeCanvasMode(mode: string): void {
    switch(mode) {
      case 'mouse': {
        this.canvas?.changeMode(new PetriNetMouseMode(this.canvas));
        break;
      }
      case 'place': {
        this.canvas?.changeMode(new PetriNetPlaceMode(this.canvas));
        break;
      }
      case 'arc': {
        this.canvas?.changeMode(new PetriNetArcMode(this.canvas));
        break;
      }
      case 'transition': {
        this.canvas?.changeMode(new PetriNetTransitionMode(this.canvas));
        break;
      }
    }
    this.selected = mode;
  }
}
