import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyguestsComponent } from './myguests.component';

describe('MyguestsComponent', () => {
  let component: MyguestsComponent;
  let fixture: ComponentFixture<MyguestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyguestsComponent]
    });
    fixture = TestBed.createComponent(MyguestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
