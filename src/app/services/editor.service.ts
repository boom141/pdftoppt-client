import { Injectable } from "@angular/core";
import { fabric } from 'fabric';


@Injectable({
    providedIn: 'root',
})

export class EditorService {  
    canvas?: fabric.Canvas;
    slides: presentationSlides[] | undefined;
    slideCount: number = 0;
    currentSlide?: number = 0;


    createSlides(): presentationSlides{
      return {
            slide: this.slideCount++,
            elements: [],
            text: [],
            thumbnail: null
      }
    }

    render(): void{
      let slide: any = this.slides?.[this.currentSlide as number]
      this.clearCanvas()
      for(let text of slide.text){
        this.canvas?.add(this.renderText(text));
      }
      
      this.canvas?.renderAll();
    }

    getSlidesData(): presentationSlides[]{
      return JSON.parse(localStorage.getItem('slidesData') as any);
    }

    saveSlidesData(): void{
      localStorage.setItem('slidesData',  JSON.stringify(this.slides));
    }

    initCanvas(): void {
      this.canvas = new fabric.Canvas('app-canvas',{backgroundColor: 'white'});
      let slidesData = this.getSlidesData()
      this.slideCount = slidesData ? slidesData.slice(-1)[0].slide + 1 : 0;
      this.slides = slidesData ? slidesData : [this.createSlides()]
      this.saveSlidesData();
    }

    clearCanvas(): void{
      this.canvas?.getObjects().forEach(entity => {
        this.canvas?.remove(entity)
      })
    }

    renderText(textProps: any): fabric.Textbox{
      return new fabric.Textbox(textProps.text, textProps.options);
    }
}

export interface presentationSlides{
  slide: number,
  elements: any[],
  text: any[],
  thumbnail: string | null
}