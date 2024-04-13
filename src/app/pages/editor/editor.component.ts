import { Component, OnInit, inject } from '@angular/core';
import { ApiReqService } from '../../services/apiReq.service';
import { EditorService } from '../../services/editor.service';
import { ElementsComponent } from './tools/elements/elements.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editor',
  standalone: true,
  templateUrl: './editor.component.html',
  imports: [
    CommonModule,
    HttpClientModule,
    ElementsComponent,
  ],
  providers: [
    ApiReqService,
    EditorService
  ]
})

export class EditorComponent implements OnInit {
    isToolContent: boolean = true;
    currentTool?: string = 'elements';
    pickerColor: string = '#FFFFFF'
    entity: string | null = 'canvas';
    canvasColor?: string;
    newForm?: FormData


    constructor(
      private editor: EditorService,
      private api: ApiReqService
    ){

    }

    ngOnInit(): void {  
      this.editor.initCanvas();
      this.pickerColor = this.editor.slides?.[0].backgroundColor as string;
      this.editor.initRender();
    }
    
    async onSelectFile(e: Event){
      let target = e.target as HTMLInputElement
      let file = target.files?.[0];

      this.newForm = new FormData()
      this.newForm.append('file', file as Blob)

      this.isToolContent = true

    };

    renderSlides(): any {
      return this.editor.slides
    }

    // addSlides(): void{
    //   this.editor.slides = [...this.editor.slides as presentationSlides[], this.editor.createSlides()]
    //   this.editor.saveSlidesData();
    // }

    openToolContent(){
      this.isToolContent = !this.isToolContent
    } 

    selectTool(e: MouseEvent):void {
      let target = e.target as HTMLElement;
      this.currentTool = target.id;
      
      this.isToolContent = this.currentTool !== 'uploadElem' ? true : false
    }
    
    changeCanvasBgColor(): void {
      if(this.editor.canvas){
        if(this.editor.slides){
          this.editor.canvas.backgroundColor = this.pickerColor
          this.editor.applyEdit()
        }
      }
    }

    canvasEvent():void {
      this.editor.updateCanvasData()
    }

} 
