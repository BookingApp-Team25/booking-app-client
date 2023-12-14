import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from './model/login-request';
import { LoginResponse } from './model/login-response';
import { environment } from 'src/app/env/env';
import {JwtHelperService} from "@auth0/angular-jwt";
import { MessageResponse } from './model/message-response';
import { AccountDetails } from './model/account-details';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$=new BehaviorSubject("");
  userState=this.user$.asObservable();
  constructor(private http: HttpClient) { 
  }

  login(auth:any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiHost+'auth/login',auth,{
      headers: this.headers,
    });
  }

  register(auth:any): Observable<MessageResponse> {
    return this.http.post<any>(environment.apiHost+'auth/register',auth,{
      headers: this.headers,
    });
  }

  accountDetails():Observable<AccountDetails> {
    return this.http.get<any>(environment.apiHost+'user/details/'+this.getUsername());
  }

  getRole(): any {
    if(this.isLoggedIn()){
      const accessToken: any=localStorage.getItem('user');
      const jwtHelper=new JwtHelperService();
      return jwtHelper.decodeToken(accessToken).role[0].authority;
    }
    return null;
  }
  getUsername(): any {
    if(this.isLoggedIn()){
      const accessToken: any=localStorage.getItem('user');
      const jwtHelper=new JwtHelperService();
      return jwtHelper.decodeToken(accessToken).sub;
    }
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
}
