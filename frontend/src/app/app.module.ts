import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoldersComponent } from './modules/folders/folders.component';
import { ItemsComponent } from './modules/items/items.component';
import { ItemEditComponent } from './modules/item-edit/item-edit.component';
import { HeaderComponent } from './public/header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    ItemsComponent,
    ItemEditComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
