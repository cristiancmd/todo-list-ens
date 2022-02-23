import { FolderModel } from './../../models/folder.model';
import { FolderService } from './../../services/folder.service';
import { ItemModel } from './../../models/item.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from 'src/app/public/shared/mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {

  @ViewChild('inputVal')
  inputVal!: ElementRef;

  folders: FolderModel[] = []

  constructor(private _folderSvc: FolderService, private _matDiag: MatDialog) { }

  ngOnInit(): void {
    this.getFolderList();

  }


  getFolderList() {
    this._folderSvc.getFolders().subscribe({
      next: (data: FolderModel[]) => {
        this.folders = data;
      }
    });
  }

  addFolder(aName: string) {

    if (! /\S/.test(aName)) return;

    let folder = new FolderModel
    folder.name = aName;
    this._folderSvc.addFolder(folder).subscribe({
      next: (data: FolderModel) => {
        this.inputVal.nativeElement.value = ""
        this.getFolderList();
      }
    })

  }

  removeFolder(folder: FolderModel) {

    let diag = this._matDiag.open(MatDialogComponent, {
      data: {
        item: folder,
      },
    });
    diag.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
        this._folderSvc.removeFolder(folder.id!).subscribe({
          next: (data: FolderModel) => {
            console.log('eliminada:', folder.name);
            this.getFolderList();
          }
        })
      }
    })
  }



}
