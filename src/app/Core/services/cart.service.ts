import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems'; // Key to store cart data

  constructor() {}

  // Retrieve cart items from localStorage
  getCartItems(): any[] {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  // Add an item to the cart
  addToCart(item: any): void {
    const cartItems = this.getCartItems();
    cartItems.push(item);
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  // Remove an item from the cart
  removeFromCart(item: any): void {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }
}
