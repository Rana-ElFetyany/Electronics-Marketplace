import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../Core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private cartService: CartService) {}
  cartItems: any[] = [];

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems); // This should now log items in the cart if they exist
  }

  // Method to update quantity
  updateQuantity(item: any, increase: boolean) {
    if (!item.quantity) {
      item.quantity = 1;
    }

    if (increase) {
      item.quantity++;
    } else {
      if (item.quantity > 1) {
        item.quantity--;
      }
    }
  }

  // Method to calculate subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item); // Use service to remove item
    this.cartItems = this.cartService.getCartItems(); // Update local cartItems array
  }
}