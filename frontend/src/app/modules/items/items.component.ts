import { ItemService } from './../../services/item.service';
import { ItemModel } from './../../models/item.model';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  items: ItemModel[] = [];
  private sub: any;
  id?: number;

  @ViewChild('inputVal')
  inputVal!: ElementRef;


  constructor(private route: ActivatedRoute,
    private _itemSvc: ItemService) {


  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getItems(this.id)


    });

  }

  getItems(id: number) {
    this.sub = this._itemSvc.getItemsFor(id).subscribe({
      next: (data: ItemModel[]) => {
        this.items = data;
        console.log(this.items);
      }
    })
  }

  addItem() {

    const val = this.inputVal.nativeElement.value;
    if (val == '') return;
    const item = new ItemModel
    item.name = val;
    this._itemSvc.addItem(item, this.id!).subscribe({
      next: (data: ItemModel) => {
        console.log(data);
        this.getItems(this.id!);
        this.inputVal.nativeElement.value = ""
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
