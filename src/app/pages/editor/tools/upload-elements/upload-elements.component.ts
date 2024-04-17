import { Component, Input, OnInit} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiReqService } from '../../../../services/apiReq.service';
import { EditorService } from '../../../../services/editor.service';
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
    @Input() formData?: FormData
    @Input() currentTool?: string 


    isLoading: boolean = true;
    data?: Array<any>

    constructor(
      private api: ApiReqService,
      private editor: EditorService
    ){}

    async ngOnInit(): Promise<void> {
      if(this.currentTool == 'uploadElem'){
        let response = await firstValueFrom(this.api.uploadFile(this.formData as FormData))
        if(response.success){
          this.data = response.data
          console.log(response.data)
          this.isLoading = false
        }else{
          console.log(response.message)
        }
      }
    }

    async getElementSource(src: string): Promise<void>{
      let element: any = {
        properties: {
          id: this.editor.createId(),
          src: src,
          type: 'element',
          left: 100,
          top: 100,
          scaleX: 0.2,
          scaleY: 0.2,
          flipX: false,
          flipY: false,
          angle: 0
        }
      }
  
      this.editor.registerObjectToSlide(element)
      this.editor.renderElem(element)
    }
}

