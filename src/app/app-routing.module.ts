import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**User defined components */
import { ContactListComponent } from './components/contact-list/contact-list.component';


const ROUTES: Routes = [
    {
        path: '', redirectTo: 'contact-list', pathMatch: 'full'
    },
    {
        path: 'contact-list',
        component: ContactListComponent
    }
];




@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
