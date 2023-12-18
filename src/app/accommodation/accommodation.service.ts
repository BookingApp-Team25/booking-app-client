import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { AccommodationSummary } from './model/accommodation-summary';
import { environment } from '../env/env';
import {catchError, Observable} from 'rxjs';
import {AccommodationRequest} from "./model/accommodation-request";
import {MessageResponse} from "./model/message-response";
import {AccommodationRequestSummary} from "./model/accommodation-request-summary";
import {AccommodationSummaryCollection} from "./model/accommodation-summary-collection";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private summaries: AccommodationSummary[]=[];

  constructor(private httpClient: HttpClient) { }


  getAllApprovedAccommodations(page : number, numberOfElements: number): Observable<AccommodationSummaryCollection> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<AccommodationSummaryCollection>(environment.apiHost + 'accommodation/approved',{params});
  }
  getAllHostAccommodations(hostId: string, page: number, numberOfElements: number): Observable<AccommodationSummaryCollection>{
    let params = new HttpParams()
        .set('page', page.toString())
        .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<AccommodationSummaryCollection>(environment.apiHost + `accommodation/host/${hostId}`,{params});
  }
  getAllUpdates(): Observable<AccommodationRequestSummary[]>{
    return this.httpClient.get<AccommodationRequestSummary[]>(environment.apiHost + "accommodation-request")
}
  postAccommodationRequest(data : AccommodationRequest): Observable<MessageResponse> {
   return this.httpClient.post<MessageResponse>(environment.apiHost + "accommodation-request", data)
  }
  resolveAccommodationRequest(requestID : string,flag : number): Observable<MessageResponse> {
    const params = new HttpParams().set('flag', flag.toString());
    console.log(environment.apiHost +"accommodation-request/"+`${requestID}`)
    return this.httpClient.put<MessageResponse>(environment.apiHost +"accommodation-request/"+`${requestID}`,null,{params}) .pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        // Handle the error appropriately (throw a custom error or return a default value)
        throw error;
      }));
  }
}
