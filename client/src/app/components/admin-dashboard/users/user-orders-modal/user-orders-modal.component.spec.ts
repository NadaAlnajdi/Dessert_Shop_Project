import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersModalComponent } from './user-orders-modal.component';

describe('UserOrdersModalComponent', () => {
  let component: UserOrdersModalComponent;
  let fixture: ComponentFixture<UserOrdersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrdersModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserOrdersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
