import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PscComponent } from './ex-psc.component';

describe('EXPSCComponent', () => {
  let component: PscComponent;
  let fixture: ComponentFixture<PscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
