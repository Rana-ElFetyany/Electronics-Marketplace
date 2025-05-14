import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../Core/interfaces/products';
import { Router } from '@angular/router';
import { ComparisonService } from '../../Core/services/comparison.service';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss',
})
export class CompareComponent implements OnInit {
  comparedProducts: Product[] = [];

  constructor(
    private comparisonService: ComparisonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comparedProducts = this.comparisonService.getProducts();

    if (this.comparedProducts.length < 2) {
      alert('Please select two products to compare.');
      this.router.navigate(['/']); // Redirect back if less than 2 products
    }
  }

  clearComparison() {
    this.comparisonService.clearComparison();
    this.router.navigate(['/']);
  }
}