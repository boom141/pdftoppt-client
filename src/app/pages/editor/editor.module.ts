import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditorComponent } from "./editor.component";
import { ToolsModule } from "./tools/tools.module";
import { ColorPickerModule } from 'ngx-color-picker';
import { toolsAttributesModule } from "./tools-attributes/tools-attributes.module";

import { EditorService } from "src/app/services/editor.service";
import { SlidesComponent } from './slides/slides.component';


@NgModule({
    declarations: [EditorComponent, SlidesComponent],
    imports: [
              CommonModule,
              ToolsModule,
              ColorPickerModule,
              toolsAttributesModule
            ],
    exports: [EditorComponent],
    providers: [EditorService]
  })
  export class EditorModule { }