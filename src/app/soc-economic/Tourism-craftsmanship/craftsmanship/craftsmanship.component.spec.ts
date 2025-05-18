import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftsmanshipComponent } from './craftsmanship.component';

describe('CraftsmanshipComponent', () => {
  let component: CraftsmanshipComponent;
  let fixture: ComponentFixture<CraftsmanshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraftsmanshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraftsmanshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
