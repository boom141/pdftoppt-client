import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import SlideData from '../../types';
import { EditorService } from '../../services/editor.service';
import { ApiReqService } from '../../services/apiReq.service';

@Component({
  selector: 'app-tool-content',
  standalone: true,
  imports: [
    PlaceholderComponent
  ],
  templateUrl: './tool-content.component.html',
})
export class ToolContentComponent implements OnInit {
  @Input() loadedData?: any
  @Input() isLoading?: boolean

  @Output() getContentSource: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private editor: EditorService,
    private api: ApiReqService
  ){}

  ngOnInit(): void {
    // execute a code here..
  }
  
  clickedElement(src:string): void{
    let elementProps: SlideData.ImageProps = {
      id: this.editor.createId(),
      src: src,
      type: 'element',
      left: 100,
      top: 100,
      scaleX: 1,
      scaleY: 1,
      flipX: false,
      flipY: false,
      angle: 0
  }

  this.editor.registerObjectToSlide(elementProps)
  this.editor.renderElem(elementProps)
  }

}

interface dataProperties {
  category: string,
  images: Array<any>
}