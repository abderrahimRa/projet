import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateComponent } from './state-budget.component';

describe('StateBudgetComponent', () => {
  let component: StateComponent;
  let fixture: ComponentFixture<StateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
