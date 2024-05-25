import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditorService } from '../../../shared/services/editor.service';
import { ApiReqService } from '../../../shared/services/apiReq.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-container',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './slide-container.component.html', 
})
export class SlideContainerComponent{
  @Input() id: string | number | null = 0
  @Input() thumbnail: string | null | any = ''
  @Output() changeActiveSlide = new EventEmitter()

  constructor(
    private editor: EditorService,
    private api: ApiReqService
  ){}

  onChangeSlide(): void{
    this.editor.clearCanvas()
    if(this.editor.slides?.[this.editor.currentSlide as number]){
      this.editor.saveSlidesData()
    }
    this.editor.currentSlide = Number(this.id) as number
    console.log(this.editor.currentSlide)
    this.changeActiveSlide.emit(true)
    
    this.editor.initRender()
    
  }
}
