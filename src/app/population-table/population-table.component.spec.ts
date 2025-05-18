import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationTableComponent } from './population-table.component';

describe('PopulationTableComponent', () => {
  let component: PopulationTableComponent;
  let fixture: ComponentFixture<PopulationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
