import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './common-components/login-user/login-user.component';
import { AdminMainComponent } from './Admin-Panel/admin-main/admin-main.component';
import { AdminDashboardComponent } from './Admin-Panel/admin-dashboard/admin-dashboard.component';
import { CaptureImageComponent } from './common-components/capture-image/capture-image.component';
import { adminGuard } from './Guard/admin.guard';
import { AddWorkerComponent } from './Admin-Panel/add-worker/add-worker.component';
import { AddSupervisorComponent } from './Admin-Panel/add-supervisor/add-supervisor.component';
import { ViewSupervisorComponent } from './Admin-Panel/view-supervisor/view-supervisor.component';
import { ViewWorkersComponent } from './Admin-Panel/view-workers/view-workers.component';
import { SupervisorMainComponent } from './Supervisor-Panel/supervisor-main/supervisor-main.component';
import { SupervisorDashboardComponent } from './Supervisor-Panel/supervisor-dashboard/supervisor-dashboard.component';
import { WorkerMainComponent } from './Worker-Panel/worker-main/worker-main.component';
import { WorkerDashboardComponent } from './Worker-Panel/worker-dashboard/worker-dashboard.component';
import { supervisorGuard } from './Guard/supervisor.guard';
import { workerGuard } from './Guard/worker.guard';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',component:LoginUserComponent},
  {path:'capture-image',component:CaptureImageComponent},
  {path:'admin',component:AdminMainComponent,
  canActivate:[adminGuard],
    children:[
      {path:'',component:AdminDashboardComponent},
      {path:'add-worker',component:AddWorkerComponent},
      {path:'add-supervisor',component:AddSupervisorComponent},
      {path:'view-supervisor',component:ViewSupervisorComponent},
      {path:'view-workers',component:ViewWorkersComponent},
    ],
    
  },
  {path:"supervisor",component:SupervisorMainComponent,
  canActivate:[supervisorGuard],
    children:[
      {path:"",component:SupervisorDashboardComponent}
    ]
  },
  {path:"worker",component:WorkerMainComponent,
  canActivate:[workerGuard],
    children:[
      {path:"",component:WorkerDashboardComponent}
    ]
  },
  {path:"**",component:PageNotFoundComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
