import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationSummary } from './model/accommodation-summary';
import { environment } from '../env/env';
import { Observable } from 'rxjs';
import {AccommodationRequest} from "./model/accommodation-request";
import {MessageResponse} from "./model/message-response";
import {AccommodationRequestSummary} from "./model/accommodation-request-summary";
import { HttpParams } from '@angular/common/http';// accommodation.service.ts
import { SearchCriteria } from './model/SearchCriteria';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private summaries: AccommodationSummary[] = [];

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<AccommodationSummary[]> {
    return this.httpClient.get<AccommodationSummary[]>(environment.apiHost + 'accommodation');
  }

  getAllUpdates(): Observable<AccommodationRequestSummary[]> {
    return this.httpClient.get<AccommodationRequestSummary[]>(environment.apiHost + 'accommodation-request');
  }

  postAccommodationRequest(data: AccommodationRequest): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(environment.apiHost + 'accommodation-request', data);
  }

  searchAccommodations(searchCriteria: SearchCriteria): Observable<AccommodationSummary[]> {
    // Handle null values for date properties
    const dateStartParam = searchCriteria.dateStart ? searchCriteria.dateStart.toISOString() : null;
    const dateEndParam = searchCriteria.dateEnd ? searchCriteria.dateEnd.toISOString() : null;

    // Create an HttpParams object to handle query parameters
    let params = new HttpParams();
    
    if (searchCriteria.location) {
      params = params.set('city', searchCriteria.location);
    }

    if (dateStartParam) {
      params = params.set('dateStart', dateStartParam);
    }

    if (dateEndParam) {
      params = params.set('dateEnd', dateEndParam);
    }

    if (searchCriteria.numberOfGuests) {
      params = params.set('guestNumber', searchCriteria.numberOfGuests);  
    }

    // Make the HTTP request with the constructed parameters
    return this.httpClient.get<AccommodationSummary[]>(environment.apiHost + 'results', { params });
  }
}
