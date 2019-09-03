import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MytaskComponent } from './components/mytask/mytask.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { TaskviewComponent } from './components/taskview/taskview.component';
import { ViewdataComponent } from './components/viewdata/viewdata.component';
import { BlogsComponent } from './components/dashboard/blogs/blogs.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate:[AuthGuard]},
  {path: 'admin', component: AdminComponent, pathMatch:'prefix', canActivate:[AuthGuard, AdminGuard],
    children:[
      {
        path:"views",
        component: ViewdataComponent
      }
    ]
  },
  {path: 'dash', component: DashboardComponent, canActivate:[AuthGuard],
    children:[
      {
        path:"mytask",
        component:MytaskComponent,
        children: [
          {
            path:"task/:id",
            component: TaskviewComponent
          }
        ]
      },
      {
        path: "timesheet",
        component:TimesheetComponent
      },
      {
        path: 'blogs',
        component: BlogsComponent
      }
    ]
  },
  // {path: 'blogs', component: BlogsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
