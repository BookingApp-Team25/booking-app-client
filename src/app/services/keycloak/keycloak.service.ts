import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "./user-profile";
import { AccommodationService } from 'src/app/accommodation/accommodation.service';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined
  private _profile: UserProfile | undefined

  get keycloak(){
    if(!this._keycloak){
      this._keycloak = new Keycloak({
        url:'http://localhost:9090',
        realm: 'TestRealm1',
        clientId: 'booking-app'
      });
    }
    return this._keycloak;
  }

  get profile(){
    return this._profile;
  }

  constructor(private accommodationService: AccommodationService) { }
  async  init(){
    console.log('Authentication of user')
    const authenticated = await this.keycloak?.init({
      //onLoad: 'login-required',
      onLoad: 'check-sso',
      //silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    });
    if(authenticated){
      console.log("authenticated");
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }
  }
  login(){
    console.log("LOGINOVAN")
    return this.keycloak?.login();
  }
  register(){
    console.log("REGISTROVAN")
    return this._keycloak?.register();
  }
  logout(){
    return this.keycloak?.logout();
  }
  accountManagement(){
    return this.keycloak?.accountManagement();
  }
}
