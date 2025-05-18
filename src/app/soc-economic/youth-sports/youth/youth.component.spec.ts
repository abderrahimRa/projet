import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthComponent } from './youth.component';

describe('YouthComponent', () => {
  let component: YouthComponent;
  let fixture: ComponentFixture<YouthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
