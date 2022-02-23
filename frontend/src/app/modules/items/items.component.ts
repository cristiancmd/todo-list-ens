import { ItemEditComponent } from './../item-edit/item-edit.component';
import { ItemService } from './../../services/item.service';
import { ItemModel } from './../../models/item.model';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  items: ItemModel[] = [];
  private sub: any;
  id?: number;
  name:string = 'Items'

  @ViewChild('inputVal')
  inputVal!: ElementRef;


  constructor(private route: ActivatedRoute,
    private _itemSvc: ItemService,
    private _matDiag: MatDialog) {


  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getItems(this.id)

    });


  }



  getItems(id: number) {
    if(history.state.data)
        this.name = history.state.data.name;
    this.sub = this._itemSvc.getItemsFor(id).subscribe({
      next: (data: ItemModel[]) => {
        this.items = data;
        console.log(this.items);
      }
    })
  }

  addItem() {
    const val = this.inputVal.nativeElement.value;
    if (! /\S/.test(val)) return;
    const item = new ItemModel
    item.name = val;
    this._itemSvc.addItem(item, this.id!).subscribe({
      next: (data: ItemModel) => {
        this.getItems(this.id!);
        this.inputVal.nativeElement.value = ""
      }
    })

  }

  onItemEdit(item:ItemModel){

    let diag = this._matDiag.open(ItemEditComponent, {
      width: '500px',
      data: item
    });

    diag.afterClosed().subscribe((res) => {
      if (res) {
        const newItem = new ItemModel;
        newItem.name = res.text;
        newItem.id = res.id;
        this._itemSvc.updateItem(newItem).subscribe({
          next: (data: ItemModel) => {
            this.getItems(this.id!);
          },
          error: (e) => console.log(e)
        })
      }
    })

  }


  onItemClicked(item: ItemModel) {
    let newItem = new ItemModel;
    newItem.checked = !item.checked
    newItem.name = item.name
    newItem.id = item.id
    this._itemSvc.updateItem(newItem).subscribe({
      next: (data: ItemModel) => {
        this.getItems(this.id!);
      },
      error: (e) => console.log(e)

    })


  }

  onItemRemove(item: ItemModel) {
    this._itemSvc.removeItem(item.id!).subscribe({
      next: (data: ItemModel) => {
        this.getItems(this.id!);
      },
      error: (e) => console.log(e)
    })

  }




  ngOnDestroy() {
    this.sub.unsubscribe();
  }










}
