import { Component, OnInit, Input } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';
import { ApiReqService } from '../../../../services/apiReq.service';
import { firstValueFrom } from 'rxjs';
import { ToolContentComponent } from '../../../../shared/components/tool-content/tool-content.component';

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
    if(this.currentTool == 'elements'){
      let response = await firstValueFrom(this.api.getElemets())
      if(response.success){
        this.data = response.data
        this.isLoading = false
      }else{
        console.log(response.message)
      }
    }
  }

  getElementSource(event: MouseEvent): void{
    let target = event.target as HTMLImageElement;

    let element: any = {
      type: 'element',
      src: target.src,
      properties: {
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
    this.editor.applyEdit()
  }
}
