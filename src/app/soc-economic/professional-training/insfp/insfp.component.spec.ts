import { ComponentFixture, TestBed } from '@angular/core/testing';

import { INSFPComponent } from './insfp.component';

describe('INSFPComponent', () => {
  let component: INSFPComponent;
  let fixture: ComponentFixture<INSFPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [INSFPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(INSFPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
