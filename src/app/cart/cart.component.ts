import { Component, OnInit } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as Cart from "./../store/actions";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { EditListComponent } from '../edit-list/edit-list.component';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html',
  styles: [`
.size{
width:200px;
height:200px;
margin-bottom:10px
  }`]
})
export class CartComponent implements OnInit {

  cart: Observable<Array<any>>
  lists: any;
  finalList: any[];
  editbtn: boolean = true;
  saveBtn: boolean = false;
  flag: boolean = true;
  constructor(private store: Store<any>, private dialog: MatDialog) {

    this.store.select('cart').subscribe(data => {
      this.lists = data;
      var op = {};
      var uniqNames = [...new Set(data.map(item => item.name))]
      uniqNames.forEach((uName: string) => {
        data.map(item => {
          if (item.name === uName) {
            if (!op[uName]) op[uName] = [];
            op[uName].push(item.value)
          }
        })
    
        var newOp = Object.keys(op).map(item => {
          return {
            name: item,
            value: op[item].map(opItem => opItem)
          }
        }
        );

     
        this.lists = newOp;
      });


    })
  }


  downloadFav(obj) {
    this.toDataURL(obj, function (dataUrl) {
      var a = document.createElement("a"); 
      a.href = dataUrl; 
      a.download = "Image.png"; 
      a.click();
    })
  }
  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  edit(i, obj) {
    const dialogRef = this.dialog.open(EditListComponent, {
      width: '500px',
      height: '200px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      obj.name = result;
    });
  }
  ngOnInit() {
  }
}
