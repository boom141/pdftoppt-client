import { Component, OnInit } from '@angular/core';
import { EditorService, presentationSlides } from 'src/app/services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
})

export class EditorComponent implements OnInit {
    currentTool?: string | null;
    pickerColor: string = '#FFFFFF'
    entity: string = 'canvas';
    canvasColor?: string;

    constructor(private editor: EditorService){}

    ngOnInit(): void {  
      this.editor.initCanvas();
      this.pickerColor = this.editor.slides?.[0].backgroundColor as string;
      this.editor.initRender();
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
          this.editor.canvas.backgroundColor = this.pickerColor
          this.editor.updateCanvasData()
        }
        this.editor.canvas.renderAll()
      }
    }

    canvasEvent():void {
      let objects: any = this.editor.objectsSelection();
      if(objects.length > 0){
        if('text' in objects[objects.length - 1]){
          this.entity = 'text';
        }else{
          this.entity = 'element';
        }
      }else{
        this.entity = 'canvas'
      }

      this.editor.updateCanvasData()
    }

} 
