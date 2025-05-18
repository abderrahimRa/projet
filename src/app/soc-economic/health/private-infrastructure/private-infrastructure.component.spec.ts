import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateInfrastructureComponent } from './private-infrastructure.component';

describe('PrivateInfrastructureComponent', () => {
  let component: PrivateInfrastructureComponent;
  let fixture: ComponentFixture<PrivateInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateInfrastructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
