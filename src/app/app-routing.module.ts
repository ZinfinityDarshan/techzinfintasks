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
import { TaskviewComponent } from './components/taskview/taskview.component';
import { ViewdataComponent } from './components/viewdata/viewdata.component';

import { MeetingsComponent } from './components/meetings/meetings.component';
import { ViewBlogComponent } from './components/view/view-blog/view-blog.component';
import { TaskboardComponent } from './components/taskboard/taskboard.component';
import { ProjectViewComponent } from './components/view/project-view/project-view.component';
import { ViewProfileComponent } from './components/view/view-profile/view-profile.component';
import { ViewAllTaskComponent } from './components/view-all-task/view-all-task.component';
import { ViewNotesComponent } from './components/view/view-notes/view-notes.component';
import { LoginGuard } from './guards/login.guard';
import { ViewAllNotificationComponent } from './components/view-all-notification/view-all-notification.component';
import { TaskDashBoardComponent } from './components/task-dash-board/task-dash-board.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate:[LoginGuard]},
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
            path:'',
            redirectTo:'tasks',
            pathMatch: 'full'
          },
          {
            path:"task/:id",
            component: TaskviewComponent
          },
          {
            path: 'tasks',
            component: ViewAllTaskComponent
          },
          {
            path: 'notes',
            component: ViewNotesComponent
          }
        ]
      },
      {
        path: "meetings",
        component:MeetingsComponent
      },
      {
        path: 'blogs',
        component: ViewBlogComponent
      },
      {
        path:"projects",
        component: ProjectViewComponent
      },
      {
        path:'notification',
        component: ViewAllNotificationComponent,
      },
      {
        path: 'everything',
        component: TaskDashBoardComponent
      }
    ]
  },
  {path: 'board/:project', component: TaskboardComponent, canActivate:[AuthGuard]},
  {
    path:"task/:id",
    component: TaskviewComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'profile',
    component: ViewProfileComponent,
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
