import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccommodationsViewComponent } from './host-accommodations-view.component';

describe('HostAccommodationsViewComponent', () => {
  let component: HostAccommodationsViewComponent;
  let fixture: ComponentFixture<HostAccommodationsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostAccommodationsViewComponent]
    });
    fixture = TestBed.createComponent(HostAccommodationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
