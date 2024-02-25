import { Injectable } from "@angular/core";
import { fabric } from 'fabric';


@Injectable({
    providedIn: 'root',
})

export class EditorService {  
    canvas?: fabric.Canvas | any;
    slides?: presentationSlides[] | null;
    slideCount: number = 0;
    currentSlide?: number | null;

    createSlides(): presentationSlides{
      return {
            slide: this.slideCount++,
            elements: [],
            text: [],
            thumbnail: null
      }
    }

    getSlidesData(): presentationSlides[]{
      return JSON.parse(localStorage.getItem('slidesData') as any);
    }

    saveSlidesData(): void{
      localStorage.setItem('slidesData',  JSON.stringify(this.slides));
    }

    initCanvas(canvasId: string): void {
      this.canvas = new fabric.Canvas(canvasId,{backgroundColor: 'white'}); 
      
      let slidesData = this.getSlidesData()
      this.slideCount = slidesData ? slidesData.slice(-1)[0].slide + 1 : 0;
      this.slides = slidesData ? slidesData : [this.createSlides()]
      this.saveSlidesData();
    }

    

}

export interface presentationSlides{
  slide: number,
  elements: any[],
  text: any[],
  thumbnail: string | null
}