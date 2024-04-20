import { Component, Input } from '@angular/core';
import { EditorService } from '../../../../services/editor.service';


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

    addText(textObject: textProps): void{ 
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
          cursorColor: 'blue',
          left: 300,
          top: 170,
          fill: '#000000',
          angle: 0
        }
      
      this.addText(textProps)
    }

    addParagraph(): void {
      let textProps: any = {
          type: 'text',
          text: 'A little bit of body text',
          fontFamily: 'arial',
          fontWeight: 'normal',
          fontSize: 20,
          cursorColor: 'blue',
          left: 305,
          top: 210,
          fill: '#000000',
          angle: 0 
      }

      this.addText(textProps)
    }

}

interface textProps {
    id: number,
    type: string,
    text: string,
    width: number,
    height: number,
    fontFamily: string,
    fontWeight: string,
    fontSize: number,
    cursorColor: string,
    left: number,
    top: number
    fill: string
    angle: number
}