import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from './../../Core/services/cart.service';
import Swal from 'sweetalert2';
import { AfterViewInit } from '@angular/core';
import { Carousel } from 'bootstrap';


@Component({
  selector: 'app-product-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details-modal.component.html',
  styleUrl: './product-details-modal.component.scss',
})
export class ProductDetailsModalComponent {
  @Input() product: any;
  @Output() close = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  ngAfterViewInit(): void {
    const myCarousel = document.querySelector('#carouselProductImages');
    if (myCarousel) {
      new Carousel(myCarousel); // Bootstrap initializes the carousel properly now
    }
  }

  closeModal() {
    this.close.emit();
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  addToCart(product: any) {
    if (product.stock > 0) {
      this.cartService.addToCart(product); // <== use CartService, NOT local array

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `"${product.title}" was added to cart!`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: '#d4edda',
        color: '#155724',
        iconColor: '#28a745',
      });
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: `"${product.title}" is out of stock.`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#f8d7da',
        color: '#721c24',
        iconColor: '#dc3545',
      });
    }
  }
}
