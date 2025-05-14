import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {
  private comparisonList: Product[] = [];

  addProduct(product: Product): string | null {
    if (this.comparisonList.length >= 2)
      return 'You can only compare 2 products.';
    if (
      this.comparisonList.length === 1 &&
      this.comparisonList[0].category !== product.category
    ) {
      return 'Please select products from the same category.';
    }

    this.comparisonList.push(product);
    return null;
  }

  getProducts(): Product[] {
    return this.comparisonList;
  }

  clearComparison(): void {
    this.comparisonList = [];
  }
}