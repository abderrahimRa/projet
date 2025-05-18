import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamedicsComponent } from './paramedics.component';

describe('ParamedicsComponent', () => {
  let component: ParamedicsComponent;
  let fixture: ComponentFixture<ParamedicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamedicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
