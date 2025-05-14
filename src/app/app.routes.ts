import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { CartComponent } from './Components/cart/cart.component';
import { CompareComponent } from './Components/compare/compare.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent, title: 'Welcome' },
  { path: 'Home', component: HomeComponent },
  { path: 'Cart', component: CartComponent },
  { path: 'Compare', component: CompareComponent },
];
