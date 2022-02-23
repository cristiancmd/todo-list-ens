import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
})
export class MatDialogComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) { }


}
