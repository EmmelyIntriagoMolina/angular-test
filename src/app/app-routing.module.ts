import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductsModule } from './features/products/products.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module')
      .then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    preloadingStrategy: PreloadAllModules 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
