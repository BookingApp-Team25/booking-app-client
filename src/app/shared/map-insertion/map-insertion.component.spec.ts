import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInsertionComponent } from './map-insertion.component';

describe('MapInsertionComponent', () => {
  let component: MapInsertionComponent;
  let fixture: ComponentFixture<MapInsertionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapInsertionComponent]
    });
    fixture = TestBed.createComponent(MapInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
