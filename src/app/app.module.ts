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
    ViewContactComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }},
  ],
  entryComponents:[
    AddContactComponent,
    AddExpenseComponent,
    AddNoteComponent
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
