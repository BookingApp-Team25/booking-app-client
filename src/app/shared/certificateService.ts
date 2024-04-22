import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateNode } from './CertificateNode';
import { environment } from '../env/env';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getCertificateHierarchy(): Observable<CertificateNode[]> {
    return this.http.get<CertificateNode[]>(environment.apiHost + 'api/admin');
  }
}
