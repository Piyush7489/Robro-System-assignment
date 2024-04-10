import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './common-components/login-user/login-user.component';
import { NavBarComponent } from './common-components/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminMainComponent } from './Admin-Panel/admin-main/admin-main.component';
import { AdminDashboardComponent } from './Admin-Panel/admin-dashboard/admin-dashboard.component';
import { SideBarComponent } from './Admin-Panel/side-bar/side-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { CaptureImageComponent } from './common-components/capture-image/capture-image.component';
import { WebcamModule } from 'ngx-webcam';
import { AddWorkerComponent } from './Admin-Panel/add-worker/add-worker.component';
import { AddSupervisorComponent } from './Admin-Panel/add-supervisor/add-supervisor.component';
import { ViewSupervisorComponent } from './Admin-Panel/view-supervisor/view-supervisor.component';
import { ViewWorkersComponent } from './Admin-Panel/view-workers/view-workers.component';
import { SupervisorMainComponent } from './Supervisor-Panel/supervisor-main/supervisor-main.component';
import { SupervisorDashboardComponent } from './Supervisor-Panel/supervisor-dashboard/supervisor-dashboard.component';
import { SupervisorSideBarComponent } from './Supervisor-Panel/supervisor-side-bar/supervisor-side-bar.component';
import { WorkerMainComponent } from './Worker-Panel/worker-main/worker-main.component';
import { WorkerDashboardComponent } from './Worker-Panel/worker-dashboard/worker-dashboard.component';
import { WorlerSideBarComponent } from './Worker-Panel/worker-side-bar/worler-side-bar.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';
import { PiechartComponent } from './Admin-Panel/piechart/piechart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as ApexCharts from 'apexcharts';
// import ApexCharts from 'apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    NavBarComponent,
    AdminMainComponent,
    AdminDashboardComponent,
    SideBarComponent,
    CaptureImageComponent,
    AddWorkerComponent,
    AddSupervisorComponent,
    ViewSupervisorComponent,
    ViewWorkersComponent,
    SupervisorMainComponent,
    SupervisorDashboardComponent,
    SupervisorSideBarComponent,
    WorkerMainComponent,
    WorkerDashboardComponent,
    WorlerSideBarComponent,
    PageNotFoundComponent,
    PiechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    WebcamModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
