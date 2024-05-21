import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistrationRequest, Role } from './model/registration-request';
import { MessageResponse } from './model/message-response';
import {EditAccountRequest} from "./model/edit-account";
describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let url = 'http://localhost:8080/api';
  let username;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call edit account and return a succesful message response", () => {
    const editRequest: EditAccountRequest={
      password: 'password',
      passwordRepeat: 'password',
      firstName: 'Petar',
      lastName: 'Petrovic',
      address: 'Bulevar Oslobodjenja 12',
      phoneNumber: '1234567890'
    }
    const messageResponse: MessageResponse={
      successful:true,
      message: "Activation link is sent to your email"
    }
     username = service.getUsername();
    service.editAccount(editRequest).subscribe((res) => {
      expect(res).toEqual(messageResponse);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/user/${username}`
    })

    req.flush(messageResponse);
  })
});
