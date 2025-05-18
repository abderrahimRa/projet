import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhpComponent } from './php.component';

describe('PHPComponent', () => {
  let component: PhpComponent;
  let fixture: ComponentFixture<PhpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
