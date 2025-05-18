import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialProtectionComponent } from './social-protection.component';

describe('SocialProtectionComponent', () => {
  let component: SocialProtectionComponent;
  let fixture: ComponentFixture<SocialProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialProtectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
