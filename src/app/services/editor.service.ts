import { EventEmitter, Injectable, Output } from "@angular/core";
import { fabric } from "fabric";


@Injectable({
    providedIn: 'root',
})

export class EditorService {  
    canvas?: fabric.Canvas
    canvasHeight: number = 400
    canvasWidth: number = 800
    slides: presentationSlides[] | undefined;
    slideCount: number = 0;
    currentSlide: number = 0;

    @Output() renderCanvasObjects: EventEmitter<any> = new EventEmitter<any>();

    createId(): number{
      return new Date().getTime();
    }

    getCurrentSlide(): presentationSlides{
      return this.slides?.[this.currentSlide as number] as presentationSlides
    }

    initCanvas(): void {
      this.canvas = new fabric.Canvas('app-canvas',{backgroundColor: 'white'});
      let slidesData = this.getSlidesData()
      this.slideCount = slidesData ? slidesData.slice(-1)[0].number + 1 : 0;
      this.slides = slidesData ? slidesData : [this.createSlides()]
      this.saveSlidesData();
    }

    initRender(): void{
      let slide: any = this.slides?.[this.currentSlide as number]
      if(this.canvas){
        this.canvas.backgroundColor = slide.backgroundColor
      }
      for(let object of slide.objects){
          if(object.type === 'text'){
            this.renderText(object);
          }else{
            this.renderElem(object);
          }
      }

      
    }

    createSlides(): presentationSlides{
      return {
            number: this.slideCount++,
            height: this.canvasHeight,
            width: this.canvasWidth,
            backgroundColor: '#FFFFFF',
            objects: Array(),
            thumbnail: null
      }
    }

    getSlidesData(): presentationSlides[]{
      return JSON.parse(localStorage.getItem('slidesData') as any);
    }

    saveSlidesData(): void{
      localStorage.setItem('slidesData',  JSON.stringify(this.slides));
    }
    
    objectsSelection(): fabric.Object[]{
      let activeObjects = this.canvas?.getActiveObjects()
      return activeObjects as fabric.Object[];
    }

    deleteObjects(activeObjects: fabric.Object[]): void{
      activeObjects.forEach((activeObject: any) => {
        let newSLideObjects = this.getCurrentSlide().objects.filter(slideObject => {
          return slideObject.properties.id !== activeObject.id
        })
        this.getCurrentSlide().objects = newSLideObjects
        this.canvas?.remove(activeObject)
      })

      this.saveSlidesData()
    }

    registerObjectToSlide(object: any): void{
      this.getCurrentSlide().objects.push(object)
      this.saveSlidesData()
    }

    renderText(textProps: any): void{
      let text = new fabric.Textbox(textProps.text, textProps);
      this.canvas?.add(text);
      this.canvas?.renderAll()
    }

    renderElem(imgProps: any): void{
      fabric.Image.fromURL(imgProps.src, (elem) => {
        elem.set(imgProps);
        this.canvas?.add(elem);
        this.canvas?.renderAll()
      });
    }

    clearCanvas(): void{
      this.canvas?.getObjects().forEach(entity => {
        this.canvas?.remove(entity)
      })

    }

    updateCanvasData(): void{
      let canvasObjects = this.canvas?.getObjects() as any[]
      let dataObjects = this.slides?.[this.currentSlide].objects
      
      dataObjects?.forEach((object,indx) => {
        if('text' in object) {
          object.text = canvasObjects[indx].text
        }

        for(let key in object) {
          let sanitizedObject = Object.assign({},canvasObjects[indx])
          object[key] = sanitizedObject[key]
        }
      })
      

      if (this.slides && this.slides[this.currentSlide]) {
        this.slides[this.currentSlide].backgroundColor = this.canvas?.backgroundColor as string
        this.slides[this.currentSlide].objects = [...dataObjects as []];
        // this.slides[this.currentSlide].thumbnail = this.canvas?.toDataURL() as string
        this.saveSlidesData()
      }


    }

    applyEdit(): void{
      this.updateCanvasData()
      this.canvas?.renderAll()
    }

}

export interface presentationSlides{
  number: number,
  height: number,
  width: number,
  backgroundColor: string,
  objects: any[],
  thumbnail: string | null
}