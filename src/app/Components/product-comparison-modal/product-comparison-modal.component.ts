import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../Core/interfaces/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-comparison-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-comparison-modal.component.html',
  styleUrl: './product-comparison-modal.component.scss',
})
export class ProductComparisonModalComponent {
  hovered: number | null = null;

  @Input() compareList: Product[] = [];
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
