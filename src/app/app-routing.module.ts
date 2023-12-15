import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WineComponent} from "./wine/wine/wine.component";
import {HomeComponent} from "./layout/home/home.component";
import {CreateWineComponent} from "./wine/create-wine/create-wine.component";

const routes: Routes = [
  {component: WineComponent, path:"wine"},
  {component: HomeComponent, path:"home"},
  {component: CreateWineComponent, path:"create"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
