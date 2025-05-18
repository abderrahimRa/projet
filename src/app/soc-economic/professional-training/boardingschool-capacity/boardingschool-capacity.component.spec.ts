import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingschoolCapacityComponent } from './boardingschool-capacity.component';

describe('BoardingschoolCapacityComponent', () => {
  let component: BoardingschoolCapacityComponent;
  let fixture: ComponentFixture<BoardingschoolCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardingschoolCapacityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardingschoolCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
