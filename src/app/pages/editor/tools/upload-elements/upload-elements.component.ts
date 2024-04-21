import { Component, Input, OnInit} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiReqService } from '../../../../shared/services/apiReq.service';
import { EditorService } from '../../../../shared/services/editor.service';
import { ToolContentComponent } from '../../../../shared/components/tool-content/tool-content.component';

// create a service file for elements (eg: elements.service)
// re-create the uplaod feature

@Component({
  selector: 'app-upload-elements',
  standalone: true,
  imports: [
    ToolContentComponent
  ],
  templateUrl: './upload-elements.component.html',
})

export class UploadElementsComponent implements OnInit {
    @Input() currentTool?: string 

    isFileSelected: boolean = false
    isLoading: boolean = true;
    data?: Array<any>

    constructor(
      private api: ApiReqService,
      private editor: EditorService
    ){}

    ngOnInit(): void{

    }

    async onSelectFile(e: Event){
      this.isFileSelected = true

      let target = e.target as HTMLInputElement
      let file = target.files?.[0];

      let newForm = new FormData()
      newForm.append('file', file as Blob)

      let response = await firstValueFrom(this.api.uploadFile(newForm as FormData))
      if(response.success){
        this.data = response.data
        console.log(response.data)
        this.isLoading = false
      }else{
        this.isLoading = false
      }
      

    };

    async getElementSource(src: string): Promise<void>{
      let elementProps: any = {
          id: this.editor.createId(),
          src: src,
          type: 'elementProps',
          left: 100,
          top: 100,
          scaleX: 0.2,
          scaleY: 0.2,
          flipX: false,
          flipY: false,
          angle: 0
      }
  
      this.editor.registerObjectToSlide(elementProps)
      this.editor.renderElem(elementProps)
    }
}

