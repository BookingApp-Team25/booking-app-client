import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationSummary } from './model/accommodation-summary';
import { environment } from '../env/env';
import { Observable } from 'rxjs';
import {AccommodationRequest} from "./model/accommodation-request";
import {MessageResponse} from "./model/message-response";
import {AccommodationRequestSummary} from "./model/accommodation-request-summary";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private summaries: AccommodationSummary[]=[];

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<AccommodationSummary[]> {
    return this.httpClient.get<AccommodationSummary[]>(environment.apiHost + 'accommodation')
  }
  getAllUpdates(): Observable<AccommodationRequestSummary[]>{
    return this.httpClient.get<AccommodationRequestSummary[]>(environment.apiHost + "accommodation-request")
}
  postAccommodationRequest(data : AccommodationRequest): Observable<MessageResponse> {
   return this.httpClient.post<MessageResponse>(environment.apiHost + "accommodation-request", data)
  }

}
