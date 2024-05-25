import { Component, Input, OnInit} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiReqService } from '../../../../shared/services/apiReq.service';
import { EditorService } from '../../../../shared/services/editor.service';
import { ToolContentComponent } from '../../../../shared/components/tool-content/tool-content.component';
import { PlaceholderComponent } from '../../../../shared/components/placeholder/placeholder.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

// create a service file for elements (eg: elements.service)
// re-create the uplaod feature

@Component({
  selector: 'app-upload-elements',
  standalone: true,
  imports: [
    ToolContentComponent,
    PlaceholderComponent,
    CommonModule,
    MatTabsModule
  ],
  templateUrl: './upload-elements.component.html',
})

export class UploadElementsComponent implements OnInit {
    @Input() currentTool?: string 

    pageLimit: any
    clickPageOption = false
    isFileSelected: boolean = false
    isLoading: boolean = false;
    imageData?: Array<any>
    textData?: Array<any>

    constructor(
      private api: ApiReqService,
      private editor: EditorService
    ){}

    ngOnInit(): void{
      this.editor.setData.subscribe((res:any) =>{
        this.imageData = this.editor.imagesFromUpload
        this.textData = this.editor.textsFromUpload
      })
      if(this.editor.imagesFromUpload){
        this.imageData = this.editor.imagesFromUpload
      }
      if(this.editor.textsFromUpload){
        this.textData = this.editor.textsFromUpload
      }
    }

    // async onSelectFile(e: Event){
    //   this.isLoading = true
    //   let target = e.target as HTMLInputElement
    //   let file = target.files?.[0];

    //   let newForm = new FormData()
    //   newForm.append('file', file as Blob)

    //   let response = await firstValueFrom(this.api.uploadFile(newForm as FormData))
    //   if(response.success){
    //     this.data = response.data
    //     this.isFileSelected = true
    //     this.isLoading = false
    //   }else{
        
    //     this.isLoading = false
    //   }
    // };

    getPageLimit(event: Event): void{
      let target = (event.target as HTMLInputElement)
      this.pageLimit = target.id
    }

    // async generatePresentation(){
    //   // this.isLoading = true
    //   // let params = 'pageLimit=' + 3
    //   // let response = await firstValueFrom(this.api.extractContent(params))
    //   // if(response.success){
    //   //   this.data = response.data
    //   //   console.log(response.data)
    //   //   this.isLoading = false
    //   // }else{
    //   //   this.isLoading = false
    //   // }
    // }

    selectedTempalate(id:any){
      this.editor.loadTemplate(id)
    }

    getElementSource(src: string): void{
      let elementProps: any = {
          id: this.editor.createId(),
          src: src,
          type: 'image',
          left: 100,
          top: 100,
          scaleX: 1,
          scaleY: 1,
          flipX: false,
          flipY: false,
          angle: 0
      }
  
      this.editor.registerObjectToSlide(elementProps)
      this.editor.renderElem(elementProps)
    }

    addContent(event: Event){
      let target = (event.target as HTMLElement)
      const newTextObject = {
        id: this.editor.createId(),
        type: 'text',
        text: target.innerText,
        textType: 'body',
        width: 800,
        height: 100,
        fontFamily: 'arial',
        fontWeight: 'normal',
        fontSize: 30,      
        scaleX: 0.5,
        scaleY: 0.5,
        cursorColor: 'blue',
        left: 200,
        top: 150,
        textAlign: 'center',
        fill: '#000000',
        angle: 0 
      }

      this.editor.registerObjectToSlide(newTextObject)
      this.editor.renderText(newTextObject)
    }
}

