import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({ providedIn: 'root' })
export class ProductStore {
    private products$ = new BehaviorSubject<Product[]>([]);
    productsObs$ = this.products$.asObservable();
    
    setProducts(products: Product[]) {
        this.products$.next(products);
    }
}