import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestsComponent } from './forests.component';

describe('ForestsComponent', () => {
  let component: ForestsComponent;
  let fixture: ComponentFixture<ForestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
