import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudComponent } from './sud.component';

describe('SUDComponent', () => {
  let component: SudComponent;
  let fixture: ComponentFixture<SudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
