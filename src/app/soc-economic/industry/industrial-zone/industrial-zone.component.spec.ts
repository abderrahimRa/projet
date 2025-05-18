import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialComponent } from './industrial-zone.component';

describe('IndustrialZoneComponent', () => {
  let component: IndustrialComponent;
  let fixture: ComponentFixture<IndustrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustrialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
