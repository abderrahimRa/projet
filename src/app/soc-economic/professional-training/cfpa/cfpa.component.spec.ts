import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFPAComponent } from './cfpa.component';

describe('CFPAComponent', () => {
  let component: CFPAComponent;
  let fixture: ComponentFixture<CFPAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CFPAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CFPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
