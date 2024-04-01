import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegistrationComponent } from './core/auth/pages/registration/registration.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './core/home/pages/home-page/home-page.component';
import { CoreModule } from './core/core.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    CoreModule,
    NgxWebstorageModule.forRoot(),
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: [
    {
        provide: LOCALE_ID,
        useValue: 'pt-br',
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
