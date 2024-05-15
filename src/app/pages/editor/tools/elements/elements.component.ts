import { Component, OnInit, Input } from '@angular/core';
import { EditorService } from '../../../../shared/services/editor.service';
import { ApiReqService } from '../../../../shared/services/apiReq.service';
import { firstValueFrom } from 'rxjs';
import { ToolContentComponent } from '../../../../shared/components/tool-content/tool-content.component';

import SlideData from '../../../../shared/types';
@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [
    ToolContentComponent
  ],
  templateUrl: './elements.component.html',
})

export class ElementsComponent implements OnInit{
  @Input() currentTool?: string

  isLoading: boolean = true;
  data?: Array<any>

  constructor(
    private editor: EditorService,
    private api: ApiReqService
  ){}
  
  async ngOnInit(): Promise<void> {
    // if(this.currentTool == 'elements'){
    //   let response = await firstValueFrom(this.api.getElemets())
    //   if(response.success){
    //     this.data = response.data
    //     this.isLoading = false
    //   }else{
    //     this.isLoading = false
    //   }
    // }
  }

  async getElementSource(src: string): Promise<void>{
    let elementProps: SlideData.ImageProps = {
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

    this.editor.registerObjectToSlide(elementProps)
    this.editor.renderElem(elementProps)
  }
}
