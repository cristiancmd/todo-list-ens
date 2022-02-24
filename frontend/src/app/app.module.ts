import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoldersComponent } from './modules/folders/folders.component';
import { ItemsComponent } from './modules/items/items.component';
import { ItemEditComponent } from './modules/item-edit/item-edit.component';
import { HeaderComponent } from './public/header/header.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogComponent } from './public/shared/mat-dialog/mat-dialog.component';
import { UserComponent } from './modules/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    ItemsComponent,
    ItemEditComponent,
    HeaderComponent,
    MatDialogComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
