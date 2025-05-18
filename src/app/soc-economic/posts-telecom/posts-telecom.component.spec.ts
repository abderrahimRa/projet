import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTeleComponent } from './posts-telecom.component';

describe('PostsTelecomComponent', () => {
  let component: PostTeleComponent;
  let fixture: ComponentFixture<PostTeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostTeleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
