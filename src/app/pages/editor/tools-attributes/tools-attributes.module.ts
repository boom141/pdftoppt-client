import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextAttributeComponent } from './text-attribute/text-attribute.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    imports: [
        CommonModule,
        ColorPickerModule
    ],
    declarations: [
        TextAttributeComponent
    ],
    exports: [TextAttributeComponent]
  })
  export class toolsAttributesModule { }