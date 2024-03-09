import { Component, OnInit } from '@angular/core';
import { EditorService, presentationSlides } from 'src/app/services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
})

export class EditorComponent implements OnInit {
    currentTool?: string | null;
    pickerColor: string = '#FFFFFF'
    
    constructor(private editor: EditorService){}

    ngOnInit(): void {  
      this.editor.initCanvas();
      this.editor.render();
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
    }
    
    changeCanvasBgColor(): void {
      if(this.editor.canvas){
        if(this.editor.slides){
          this.editor.slides[this.editor.currentSlide].backgroundColor = this.pickerColor
          this.editor.updateCanvasData()
        }
        this.editor.clearCanvas()
        this.editor.render()
      }
    }

    canvasEvent():void {
      let [objects] = this.editor.objectsSelection();
      let object = Object.assign({}, objects);
      console.log(object);
    }

} 
