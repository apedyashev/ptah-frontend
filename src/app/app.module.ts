import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  // The components, directives, and pipes that belong to this NgModule.
  declarations: [AppComponent],
  // The subset of declarations that should be visible and usable in the component templates of other NgModules.
  // exports: [],
  // Other modules whose exported classes are needed by component templates declared in this NgModule.
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  // Creators of services that this NgModule contributes to the global collection of services;
  // they become accessible in all parts of the app. (You can also specify providers at the component level.)
  providers: [],
  // The main application view, called the root component, which hosts all other app views.
  // Only the root NgModule should set the bootstrap property.
  bootstrap: [AppComponent],
})
export class AppModule {}
