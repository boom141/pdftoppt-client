import { Component, OnInit , AfterViewInit} from '@angular/core';
import { EditorService } from '../../../shared/services/editor.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-entity-attributes',
  standalone: true,
  imports: [
    CommonModule,
    ColorPickerModule
  ],
  templateUrl: './entity-attributes.component.html',
})
export class EntityAttributesComponent implements OnInit{
  backgroundColor: string = '#FFFFFF'
  fontColor: string = '#000000'
  isFontBold: boolean = false
  isUppercase: boolean = false
  fontFamily: string = 'Arial'
  fontSize: number = 0

  constructor(private editor: EditorService){}

  ngOnInit(): void {
  }

  changeCanvasBgColor(): void {
    if(this.editor.canvas){
      if(this.editor.slides){
        this.editor.canvas.backgroundColor = this.backgroundColor
        this.editor.updateCanvasData()
      }
    }
  }

  changeFontFamily(event: Event): void{
    let target = event.target as HTMLInputElement
    let objects = this.editor.objectsSelection()

    if(objects){
      objects.forEach((object: any) =>{
        object.fontFamily = target.value.toLowerCase()
      })
    }
    this.editor.updateCanvasData()
  }

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
    this.editor.updateCanvasData()
  }

  changeFontColor(): void{
    let objects = this.editor.objectsSelection()
    if(objects){
      objects.forEach((object: any) =>{
        object.fill = this.fontColor
      })
    }
    this.editor.updateCanvasData()
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
    this.editor.updateCanvasData()
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
    this.editor.updateCanvasData()
  }

  deleteObject(): void{
    let objects = this.editor.objectsSelection()
    this.editor.deleteObjects(objects)
  }
} 
