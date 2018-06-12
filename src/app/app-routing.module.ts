import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**User defined components */
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactResolverService } from './services/contact-resolver.service';


const ROUTES: Routes = [
    {
        path: '', redirectTo: 'contact-list', pathMatch: 'full'
    },
    {
        path: 'contact-list',
        component: ContactListComponent,
        resolve: {
          contactList: ContactResolverService
        }
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
