import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorContextComponent } from './editor-context/editor-context.component';
import { EditorSmarterComponent } from './editor/editor-smarter/editor-smarter.component';

const routes: Routes = [
  { path: 'editorSmart', component: EditorSmarterComponent },
  { path: 'editorContext', component: EditorContextComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
