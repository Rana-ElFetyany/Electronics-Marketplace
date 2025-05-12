import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this._isLoading.asObservable();

  show() {
    this._isLoading.next(true);
  }

  hide() {
    this._isLoading.next(false);
  }

  autoHide(duration: number) {
    this.show();
    setTimeout(() => this.hide(), duration);
  }
}
