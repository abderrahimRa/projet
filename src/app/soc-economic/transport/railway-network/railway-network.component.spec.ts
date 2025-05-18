import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RailwayNetworkComponent } from './railway-network.component';

describe('RailwayNetworkComponent', () => {
  let component: RailwayNetworkComponent;
  let fixture: ComponentFixture<RailwayNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RailwayNetworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RailwayNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
