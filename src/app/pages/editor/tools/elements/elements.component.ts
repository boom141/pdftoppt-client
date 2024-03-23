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
    let target = event.target as HTMLImageElement;
    console.log(target)
    let element: any = {
      type: 'element',
      src: target,
      properties: {
        left: 100,
        top: 100,
        scaleX: 0.2,
        scaleY: 0.2
      }
    }

    this.editor.registerObjectToSlide(element)
    this.editor.renderElem(element)
    this.editor.applyEdit()
  }
}
