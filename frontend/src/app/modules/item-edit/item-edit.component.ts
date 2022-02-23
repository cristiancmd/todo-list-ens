import { ItemModel } from './../../models/item.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  constructor(
    public diag: MatDialogRef<ItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public item: ItemModel
  ) { }

  ngOnInit(): void {
  }


  close() {
    this.diag.close()
  }

  onFormSubmit(form: NgForm) {

    if (form.invalid) return

    const newItem = {
      ...this.item,
      ...form.value
    }

    this.diag.close(newItem)
  }


}
