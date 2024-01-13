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
import {ReservationCollection} from "./model/accommodation-reservation-collection";
import {HostReservationResponseCollection} from "./model/host-reservation-response-collection";
import {AccommodationLogCollection} from "../host/model/accommodation-log-collection";
import {AccommodationMonthlyLogCollection} from "../host/model/accommodation-monthly-log-collection";

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
  getAllHostLogs(startDate: Date, endDate: Date, hostUsername: string): Observable<AccommodationLogCollection> {
    let params = new HttpParams()
      .set('startDateStr', startDate.toISOString())
      .set('endDateStr', endDate.toISOString());
    return this.httpClient.get<AccommodationLogCollection>(environment.apiHost + `host/${hostUsername}/log`, {params});
  }
  getAllHostAccommodations(hostId: string, page: number, numberOfElements: number): Observable<AccommodationSummaryCollection>{
    let params = new HttpParams()
        .set('page', page.toString())
        .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<AccommodationSummaryCollection>(environment.apiHost + `accommodation/host/${hostId}`,{params});
  }
  getAllHostReservations(hostId: string, page: number, numberOfElements: number): Observable<ReservationCollection>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<ReservationCollection>(environment.apiHost + `reservation/${hostId}/results`, {params})
  }
  getAllUnresolvedHostReservations(hostId: string, page: number, numberOfElements: number): Observable<HostReservationResponseCollection>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<HostReservationResponseCollection>(environment.apiHost + `reservation/${hostId}/unresolved`, {params})
  }
  getAccommodationById(accommodationId : string){
    console.log(environment.apiHost + " " + accommodationId);
    return this.httpClient.post<AccommodationRequest>(environment.apiHost + `accommodation/details/${accommodationId}`,{}).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        // Handle the error appropriately (throw a custom error or return a default value)
        throw error;
      }));
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

  getAnnualReport(accommodationId:string): Observable<AccommodationMonthlyLogCollection> {
    return this.httpClient.get<AccommodationMonthlyLogCollection>(environment.apiHost +"host/" + `${accommodationId}` + "/annual-log");
  }
  createReservation(reservation: Reservation): Observable<MessageResponse> {
    const url = `${environment.apiHost}reservation/create`;
    console.log(url);
    return this.httpClient.post<MessageResponse>(url, reservation);
  }

  resolveReservationRequest(reservationId : string, isAccepted: boolean): Observable<MessageResponse>{
    const params = new HttpParams().set('isAccepted', isAccepted.toString());
    console.log(environment.apiHost +"reservation/"+`${reservationId}`)
    return this.httpClient.post<MessageResponse>(environment.apiHost + "reservation/" + `${reservationId}` + "/resolve",null,{params}).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        // Handle the error appropriately (throw a custom error or return a default value)
        throw error;
      })
    );
  }

  cancelReservation(reservationId: string): Observable<boolean> { // jel ovo za gosta??
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
