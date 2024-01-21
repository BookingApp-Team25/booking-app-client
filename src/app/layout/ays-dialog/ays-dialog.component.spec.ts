import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AysDialogComponent } from './ays-dialog.component';

describe('AysDialogComponent', () => {
  let component: AysDialogComponent;
  let fixture: ComponentFixture<AysDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AysDialogComponent]
    });
    fixture = TestBed.createComponent(AysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
