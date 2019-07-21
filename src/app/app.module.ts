import { HttpClientModule } from '@angular/common/http';
import { ChongshengdeModule } from './chongshengde/chongshengde.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AboutComponent } from './about/about.component';
import { MaterialModule } from './material.module';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChongshengdeModule,
    MaterialModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    OverlayModule
  ],
  entryComponents: [
    MatSpinner
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
