import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "../../app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { PendingChangesGuard } from "src/app/core/guards/pending-changes.guard";

const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'create',
        component: ProductFormComponent,
        canDeactivate: [PendingChangesGuard]
    },
    {
        path: 'edit/:id',
        component: ProductFormComponent,
        canDeactivate: [PendingChangesGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }