import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { AccommodationSummary } from './model/accommodation-summary';
import { environment } from '../env/env';
import {catchError, Observable} from 'rxjs';
import {AccommodationRequest} from "./model/accommodation-request";
import {MessageResponse} from "./model/message-response";
import {AccommodationRequestSummary} from "./model/accommodation-request-summary";
import {AccommodationSummaryCollection} from "./model/accommodation-summary-collection";
import { SearchCriteria } from './model/SearchCriteria';
import { Reservation } from './model/accommodation-reservation';

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
  getAccommodationById(accommodationId : string){
    return this.httpClient.get<AccommodationRequest>(environment.apiHost + `accommodation/details/${accommodationId}`);
  }
  getAllUpdates(): Observable<AccommodationRequestSummary[]>{
    return this.httpClient.get<AccommodationRequestSummary[]>(environment.apiHost + "accommodation-request")
}
  createAccommodationRequest(data : AccommodationRequest): Observable<MessageResponse> {
   return this.httpClient.post<MessageResponse>(environment.apiHost + "accommodation-request", data)
  }
  editAccommodationRequest(data : AccommodationRequest, accommodationId : string): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(environment.apiHost + "accommodation-request/" + `${accommodationId}`, data);
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

  createReservation(reservation: Reservation): Observable<MessageResponse> {
    const url = `${environment.apiHost}reservation/create`;
    console.log(url);
    return this.httpClient.post<MessageResponse>(url, reservation);
  }

  cancelReservation(reservationId: string): Observable<boolean> {
    const url = `${environment.apiHost}reservation/${reservationId}/cancel`;
    console.log(url);
    return this.httpClient.delete<boolean>(url);
  }

  searchAccommodations(searchCriteria: SearchCriteria): Observable<AccommodationSummary[]> {
    const dateStartParam = searchCriteria.dateStart ? searchCriteria.dateStart.toISOString() : null;
    const dateEndParam = searchCriteria.dateEnd ? searchCriteria.dateEnd.toISOString() : null;

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

    return this.httpClient.get<AccommodationSummary[]>(environment.apiHost + 'accommodation/results', { params });
  }

  filterAccommodations(searchCriteria: SearchCriteria): Observable<AccommodationSummary[]> {
    const dateStartParam = searchCriteria.dateStart ? searchCriteria.dateStart.toISOString() : null;
    const dateEndParam = searchCriteria.dateEnd ? searchCriteria.dateEnd.toISOString() : null;

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

    if (searchCriteria.contents && searchCriteria.contents.length > 0) {
      params = params.set('contents', searchCriteria.contents.join(','));
    }

    if (searchCriteria.type) {
      params = params.set('accommodationType', searchCriteria.type);
    }

    if (searchCriteria.minPrice) {
      params = params.set('minPrice', searchCriteria.minPrice);
    }

    if (searchCriteria.maxPrice) {
      params = params.set('maxPrice', searchCriteria.maxPrice);
    }

    return this.httpClient.get<AccommodationSummary[]>(environment.apiHost + 'accommodation/filtered', { params });
  }
}
