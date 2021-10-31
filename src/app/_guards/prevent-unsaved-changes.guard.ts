import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateEditComponent } from '../candidates/candidate-edit/candidate-edit.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: CandidateEditComponent): boolean {
    if (component.editForm.dirty) {
      return confirm('Are you sure? Any unsaved changes will be lost.');
    }
    return true;
  }
}
