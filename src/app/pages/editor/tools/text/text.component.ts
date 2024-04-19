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
      textObject.properties.selected = true

      this.editor.registerObjectToSlide(textObject)
      this.editor.renderText(textObject)
    }

    addHeading(): void {
      let heading: any = {
        type: 'text',
        text: 'A Heading',
        properties: {
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
      }

      this.addText(heading)
    }

    addSubheading(): void {
      let subheading: any = {
        type: 'text',
        text: 'A subheading',
        properties: {
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
      }

      this.addText(subheading)
    }

    addParagraph(): void {
      let text: any = {
        type: 'text',
        text: 'A little bit of body text',
        properties: {
          fontFamily: 'arial',
          fontWeight: 'normal',
          fontSize: 20,
          cursorColor: 'blue',
          left: 305,
          top: 210,
          fill: '#000000',
          angle: 0
        }
      }

      this.addText(text)
    }

}

interface textProps {
  type: string,
  text: string,
  properties: {
    width: number,
    height: number,
    fontFamily: string,
    fontWeight: string,
    fontSize: number,
    cursorColor: string,
    left: number,
    top: number
    fill: string,
    selected: boolean
    angle: number
  }
}