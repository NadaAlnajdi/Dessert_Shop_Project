import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductsModalComponent } from './order-products-modal.component';

describe('OrderProductsModalComponent', () => {
  let component: OrderProductsModalComponent;
  let fixture: ComponentFixture<OrderProductsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProductsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderProductsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
