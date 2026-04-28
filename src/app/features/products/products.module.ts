import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from './models/product.model';
import { ProductsRoutingModule } from './products-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService]
})
export class ProductsModule { }
