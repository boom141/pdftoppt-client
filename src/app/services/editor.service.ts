import { Injectable } from "@angular/core";
import { fabric } from 'fabric';


@Injectable({
    providedIn: 'root',
})

export class EditorService {  
    canvas?: fabric.Canvas;
    slides: presentationSlides[] | undefined;
    slideCount: number = 0;
    currentSlide: number = 0;

    initCanvas(): void {
      this.canvas = new fabric.Canvas('app-canvas',{backgroundColor: 'white'});
      let slidesData = this.getSlidesData()
      this.slideCount = slidesData ? slidesData.slice(-1)[0].slide + 1 : 0;
      this.slides = slidesData ? slidesData : [this.createSlides()]
      this.saveSlidesData();
    }

    createSlides(): presentationSlides{
      return {
            slide: this.slideCount++,
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
      activeObjects.forEach(object => this.canvas?.remove(object))
    }

    renderText(textProps: any): fabric.Textbox{
      return new fabric.Textbox(textProps.text, textProps.properties);
    }

    renderImg(imgProps: any): fabric.Image{
      return fabric.Image.fromURL(imgProps.src, img => {
        img.set(imgProps.options);
        this.canvas?.add(img);
      });
    }

    render(): void{
      let slide: any = this.slides?.[this.currentSlide as number]
      if(this.canvas){
        this.canvas.backgroundColor = slide.backgroundColor
      }
      for(let object of slide.objects){
          if(object.type === 'text'){
            this.canvas?.add(this.renderText(object));
          }else{
            this.renderImg(object);
          }
      }
      this.canvas?.renderAll();
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
        object.text = canvasObjects[indx].text
        for(let key in object.properties) {
          let sanitizedObject = Object.assign({},canvasObjects[indx])
          object.properties[key] = sanitizedObject[key]

        }
      })


      if (this.slides && this.slides[this.currentSlide]) {
        this.slides[this.currentSlide].objects = [...dataObjects as []];
        this.saveSlidesData()
      }

    }

    applyEdit(): void{
      this.updateCanvasData()
      this.clearCanvas()
      this.render()
    }

}

export interface presentationSlides{
  slide: number,
  backgroundColor: string,
  objects: any[],
  thumbnail: string | null
}