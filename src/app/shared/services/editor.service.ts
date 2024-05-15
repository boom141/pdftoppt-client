import { Injectable } from "@angular/core";
import { fabric } from "fabric";

import SlideData from "../types";
import { SAMPLE_IMAGE_DATA, SAMPLE_TEMPLATES, SAMPLE_TEXT_DATA } from "../../../assets/data/00-sample-data";

@Injectable({
    providedIn: 'root',
})

export class EditorService {  
    canvas?: fabric.Canvas
    canvasHeight: number = 400
    canvasWidth: number = 800
    slides: Array<SlideData.Slide> | undefined;
    slideCount: number = 0;
    currentSlide: number = 0;

    imagesFromUpload: any
    textsFromUpload: any

    loadTemplate(templateId: any): void{
      let imagesFromUpload = SAMPLE_IMAGE_DATA
      let textsFromUpload = SAMPLE_TEXT_DATA

      let templateData = (SAMPLE_TEMPLATES as any)[`${templateId}`]
      templateData.forEach((slide:any) =>{
        slide.objects.forEach((obj:any, indx: number) => {
          if(obj.type !== 'text'){
            obj.src = imagesFromUpload.data[indx].url
          }
        })
      })
      
      this.slides = templateData
      this.saveSlidesData()

    }

    createId(): number{
      return new Date().getTime();
    }

    getCurrentSlide(): SlideData.Slide{
      return this.slides?.[this.currentSlide as number] as SlideData.Slide;
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

    createSlides(): SlideData.Slide{
      return {
            number: this.slideCount++,
            height: this.canvasHeight,
            width: this.canvasWidth,
            backgroundColor: '#FFFFFF',
            objects: Array(),
            thumbnail: null
      }
    }

    getSlidesData(): Array<SlideData.Slide>{
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
          return slideObject.id !== activeObject.id
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
      let dataObjects = this.slides?.[this.currentSlide].objects

      this.canvas?.getObjects().forEach((canvasObj:any) => {
        let canvasObjects = Object.assign({}, canvasObj )
        let entityObject = dataObjects?.find(dataObj => dataObj.id === canvasObjects.id)
        for(const key in entityObject) {
          if(key in canvasObjects){
            (entityObject as any)[key] = (canvasObjects as any)[key]
          }
        }
      })

      console.log(this.slides)

      if (this.slides && this.slides[this.currentSlide]) {
        this.slides[this.currentSlide].backgroundColor = this.canvas?.backgroundColor as string
        this.slides[this.currentSlide].objects = [...dataObjects as []];
        
        // this.slides[this.currentSlide].thumbnail = this.canvas?.toDataURL() as string
        this.saveSlidesData()
        this.canvas?.renderAll()
      }
    }


}

