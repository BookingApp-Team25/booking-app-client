import {NgModule, ViewChild} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from "./layout/layout.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './layout/home/home.component';
import { RouterModule,Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './infrastructure/auth/interceptor';
import { ActivationComponent } from './infrastructure/auth/activation/activation.component';
import { AuthModule } from './infrastructure/auth/auth.module';
import { PopupService } from './services/popup/popup.service';
import { HostModule} from "./host/host.module";
import { AdminModule} from "./admin/admin.module";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Set default route
  { path: '**', redirectTo: '/home' }, // Handle other routes not found
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AuthModule,
    HostModule,
    AdminModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
