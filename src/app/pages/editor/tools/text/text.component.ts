import { Component } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';
import { fabric } from 'fabric';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
})
export class TextComponent {


    constructor(private editor: EditorService){
      // initialization code here
    }

    addHeading(): void {
      let heading: any = {
        type: 'text',
        text: 'A Heading',
        options: {
          width: 300,
          height: 100,
          fontFamily: 'arial',
          fontWeight: 'bolder',
          fontSize: 60,
          cursorColor: 'blue',
          left: 250,
          top: 100
        }
      }

      this.editor.slides?.[this.editor.currentSlide as number].text.push(heading)
      this.editor.saveSlidesData()
      this.editor.render()
    }

    addSubheading(): void {
      let subheading: any = {
        type: 'text',
        text: 'A subheading',
        options: {
          width: 200,
          height: 100,
          fontFamily: 'arial',
          fontWeight: 'bold',
          fontSize: 30,
          cursorColor: 'blue',
          left: 300,
          top: 170
        }
      }

      this.editor.slides?.[this.editor.currentSlide as number].text.push(subheading)
      this.editor.saveSlidesData()
      this.editor.render()

    }

    addParagraph(): void {
      let text = new fabric.Textbox('A little bit of body text',{
        width: 400,
        height: 50,
        fontFamily: 'arial',
        fontWeight: 'normal',
        fontSize: 20,
        cursorColor: 'blue',
        left: 305,
        top: 210,
      });

      // this.editor.slides?.[this.editor.currentSlide as number].text.push(text)
      // this.editor.saveSlidesData()
    }

}
