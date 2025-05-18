import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrayAreaComponent } from './gray-area.component';

describe('GrayAreaComponent', () => {
  let component: GrayAreaComponent;
  let fixture: ComponentFixture<GrayAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrayAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrayAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
