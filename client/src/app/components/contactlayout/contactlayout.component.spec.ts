import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactlayoutComponent } from './contactlayout.component';

describe('ContactlayoutComponent', () => {
  let component: ContactlayoutComponent;
  let fixture: ComponentFixture<ContactlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
