import { Component, Input } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
})
export class SlidesComponent {
   @Input() slideId?: number;
   @Input() thumbnail?: string | null;

   constructor(private editor: EditorService){}

  setCurrentSlide(): void{
    this.editor.updateCanvasData()
    this.editor.clearCanvas()
    this.editor.currentSlide = this.slideId as number
    this.editor.initRender()
  }
}
