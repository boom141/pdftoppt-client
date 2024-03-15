import { Component } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
})

export class ElementsComponent {
  
  constructor(private editor: EditorService){
    // initialization code here
  }


  getElementSource(event: MouseEvent): void{
    let target = event.target as HTMLInputElement;
    let element = {
      type: 'image',
      src: target.src,
      options: {
        left: 100,
        top: 100,
        scaleX: 0.2,
        scaleY: 0.2
      }
    }

    this.editor.slides?.[this.editor.currentSlide as number].objects.push(element)
    this.editor.saveSlidesData()
    this.editor.initRender()

  }
}