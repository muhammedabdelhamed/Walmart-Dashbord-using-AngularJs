import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardOrderDetailsComponent } from './product-card-order-details.component';

describe('ProductCardOrderDetailsComponent', () => {
  let component: ProductCardOrderDetailsComponent;
  let fixture: ComponentFixture<ProductCardOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProductCardOrderDetailsComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCardOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
