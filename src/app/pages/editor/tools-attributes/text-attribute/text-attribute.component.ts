import { Component, createNgModule } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-text-attribute',
  templateUrl: './text-attribute.component.html',
})
export class TextAttributeComponent {
  pickerColor: string = '#000000'
  isFontBold: boolean = false
  isUppercase: boolean = false
  fontSize: number = 0

  constructor(private editor: EditorService){}

  changeFontSize(event: MouseEvent): void{
    let objects = this.editor.objectsSelection()
    let target = event.target as HTMLInputElement

    if(objects){
      objects.forEach((object: any) =>{
        if(target.innerText === "+"){
          object.fontSize = object.fontSize + 1
        }else{
          object.fontSize = object.fontSize - 1
        }
        this.fontSize = object.fontSize
      })
    }

    this.editor.applyEdit()
  }

  changeFontFamily(event: Event): void{
    let target = event.target as HTMLInputElement
    let objects = this.editor.objectsSelection()

    if(objects){
      objects.forEach((object: any) =>{
        object.fontFamily = target.value.toLowerCase()
      })
    }

    this.editor.applyEdit()
  }

  changeFontColor(): void{
    let objects = this.editor.objectsSelection()
    if(objects){
      objects.forEach((object: any) =>{
        object.fill = this.pickerColor
      })
    }
    this.editor.applyEdit()
  }

  changeFontWeight(): void{
    this.isFontBold = !this.isFontBold
    let objects = this.editor.objectsSelection()
    if(objects){
      objects.forEach((object: any) =>{
        if(this.isFontBold){
          object.fontWeight = 'bold'
        }else{
          object.fontWeight = 'normal'
        }
      })
    }

    this.editor.applyEdit()
  }

  changeFontCase(): void{
    this.isUppercase = !this.isUppercase
    let objects = this.editor.objectsSelection()
    if(objects){
      objects.forEach((object: any) =>{
        if(this.isUppercase){
          object.text = object.text.toUpperCase()
        }else{
          object.text = object.text.toLowerCase()
          object.text = object.text.replace(/\b\w/g, (match: string)=> match.toUpperCase())
        }
      })
    }

    this.editor.applyEdit()
  }
} 
