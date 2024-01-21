import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistrationRequest, Role } from './model/registration-request';
import { MessageResponse } from './model/message-response';
describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let url = 'http://localhost:8080/api';

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

  it('should register user and return successful message response', () => {
    const registrationRequest: RegistrationRequest={
      username: 'petarp@gmail.com',
      password: 'password',
      passwordRepeat: 'password',
      phoneNumber: '1234567890',
      firstName: 'Petar',
      lastName: 'Petrovic',
      address: 'Bulevar Oslobodjenja 12',
      role: Role.Guest
    }
    const messageResponse: MessageResponse={
      successful:true,
      message: "Activation link is sent to your email"
    }

    service.register(registrationRequest).subscribe((res) => {
      expect(res).toEqual(messageResponse);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/auth/register`
    })

    req.flush(messageResponse);
  })
});
