import { Component, Input , OnInit} from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

@Component({
  selector: 'app-tool-content',
  standalone: true,
  imports: [
    NgImageSliderModule,
    PlaceholderComponent
  ],
  templateUrl: './tool-content.component.html',
})
export class ToolContentComponent implements OnInit {
  @Input() loadedData?: Array<dataProperties>
  @Input() isLoading?: boolean

  ngOnInit(): void {
    // execute a code here..
  }
  
  clickedElement(indx:number, imageGroup: dataProperties): void{
    console.log(imageGroup.images[indx]);
  }

}

interface dataProperties {
  category: string,
  images: Array<object>
}