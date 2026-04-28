import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../models/guard.model';

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean {
    return component.canDeactivate
      ? component.canDeactivate()
      : true;
  }
}
