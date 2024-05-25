import { EventEmitter, Injectable } from "@angular/core";
import { fabric } from "fabric";

import SlideData from "../types";


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
    withTemplate: number | null = null
    maxPage: number = 5
    currentThumbnail: string = ''

    imagesFromUpload: any
    textsFromUpload: any

    setData = new EventEmitter()
    showLoading = new EventEmitter()

    organizedPerPage(data:any){
      let imageStorage:any = Array.from({ length: this.maxPage }, () => [])
      data.forEach( (obj:any) => {
        imageStorage[obj.page-1] = [...imageStorage[obj.page-1], obj]
      })
      return imageStorage
    }

    loadTemplate(templateId:any): void{   
      const backgroundColor = ['#ffc2c2', '#ffedc2', '#eaffc2', '#c2fbff', '#c5c2ff']
      let newTemplate:any = []
      
      for(let i=0; i<this.maxPage; i++){
        let newSlide = this.createSlides()
        newSlide.backgroundColor = backgroundColor[Math.floor(Math.random() * backgroundColor.length)]

        let newImageObject: any;
        if(this.imagesFromUpload[i][0]){
          newImageObject = {
            id: this.createId(),
            src: this.imagesFromUpload[i][0].url,
            type: 'image',
            left: 100,
            top: 100,
            scaleX: 0.7,
            scaleY: 0.7,
            flipX: false,
            flipY: false,
            angle: 0
          }
        }

        if(newImageObject !== undefined){
          newSlide.objects = [...newSlide.objects, newImageObject]
        }

        const newTextObject = {
          id: this.createId(),
          type: 'text',
          text: this.textsFromUpload[i].text,
          textType: 'body',
          width: 500,
          height: 100,
          fontFamily: 'arial',
          fontWeight: 'normal',
          fontSize: 30,      
          scaleX: 0.5,
          scaleY: 0.5,
          cursorColor: 'blue',
          left: 500,
          top: 100,
          textAlign: 'left',
          fill: '#000000',
          angle: 0 
        }

        if(newTextObject !== undefined){
          newSlide.objects = [...newSlide.objects, newTextObject]
        }
    
        newTemplate = [...newTemplate as any, newSlide]
      }

      this.slides = newTemplate 
      console.log('new slide', this.slides)
      this.saveSlidesData()
      this.initRender()
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
      this.slides = slidesData ? slidesData : [this.createSlides()]
      this.slideCount = slidesData ? slidesData.slice(-1)[0].number + 1 : 0;
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

      if (this.slides && this.slides[this.currentSlide]) {
        this.slides[this.currentSlide].backgroundColor = this.canvas?.backgroundColor as string
        this.slides[this.currentSlide].objects = [...dataObjects as []];
        
        // this.slides[this.currentSlide].thumbnail = this.currentThumbnail
        this.saveSlidesData()
        this.canvas?.renderAll()
      }
    }


}

