import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
