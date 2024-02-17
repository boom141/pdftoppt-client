import { NgModule } from "@angular/core";
import { CanvasComponent } from "./canvas/canvas.component";

@NgModule({
    declarations: [CanvasComponent],
    exports: [CanvasComponent]
  })
  export class AttributesModule { }