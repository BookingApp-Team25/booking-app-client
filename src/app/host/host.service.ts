import { Injectable } from '@angular/core';
import { ReviewRequest } from '../accommodation/model/review-request';
import { Observable } from 'rxjs';
import { MessageResponse } from '../accommodation/model/message-response';
import { environment } from '../env/env';
import { HttpClient } from '@angular/common/http';
import { HostDetailsResponse } from './model/host-details-response';
import { AccountDetails } from '../infrastructure/auth/model/account-details';
import { ReviewResponse } from '../accommodation/model/review-response';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  constructor(private httpClient: HttpClient) { }

  createReview(review:ReviewRequest): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse> (environment.apiHost+'review',review);
  }

  getHostDetails(hostId:string): Observable <AccountDetails> {
    return this.httpClient.get <AccountDetails> (environment.apiHost+'user/host-details/'+hostId);
  }

  getAllReviews(username: string): Observable <ReviewResponse[]> {
    return this.httpClient.get <ReviewResponse[]> (environment.apiHost+'review/'+username+'?flag=0');
  }

  reportReview(reviewId:string): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(environment.apiHost+'review/report/'+reviewId+'?flag=0',null);
  }

  deleteReview(reviewId: string): Observable<Boolean> {
    return this.httpClient.delete<Boolean>(environment.apiHost+'review/'+reviewId+'?flag=0');
  }

  reportHost(username:string): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(environment.apiHost+'user/report/'+username,null);
  }

  checkReportPermission(guestUsername:string,hostUsername:string): Observable<Boolean> {
    return this.httpClient.get <Boolean>(environment.apiHost+'user/check/'+guestUsername+'/'+hostUsername);
  }
}
