import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsehpComponent } from './f.s.e.h.p.component';

describe('FSEHPComponent', () => {
  let component: FsehpComponent;
  let fixture: ComponentFixture<FsehpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FsehpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsehpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
