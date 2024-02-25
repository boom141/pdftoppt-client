import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
})
export class SlidesComponent {
   @Input() slideId?: number;
   @Input() thumbnail?: string | null;
}
