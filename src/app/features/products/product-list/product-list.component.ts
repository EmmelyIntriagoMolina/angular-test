import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchControl = new FormControl('');

  currentPage = 1;
  pageSize: number = 5
  pageSizes = [5, 10, 20];

  constructor(
    private _productService: ProductService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.handleSearch();
  }

  loadProducts() {
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.applyPagination();
      },
      error: () => {
        alert('Error al cargar los productos');
      }
    });
  }

  handleSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => this.filterProducts(value || ''));
  }

  filterProducts(value: string) {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLocaleLowerCase().includes(value.toLowerCase())
    );
  }

  onChangeSize(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSize = Number(value);
    this.applyPagination();
  }
  applyPagination() {
    this.filteredProducts = this.products.slice(0, this.pageSize)
  }

  goToCreate() {
    this._router.navigate(['/products/create']);
  }

  goToUpdate(id: string) {
    this._router.navigate(['/products/edit', id]);
  }
}
