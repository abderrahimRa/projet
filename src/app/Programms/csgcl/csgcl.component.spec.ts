import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsgclComponent } from './csgcl.component';

describe('CsgclComponent', () => {
  let component: CsgclComponent;
  let fixture: ComponentFixture<CsgclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsgclComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsgclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
