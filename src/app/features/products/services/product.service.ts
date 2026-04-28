import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = 'http://localhost:3002/bp/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.api).pipe(
      map(res => res.data)
    )
  }

  createProduct(product: Product) {
    return this.http.post(this.api, product);
  }

  verifyId(id: string) {
    return this.http.get(`${this.api}/verificaction/${id}`)
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put(`${this.api}/${id}`, product);
  }
}
