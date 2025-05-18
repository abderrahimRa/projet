import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityResidencesComponent } from './university-residences.component';

describe('UniversityResidencesComponent', () => {
  let component: UniversityResidencesComponent;
  let fixture: ComponentFixture<UniversityResidencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityResidencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityResidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
