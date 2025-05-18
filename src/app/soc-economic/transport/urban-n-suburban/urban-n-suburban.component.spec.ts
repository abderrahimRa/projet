import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanNSuburbanComponent } from './urban-n-suburban.component';

describe('UrbanNSuburbanComponent', () => {
  let component: UrbanNSuburbanComponent;
  let fixture: ComponentFixture<UrbanNSuburbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrbanNSuburbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrbanNSuburbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
