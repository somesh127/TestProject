import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CartListComponent} from'./cart-list/cart-list.component';
import { ProductsComponent } from './products/products.component';
import { FavListComponent } from './fav-list/fav-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchServiceService } from './search.service';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material/material.module';
import { storeEffects } from './ngrx-store/effects';
import { StoreModule } from "@ngrx/store";
import { reducer } from './ngrx-store/reducer';
import { EditListComponent } from './edit-list/edit-list.component';
import { AddFavouriteComponent } from './add-favourite/add-favourite.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'cart',
    component: FavListComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    FavListComponent,
    AddFavouriteComponent,
    EditListComponent,
    CartListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ cart: reducer }),
    EffectsModule.forRoot([storeEffects]),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  entryComponents: [AddFavouriteComponent, EditListComponent],
  providers: [SearchServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
