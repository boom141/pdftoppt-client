import { Component, Input } from '@angular/core';
import { EditorService } from '../../../../shared/services/editor.service';

import SlideData from '../../../../shared/types';

@Component({
  selector: 'app-text',
  standalone: true,
  templateUrl: './text.component.html',
})
export class TextComponent  {
    //optimize code
    @Input() currentTool?: string

    isContentLoading: boolean = true;
    isContentReady: boolean = false

    constructor(private editor: EditorService){}

    addText(textObject: SlideData.TextProps): void{ 
      textObject.id = this.editor.createId();
      this.editor.registerObjectToSlide(textObject)
      this.editor.renderText(textObject)
    }

    addHeading(): void {
      let textProps: any = {
          type: 'text',
          text: 'A Heading',
          width: 300,
          height: 100,
          fontFamily: 'arial',
          fontWeight: 'normal',
          fontSize: 60,
          scaleX: 1,
          scaleY: 1,
          textAlign: 'left',
          cursorColor: 'blue',
          left: 250,
          top: 100,
          fill: '#000000',
          angle: 0
      }

      this.addText(textProps)
    }

    addSubheading(): void {
      let textProps: any = {
          type: 'text',
          text: 'A subheading',
          width: 200,
          height: 100,
          fontFamily: 'arial',
          fontWeight: 'normal',
          fontSize: 30,        
          scaleX: 1,
          scaleY: 1,
          cursorColor: 'blue',
          left: 300,
          top: 170,
          textAlign: 'left',
          fill: '#000000',
          angle: 0
        }
      
      this.addText(textProps)
    }

    addParagraph(): void {
      let textProps: any = {
          type: 'text',
          text: 'A little bit of body text',
          width: 200,
          fontFamily: 'arial',
          fontWeight: 'normal',
          scaleX: 0.5,
          scaleY: 0.5,
          cursorColor: 'blue',
          left: 305,
          top: 210,
          textAlign: 'left',
          fill: '#000000',
          angle: 0 
      }

      this.addText(textProps)
    }

}

