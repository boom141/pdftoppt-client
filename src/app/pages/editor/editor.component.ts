import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ApiReqService } from '../../shared/services/apiReq.service';
import { EditorService } from '../../shared/services/editor.service';
import { ElementsComponent } from './tools/elements/elements.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EntityAttributesComponent } from './entity-attributes/entity-attributes.component';
import { UploadElementsComponent } from './tools/upload-elements/upload-elements.component';
import { TextComponent } from './tools/text/text.component';
import { firstValueFrom } from 'rxjs';
import { SlideContainerComponent } from './slide-container/slide-container.component';


import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SAMPLE_IMAGE_DATA, SAMPLE_TEXT_DATA } from '../../../assets/data/00-sample-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  templateUrl: './editor.component.html',
  imports: [
    CommonModule,
    HttpClientModule,
    ElementsComponent,
    UploadElementsComponent,
    EntityAttributesComponent,
    TextComponent,
    SlideContainerComponent,
  ],
  providers: [
    ApiReqService,
    EditorService,
    Router
  ]
})

export class EditorComponent implements OnInit {
    isToolContent: boolean = true;
    currentTool?: string = 'uploadElem'
    pickerColor: string = '#FFFFFF'
    entity: string | null = 'canvas';
    canvasColor?: string;
    grid: number = 20
    activeSlide: number | null = 0

    constructor(
      private editor: EditorService,
      private api: ApiReqService,
      public dialog: MatDialog,
      private router: Router
    ){
    }  
    

    async ngOnInit(): Promise<void> {  
      this.dialog.open(DialogDialog, {
        disableClose: true
      })

      let response1 = await firstValueFrom(this.api.extractImages())
      console.log(response1.data)
      this.editor.imagesFromUpload = response1.data
      let response2 = await (firstValueFrom(this.api.extractTexts()))
      this.editor.textsFromUpload = response2.data
      this.editor.setData.emit(true)
      this.dialog.closeAll()

      // this.editor.imagesFromUpload = SAMPLE_IMAGE_DATA.data
      // this.editor.textsFromUpload = SAMPLE_TEXT_DATA[0].data
      // console.log(this.editor.imagesFromUpload)

      this.editor.initCanvas();
      this.pickerColor = this.editor.slides?.[0].backgroundColor as string;
      this.editor.initRender();
    }
    
    async export(): Promise<void> {
      this.dialog.open(DialogDialog, {
        disableClose: true
      })

      let slidesData = this.editor.getSlidesData()
      let response = await firstValueFrom(this.api.exportPresentation({data: slidesData}))
      this.dialog.closeAll()
      const base64Data = response.data; // Assuming response.data contains the base64 data

      // Convert the base64 data to a Blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
      
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
      
      // Create an anchor element for downloading the file
      const a = document.createElement('a');
      a.href = url;
      a.download = 'result.pptx'; // Specify the filename
      
      // Trigger the download by clicking on the anchor element
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }

    renderSlides(): any {
      return this.editor.slides
    }

    addSlides(): void{
      let newSlide = this.editor.createSlides()
      console.log('new slide', newSlide)
      this.editor.slides = [...this.editor.slides as any, newSlide]
      this.editor.saveSlidesData();
    }

    openToolContent(){
      this.isToolContent = !this.isToolContent
    } 

    selectTool(e: MouseEvent):void {
      let target = e.target as HTMLElement;
      this.currentTool = target.id;
    }
    
    selectActiveSlide(data:any){
      this.activeSlide = this.editor.currentSlide
    }

    back(){
      localStorage.clear()
      this.router.navigate([''])
    }

    removeSlide(){
      this.editor.slides = this.editor.slides?.filter((slide: any) => slide.number !== this.activeSlide)
      this.editor.slides = this.editor.slides?.map((slide:any,index) => {
        slide.number = index
        return slide
      })
      this.editor.slideCount--
      this.editor.saveSlidesData()
      this.editor.clearCanvas()
      this.editor.initRender()
    }

    canvasEvent():void {
      this.editor.canvas?.on('object:moving', (options:any) => {
        let obj = options.target;
        obj.set({
          left: Math.round(obj.left / this.grid) * this.grid,
          top: Math.round(obj.top / this.grid) * this.grid
        });
      });
      this.editor.updateCanvasData()
    }

} 


@Component({
  selector: 'dialog-dialog',
  templateUrl: './dialog-dialog.html',
  standalone: true,
  imports: [],
})
export class DialogDialog {}