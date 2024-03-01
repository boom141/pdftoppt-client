import { Component, Input } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';
import { fabric } from 'fabric';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
})
export class SlidesComponent {
   @Input() slideId?: number;
   @Input() thumbnail?: string | null;

   constructor(private editor: EditorService){
    // initialization code here
  }

  setCurrentSlide(): void{
    this.editor.currentSlide = this.slideId
    this.editor.render()
  }
}
