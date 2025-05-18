import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicInfrastructureComponent } from './public-infrastructure.component';

describe('PublicInfrastructureComponent', () => {
  let component: PublicInfrastructureComponent;
  let fixture: ComponentFixture<PublicInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicInfrastructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
