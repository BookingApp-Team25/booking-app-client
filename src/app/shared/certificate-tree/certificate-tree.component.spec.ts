import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateTreeComponent } from './certificate-tree.component';

describe('CertificateTreeComponent', () => {
  let component: CertificateTreeComponent;
  let fixture: ComponentFixture<CertificateTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateTreeComponent]
    });
    fixture = TestBed.createComponent(CertificateTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
