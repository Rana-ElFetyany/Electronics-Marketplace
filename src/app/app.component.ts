import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoaderService } from './Core/services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template: `
    <app-lottie-loader
      *ngIf="loaderService.isLoading$ | async"
    ></app-lottie-loader>
    <router-outlet *ngIf="!(loaderService.isLoading$ | async)"></router-outlet>
  `,
})
export class AppComponent {
  title = 'Electronics-Marketplace';

  constructor(public LoaderService: LoaderService) {
    this.LoaderService.autoHide(7000); // 7s loader
  }

  // In a ThemeService.ts
  toggleTheme() {
    const currentTheme = document.body.dataset['theme'];
    document.body.dataset['theme'] = currentTheme === 'dark' ? '' : 'dark';
  }
}
