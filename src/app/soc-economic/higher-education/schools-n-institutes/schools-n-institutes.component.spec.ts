import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsNInstitutesComponent } from './schools-n-institutes.component';

describe('SchoolsNInstitutesComponent', () => {
  let component: SchoolsNInstitutesComponent;
  let fixture: ComponentFixture<SchoolsNInstitutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsNInstitutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolsNInstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
