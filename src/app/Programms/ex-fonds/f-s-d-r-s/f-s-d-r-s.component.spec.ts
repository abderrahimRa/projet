import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsdrsComponent } from './f-s-d-r-s.component';

describe('FSDRSComponent', () => {
  let component: FsdrsComponent;
  let fixture: ComponentFixture<FsdrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FsdrsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsdrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
