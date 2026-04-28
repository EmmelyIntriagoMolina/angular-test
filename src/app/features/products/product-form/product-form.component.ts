import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { DateValidator } from 'src/app/core/helpers/date.validator';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { Product, ProductForm } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '../../../core/helpers/date-format';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup<ProductForm>;

  canDeactivate(): boolean {
    if (this.form.dirty) {
      return confirm('Tienes cambios sin guardar. ¿Quieres salir?');
    }
    return true;
  }

  isSubmitting = false;

  isEditMode = false;
  productId!: string;

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.productId = this._route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct();
    }
    console.log(this.productId);
    console.log(this.isEditMode);

    this.form = this.fb.group<ProductForm>({
      id: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        asyncValidators: [this.idExistsValidator()]
      }),
      name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: this.fb.nonNullable.control('', [Validators.required]),
      date_release: this.fb.nonNullable.control('', [Validators.required, DateValidator.releaseDate()]),
      date_revision: this.fb.nonNullable.control('', [Validators.required]),
    }, {
      validators: [
        DateValidator.revisionDate
      ]
    })
    this.listenReleaseDateChanges();
  }
  idExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return of(null);

      return of(control.value).pipe(
        debounceTime(500),
        switchMap(id => this._productService.verifyId(id)),
        map(exists => (exists ? { idExists: true } : null))
      )
    }
  }

  listenReleaseDateChanges() {
    this.form.get('date_release')?.valueChanges.subscribe(value => {
      if (!value) return;

      const date = new Date(value);
      date.setFullYear(date.getFullYear() + 1);
      this.form.patchValue({
        date_revision: date.toISOString().split('T')[0]
      })
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const product = this.form.getRawValue();

    if (!this.isEditMode) this.insertProduct(product);
    else this.updateProduct(product);
  }

  insertProduct(product: Product) {
    this._productService.createProduct(product).subscribe({
      next: () => {
        alert('Producto creado');
        this.form.reset();
      },
      error: () => {
        alert('Error al crear el producto');
        this.isSubmitting = false;
      }
    })
  }

  updateProduct(product: Product) {
    this._productService.updateProduct(this.productId, product).subscribe({
      next: () => {
        alert('Producto actualizado');
        this._router.navigate(['/products']);
      },
      error: () => {
        alert('Error al actualizar el producto');
        this.isSubmitting = false;
      }
    })
  }

  reset() {
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }

  loadProduct() {
    this._productService.getProductById(this.productId).subscribe(product => {
      
      this.form.patchValue({
        ...product,
        date_release: formatDate(product.date_release),
        date_revision: formatDate(product.date_revision)
      })
      this.form.get('id')?.disable();
    })
  }

}
