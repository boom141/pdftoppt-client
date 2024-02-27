import { NgModule } from "@angular/core";
import { TextComponent } from "./text/text.component";
import { ElementsComponent } from './elements/elements.component';


@NgModule({
    declarations: [TextComponent, ElementsComponent],
    exports:  [TextComponent, ElementsComponent],
  })
  export class ToolsModule { }