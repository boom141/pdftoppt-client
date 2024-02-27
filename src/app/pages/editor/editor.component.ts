import { Component, OnInit } from '@angular/core';
import { EditorService, presentationSlides } from 'src/app/services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
})

export class EditorComponent implements OnInit {
    currentTool?: string | null;
    
    constructor(private editor: EditorService){}

    ngOnInit(): void {  
      this.editor.initCanvas();
    }

    renderSlides(): any {
      return this.editor.slides
    }

    addSlides(): void{
      this.editor.slides = [...this.editor.slides as presentationSlides[], this.editor.createSlides()]
      this.editor.saveSlidesData();
    }

    selectTool(e: MouseEvent):void {
      let target = e.target as HTMLElement;
      this.currentTool = target.id;
      console.log(this.currentTool)
    }
    
} 
