import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { AccommodationSummary } from './model/accommodation-summary';
import { environment } from '../env/env';
import {catchError, Observable, BehaviorSubject, tap } from 'rxjs';
import {AccommodationRequest} from "./model/accommodation-request";
import {MessageResponse} from "./model/message-response";
import {AccommodationRequestSummary} from "./model/accommodation-request-summary";
import {AccommodationSummaryCollection} from "./model/accommodation-summary-collection";
import { SearchCriteria } from './model/SearchCriteria';
import { Reservation } from './model/accommodation-reservation';
import { ReviewRequest } from './model/review-request';
import { ReviewResponse } from './model/review-response';
import {ReservationCollection} from "./model/accommodation-reservation-collection";
import {HostReservationResponseCollection} from "./model/host-reservation-response-collection";
import { Host } from './model/host-data';
import { ReservationStatus } from './model/reservation-status';
import { Guest } from './model/guest-data';
import {AccommodationLogCollection} from "../host/model/accommodation-log-collection";
import {AccommodationMonthlyLogCollection} from "../host/model/accommodation-monthly-log-collection";
import {HostReservationSummaryCollection} from "../host/model/host-reservation-summary-Collection";
import { UserReportData } from '../admin/user-blocking/user-report-data';
import { UserData } from '../admin/user-blocking/user-data';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private summaries: AccommodationSummary[]=[];
  private filteredAccommodationsSubject = new BehaviorSubject<AccommodationSummary[]>([]);
  filteredAccommodations$ = this.filteredAccommodationsSubject.asObservable();

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
  getAllHostReservationsFiltered(hostId:string,startDate:Date | null,endDate:Date | null,accommodationName:string | null,reservationStatus:ReservationStatus,page:number,numberOfElements:number): Observable<HostReservationSummaryCollection>{
    let params = new HttpParams();
    console.log(startDate);
    // Add non-null parameters to the HttpParams
    if (startDate) {
      params = params.set('startDateStr', startDate.toISOString());
    }

    if (endDate) {
      params = params.set('endDateStr', endDate.toISOString());
    }

    if (accommodationName) {
      params = params.set('reservationName', accommodationName);
    }

    params = params
        .set('reservationStatus', reservationStatus)
        .set('page', page.toString())
        .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<HostReservationSummaryCollection>(environment.apiHost + `reservation/${hostId}/filtered`, {params})
  }
  getAllHostReservations(hostId: string, page: number, numberOfElements: number): Observable<HostReservationSummaryCollection>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<HostReservationSummaryCollection>(environment.apiHost + `reservation/${hostId}/results`, {params})
  }
  getAllUnresolvedHostReservations(hostId: string, page: number, numberOfElements: number): Observable<HostReservationSummaryCollection>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<HostReservationSummaryCollection>(environment.apiHost + `reservation/${hostId}/unresolved`, {params})
  }
  getAccommodationById(accommodationId : string){
    return this.httpClient.post<AccommodationRequest>(environment.apiHost + `accommodation/details/${accommodationId}`,{}).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        throw error;
      }));
  }

  addFavoriteAccommodation(guestId: string, accommodationId: String): Observable<Boolean> {
    return this.httpClient.put<Boolean>(environment.apiHost + `accommodation/add-favourite/${guestId}/${accommodationId}`, null);
  }

  removeFavoriteAccommodation(guestId: string, accommodationId: String): Observable<Boolean> {
    return this.httpClient.put<Boolean>(environment.apiHost + `accommodation/remove-favourite/${guestId}/${accommodationId}`, null);
  }

  isFavoriteAccommodation(guestId: string, accommodationId: String): Observable<Boolean> {
    return this.httpClient.get<Boolean>(environment.apiHost + `accommodation/is-favourite/${guestId}/${accommodationId}`);
  }

  getFavouriteAccommodations(guestId: string): Observable<AccommodationSummary[]> {
    return this.httpClient.get<AccommodationSummary[]>(environment.apiHost + `accommodation/get-favourite/${guestId}`);
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

  getAllReviews(accommodationId: string): Observable<ReviewResponse[]> {
    return this.httpClient.get<ReviewResponse[]>(environment.apiHost+'review/'+accommodationId+'?flag=1');
  }
  
  getAllReportedReviews(): Observable<ReviewResponse[]> {
    console.log(environment.apiHost+'review/reported-reviews');
    return this.httpClient.get<ReviewResponse[]>(environment.apiHost+'review/reported-reviews');
  }

  getAllUserReports(): Observable<UserReportData[]> {
    console.log(environment.apiHost+'user/reported');
    return this.httpClient.get<UserReportData[]>(environment.apiHost+'user/reported');
  }

  blockUser(userId:string): Observable <Boolean> {
    return this.httpClient.put<Boolean>(environment.apiHost+'user/blockUser/' + `${userId}`, null);
  }

  checkReviewPermission(username: string,accommodationId:string): Observable <Boolean> {
    return this.httpClient.get<Boolean>(environment.apiHost+'review/check/'+username+'/'+accommodationId);
  }

  getUserById(userId: string): Observable<UserData> {
    return this.httpClient.get<UserData>(environment.apiHost+'user/user-by-id/' + `${userId}`);
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

  cancelReservation(reservationId: string): Observable<Boolean> {
    const url = environment.apiHost + "reservation/" + "cancel/" + `${reservationId}`;
    console.log(url);
    return this.httpClient.put<Boolean>(url, null);
  }

  createReview(review:ReviewRequest): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse> (environment.apiHost+'review',review);
  }

  deleteReview(reviewId: string, flag: boolean): Observable<Boolean> {
    const params = new HttpParams().set('flag', flag.toString());
    return this.httpClient.delete<Boolean>(environment.apiHost + 'review/' + reviewId, { params });
  }  

  reportReview(reviewId:string): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(environment.apiHost+'review/report/'+reviewId+'?flag=1',null);
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
    
    return this.httpClient.get<AccommodationSummary[]>(environment.apiHost + 'accommodation/results', { params })
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          throw error;
        }),
        tap(filteredAccommodations => this.filteredAccommodationsSubject.next(filteredAccommodations))
      );
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

    return this.httpClient.get<AccommodationSummary[]>(environment.apiHost + 'accommodation/filtered', { params })
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          throw error;
        }),
        tap(filteredAccommodations => this.filteredAccommodationsSubject.next(filteredAccommodations))
      );
  }

  getHostById(hostId: string): Observable<Host> {
    return this.httpClient.get<Host>(environment.apiHost + "accommodation/data/" + hostId);
  }

  getGuestByUsername(guestUsername: string): Observable<Guest> {
    return this.httpClient.get<Guest>(environment.apiHost + "reservation/guest-id/" + guestUsername);
  }

  getAllGuestReservations(guestId: string, page: number, numberOfElements: number): Observable<HostReservationResponseCollection> {
    let params = new HttpParams()
        .set('page', page.toString())
        .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<HostReservationResponseCollection>(environment.apiHost + `accommodation/guest/${guestId}`,{params});
  }

  calculatePrice(startDate: Date, endDate: Date, accommodationId: string): Observable<number> {
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();
  
    return this.httpClient.get<number>(environment.apiHost + `reservation/price`, {
      params: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        accommodationId: accommodationId
      }
    });
  }
  
  getAllGuestReservationsFiltered(guestId:string, startDate:Date | null, endDate:Date | null, accommodationName:string | null, reservationStatus:ReservationStatus, page:number, numberOfElements:number): Observable<HostReservationResponseCollection>{
    let params = new HttpParams();
    //console.log(startDate);
    if (startDate) {
      params = params.set('startDateStr', startDate.toISOString());
    }

    if (endDate) {
      params = params.set('endDateStr', endDate.toISOString());
    }

    if (accommodationName) {
      params = params.set('reservationName', accommodationName);
    }

    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
    console.log("accommodationName:", accommodationName);
    console.log("reservationStatus:", reservationStatus);

    params = params
        .set('reservationStatus', reservationStatus)
        .set('page', page.toString())
        .set('numberOfElements', numberOfElements.toString());
    return this.httpClient.get<HostReservationResponseCollection>(environment.apiHost + `reservation/${guestId}/filtered-guest`, {params})
  }  
}
