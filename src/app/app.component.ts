import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    EditorComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'client';
}
