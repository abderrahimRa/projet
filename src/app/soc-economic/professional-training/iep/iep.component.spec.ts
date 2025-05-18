import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IEPComponent } from './iep.component';

describe('IEPComponent', () => {
  let component: IEPComponent;
  let fixture: ComponentFixture<IEPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IEPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IEPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
