import { Component, OnInit, Inject } from '@angular/core';
import { SearchServiceService } from '../search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import * as Cart from "./../ngrx-store/actions";

@Component({
  selector: 'app-add-favourite',
  templateUrl: './add-favourite.component.html',
  styles: []
})
export class AddFavouriteComponent implements OnInit {
  listName: any = "";
  data: any;
  listDesc: any = "";
  showdata: boolean;
  existingList: any;
  constructor(private service: SearchServiceService, private store: Store<any>, public snackBar: MatSnackBar, private dialogRef: MatDialogRef<AddFavouriteComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }
  ngOnInit(): void {
    this.store.select('cart').subscribe(data => {
      
      this.existingList = [...new Set(data['cart'].map(x => {
        return x.name;
      }))]
      if (this.existingList.length != 0)
        this.showdata = false;
    })
  }
  addToFavourities(listName, listDesc) {
    this.store.dispatch(new Cart.AddProduct({ name: listName, desc: this.listDesc, value: this.data }))
  }
  addList() {
    this.showdata = true
  }

}
