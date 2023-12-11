import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationSummary } from './model/accommodation-summary';
import { environment } from '../env/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private summaries: AccommodationSummary[]=[];

  constructor(private httpClient: HttpClient) { }
  

  getAll(): Observable<AccommodationSummary[]> {
    return this.httpClient.get<AccommodationSummary[]>(environment.apiHost + 'accommodation')
  }

}
