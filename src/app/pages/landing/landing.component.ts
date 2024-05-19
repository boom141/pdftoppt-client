import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UploaderComponent } from '../../shared/components/uploader/uploader.component';
import { RouterLink } from '@angular/router';
import { EditorService } from '../../shared/services/editor.service';
import { ApiReqService } from '../../shared/services/apiReq.service';
import { firstValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    UploaderComponent,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './landing.component.html',
  providers: [
    ApiReqService,
    EditorService,
    Router
  ]
})
export class LandingComponent {
  landingImg2: any;
  isFileSelected: boolean = false;
  isLoading: boolean = false;

  
  constructor(
    private editor: EditorService,
    private api: ApiReqService,
    private router: Router
  ){

  }  


  async onSelectFile(e: Event){
      this.isLoading = true
      let target = e.target as HTMLInputElement
      let file = target.files?.[0];

      let newForm = new FormData()
      newForm.append('file', file as Blob)

      let response = await firstValueFrom(this.api.uploadFile(newForm as FormData))
      if(response.success){
        console.log('success')
        this.router.navigate(['designer'])
        this.isFileSelected = true
        this.isLoading = false
      }else{
        this.isLoading = false
      }
    };
}
