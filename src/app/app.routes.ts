import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { EditorComponent } from './pages/editor/editor.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'contactus',
        component: ContactUsComponent
    },
    {
        path: 'designer',
        component: EditorComponent
    }
];
