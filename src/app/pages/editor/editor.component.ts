import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
})

export class EditorComponent implements OnInit{
    private canvas: fabric.Canvas | any;

    constructor(){

    }

    ngOnInit(): void {
      this.canvas = new fabric.Canvas('app-canvas',{
        backgroundColor: 'white'
      }); 
    }
} 
