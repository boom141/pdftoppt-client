import { NgModule } from "@angular/core";
import { EditorComponent } from "./editor.component";
import { AttributesModule } from "./attributes/attributes.module";


@NgModule({
    declarations: [EditorComponent],
    imports: [AttributesModule],
    exports: [EditorComponent]
  })
  export class EditorModule { }