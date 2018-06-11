import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**User Defined Modules */
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';

/**User defined Components */
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactListComponent,
    ContactModalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  entryComponents: [
    ContactModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
