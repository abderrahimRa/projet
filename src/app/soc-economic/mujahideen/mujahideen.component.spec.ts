import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MujahideenComponent } from './mujahideen.component';

describe('MujahideenComponent', () => {
  let component: MujahideenComponent;
  let fixture: ComponentFixture<MujahideenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MujahideenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MujahideenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
