import { Component } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
})
export class TextComponent {


    constructor(private editor: EditorService){
      // initialization code here
    }

    generateHeading(): any{
      // this.fabric.createHeadingParagraph(this.fabric.canvas)
    }

    generateSubheading(): any{
      // this.fabric.createSubheadingParagraph(this.canvas)
    }

    generateParagraph(): any{
      // this.fabric.createBodyParagraph(this.canvas)
    }
    

}
