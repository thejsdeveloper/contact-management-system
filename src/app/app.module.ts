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
import { OnlyDigitsDirective } from './directives/only-digits.directive';
import { MessageModalComponent } from './components/shared/message-modal/message-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactListComponent,
    ContactModalComponent,
    MessageModalComponent,
    OnlyDigitsDirective
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
    ContactModalComponent,
    MessageModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
