export interface RegistrationRequest {
    username: string;
    password: string;
    passwordRepeat: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    role: Role;
  }

  export enum Role {
    Guest = 'Guest',
    Host = 'Host',
    Admin = 'Admin'
  }