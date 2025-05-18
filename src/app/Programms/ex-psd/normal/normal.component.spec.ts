import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalPsdComponent } from './normal.component';

describe('NormalComponent', () => {
  let component: NormalPsdComponent;
  let fixture: ComponentFixture<NormalPsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalPsdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalPsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
