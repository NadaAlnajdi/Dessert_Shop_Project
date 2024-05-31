import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsWithPromotionComponent } from './products-with-promotion.component';

describe('ProductsWithPromotionComponent', () => {
  let component: ProductsWithPromotionComponent;
  let fixture: ComponentFixture<ProductsWithPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsWithPromotionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsWithPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
