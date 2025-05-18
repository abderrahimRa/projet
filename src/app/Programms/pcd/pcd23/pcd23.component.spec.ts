import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pcd23Component } from './pcd23.component';

describe('Pcd23Component', () => {
  let component: Pcd23Component;
  let fixture: ComponentFixture<Pcd23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pcd23Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pcd23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
