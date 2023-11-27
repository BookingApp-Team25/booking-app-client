import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import { RegistrationComponent } from "./layout/registration/registration.component";

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  { component: RegistrationComponent, path: "registration" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

