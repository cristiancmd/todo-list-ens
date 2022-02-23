import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FolderModel } from '../models/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  url:string = environment.API_URL;


  constructor( private http: HttpClient) { }

  addFolder(folder:FolderModel):Observable<FolderModel>{
    return this.http.post(`${this.url}/folders`, folder)
  }

  getFolders():Observable<FolderModel[]> {
    return this.http.get<FolderModel[]>(`${this.url}/folders?filter%5Border%5D=id%20DESC`)
  }

  removeFolder(id:number):Observable<FolderModel>{
    return this.http.delete<FolderModel>(`${this.url}/folders/${id}/`)
  }



}
