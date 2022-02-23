import { ItemModel } from './../models/item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url:string = environment.API_URL;

  constructor(private http: HttpClient)
   { }


  addItem(item:ItemModel, folderId:number):Observable<ItemModel>{
    return this.http.post(`${this.url}/folders/${folderId}/items`, item)
  }

  getItemsFor(folderId:number):Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${this.url}/folders/${folderId}/items`)
  }

  removeItem(id:number):Observable<ItemModel>{
    return this.http.delete<ItemModel>(`${this.url}/items/${id}/`)
  }

  updateItem(item:ItemModel):Observable<ItemModel>{
    return this.http.patch(`${this.url}/items/${item.id}`, item)
  }


}
