import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateNode } from './CertificateNode';
import { environment } from '../env/env';
import { CertRequestDTO } from './CertRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getCertificateHierarchy(): Observable<CertificateNode[]> {
    console.log(environment.apiHost + 'admin');
    
    return this.http.get<CertificateNode[]>(environment.apiHost + 'admin');
  }

  createCertificateRequest(data: CertRequestDTO): Observable<Boolean> {
    return this.http.post<Boolean>(environment.apiHost + 'admin/request', data);
  }
}
