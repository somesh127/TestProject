import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CartActionTypes } from '../ngrx-store/actions';
import * as Cart from "./../ngrx-store/actions";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styles: []
})
export class EditListComponent implements OnInit {
  editList: any;
  constructor(private store: Store<any>, private dialogRef: MatDialogRef<EditListComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.editList = data;
  }
  updateList() {
    this.dialogRef.close(this.editList);
  }
  ngOnInit(): void {
  }

}
