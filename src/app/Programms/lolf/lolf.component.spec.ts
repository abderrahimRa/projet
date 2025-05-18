import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolfComponent } from './lolf.component';

describe('LOLFComponent', () => {
  let component: LolfComponent;
  let fixture: ComponentFixture<LolfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LolfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LolfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
