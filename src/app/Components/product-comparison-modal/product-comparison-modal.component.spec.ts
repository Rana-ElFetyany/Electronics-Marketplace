import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComparisonModalComponent } from './product-comparison-modal.component';

describe('ProductComparisonModalComponent', () => {
  let component: ProductComparisonModalComponent;
  let fixture: ComponentFixture<ProductComparisonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComparisonModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComparisonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
