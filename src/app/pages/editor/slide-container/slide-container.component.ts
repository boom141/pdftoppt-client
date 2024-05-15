import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-container',
  standalone: true,
  imports: [],
  templateUrl: './slide-container.component.html', 
})
export class SlideContainerComponent {
  @Input() id: string | number | null = 0
}
