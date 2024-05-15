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
    SlideContainerComponent
  ],
  providers: [
    ApiReqService,
    EditorService
  ]
})

export class EditorComponent implements OnInit {
    isToolContent: boolean = true;
    currentTool?: string = 'uploadElem'
    pickerColor: string = '#FFFFFF'
    entity: string | null = 'canvas';
    canvasColor?: string;


    constructor(
      private editor: EditorService,
      private api: ApiReqService
    ){
''
    }  

    async ngOnInit(): Promise<void> {  
      // let response = await firstValueFrom(this.api.extractImages(3))
      // console.log(response)

      this.editor.loadTemplate(0)
      this.editor.initCanvas();
      this.pickerColor = this.editor.slides?.[0].backgroundColor as string;
      
      this.editor.initRender();
    }
    

    async export(): Promise<void> {
      let slidesData = this.editor.getSlidesData()
      console.log(await firstValueFrom(this.api.exportPresentation({data: slidesData})))
    }

    renderSlides(): any {
      return this.editor.slides
    }

    addSlides(): void{
      this.editor.slides = [...this.editor.slides as any, this.editor.createSlides()]
      this.editor.saveSlidesData();
    }

    openToolContent(){
      this.isToolContent = !this.isToolContent
    } 

    selectTool(e: MouseEvent):void {
      let target = e.target as HTMLElement;
      this.currentTool = target.id;
    }
    
    canvasEvent():void {
      this.editor.updateCanvasData()
    }

} 
