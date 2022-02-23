import { ItemEditComponent } from './modules/item-edit/item-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoldersComponent } from './modules/folders/folders.component';
import { ItemsComponent } from './modules/items/items.component';

const routes: Routes = [
  { path: 'items/new', component: ItemEditComponent },
  { path: 'items/edit', component: ItemEditComponent },
  { path: 'folders/:id', component: ItemsComponent },
  { path: 'home', component: FoldersComponent},
  { path: '**', component: FoldersComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
