import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
})
export class SlidesComponent implements OnInit{
   @Input() slideId?: number;
   @Input() thumbnail?: string;

  constructor(private editor: EditorService){}
  
  ngOnInit(): void {

  }

  setCurrentSlide(): void{
    this.editor.updateCanvasData()
    this.editor.clearCanvas()
    this.editor.currentSlide = this.slideId as number
    this.editor.initRender()
  }
}
