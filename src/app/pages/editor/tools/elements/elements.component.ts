import { Component } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';
import { fabric } from 'fabric';

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
    fabric.Image.fromURL(target.src, img => {
      // Set image properties if needed (e.g., position, scale, etc.)
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.2,
        scaleY: 0.2
      });

      // Add the image to the canvas
      this.editor.canvas?.add(img);
    });
}
}