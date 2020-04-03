import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent} from './components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MytaskComponent } from './components/mytask/mytask.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { TaskviewComponent } from './components/taskview/taskview.component';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ViewdataComponent } from './components/viewdata/viewdata.component';
import { AddEntityMenuComponent } from './components/add-entity-menu/add-entity-menu.component';
import { AddContactComponent } from './components/admin/addcontact/add-contact-component';
import { BlogsComponent } from './components/dashboard/blogs/blogs.component';
import { AddExpenseComponent } from './components/admin/addexpense/add-expense-component';
import { AddNoteComponent } from './components/admin/addnote/add-note-component';
import { ViewNotesComponent } from './components/view/view-notes/view-notes.component';
import { ViewContactComponent } from './components/view/view-contact/view-contact.component';
import { QuillModule } from "ngx-quill";
import { AddBlogComponent } from './components/add/add-blog/add-blog.component';
import { ViewBlogComponent } from './components/view/view-blog/view-blog.component';
import { HighlightModule } from 'ngx-highlightjs';
import { hljsLanguages } from './constants/constants';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { TaskboardComponent } from './components/taskboard/taskboard.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { AddLeaveComponent } from './components/add/add-leave/add-leave.component';
import { ProjectViewComponent } from './components/view/project-view/project-view.component';
import { ShortCardComponent } from './components/taskboard/short-card/short-card.component';
import { ViewProfileComponent } from './components/view/view-profile/view-profile.component'; 
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { UpdateprofilepicbottomsheetComponent } from './components/view/view-profile/updateprofilepicbottomsheet/updateprofilepicbottomsheet.component';
import { ApprovalScreenComponent } from './components/approval-screen/approval-screen.component';
import { ProjectListCardsComponent } from './components/project-list-cards/project-list-cards.component';
import { TaskListForApprovalComponent } from './components/task-list-for-approval/task-list-for-approval.component';
import { SpinnerComponent } from './components/common/spinner/spinner.component';

// for FullCalendar!



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    DashboardComponent,
    MytaskComponent,
    TimesheetComponent,
    TaskviewComponent,
    ViewdataComponent,
    AddEntityMenuComponent,
    AddContactComponent,
    BlogsComponent,
    AddExpenseComponent,
    AddNoteComponent,
    ViewNotesComponent,
    ViewContactComponent,
    AddBlogComponent,
    ViewBlogComponent,
    MeetingsComponent,
    TaskboardComponent,
    SanitizeHtmlPipe,
    AddLeaveComponent,
    ProjectViewComponent,
    ShortCardComponent,
    ViewProfileComponent,
    UpdateprofilepicbottomsheetComponent,
    ApprovalScreenComponent,
    ProjectListCardsComponent,
    TaskListForApprovalComponent,
    SpinnerComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    QuillModule.forRoot({
      modules:{
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['code-block'],
      
          //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          //[{ 'direction': 'rtl' }],                         // text direction
      
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          //[{ 'align': [] }],
      
          ['clean'],                                         // remove formatting button
      
          ['link', 'image', 'video']                         // link and image, video
        ],
        theme: 'snow'
      }
    }),
    FullCalendarModule,
    AngularFireStorageModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }},
    // {provide: StorageBucket, useValue: '/profile' }
  ],
  entryComponents:[
    AddContactComponent,
    AddExpenseComponent,
    AddNoteComponent,
    AddBlogComponent,
    AddLeaveComponent,
    SpinnerComponent,
    UpdateprofilepicbottomsheetComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
