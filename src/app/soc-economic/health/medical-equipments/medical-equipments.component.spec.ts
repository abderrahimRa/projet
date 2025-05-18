import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalEquipmentsComponent } from './medical-equipments.component';

describe('MedicalEquipmentsComponent', () => {
  let component: MedicalEquipmentsComponent;
  let fixture: ComponentFixture<MedicalEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalEquipmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
