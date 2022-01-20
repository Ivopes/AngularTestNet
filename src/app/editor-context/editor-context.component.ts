import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-editor-context',
  templateUrl: './editor-context.component.html',
  styleUrls: ['./editor-context.component.scss']
})
export class EditorContextComponent implements OnInit {

  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger | undefined;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor() { }

  ngOnInit(): void {
  }

  onRightClick(event: MouseEvent): void {
    event.preventDefault();

    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';

    this.matMenuTrigger?.openMenu();
  }
}
