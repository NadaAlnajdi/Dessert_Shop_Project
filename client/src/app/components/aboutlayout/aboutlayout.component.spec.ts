import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutlayoutComponent } from './aboutlayout.component';

describe('AboutlayoutComponent', () => {
  let component: AboutlayoutComponent;
  let fixture: ComponentFixture<AboutlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
