import { Component, Input } from '@angular/core';
import { EditorService } from '../../../shared/services/editor.service';
import { ApiReqService } from '../../../shared/services/apiReq.service';

@Component({
  selector: 'app-slide-container',
  standalone: true,
  imports: [],
  templateUrl: './slide-container.component.html', 
})
export class SlideContainerComponent {
  @Input() id: string | number | null = 0

  constructor(
    private editor: EditorService,
    private api: ApiReqService
  ){}

  onChangeSlide(): void{
    this.editor.clearCanvas()
    this.editor.currentSlide = Number(this.id) as number
    this.editor.initRender()
  }
}
