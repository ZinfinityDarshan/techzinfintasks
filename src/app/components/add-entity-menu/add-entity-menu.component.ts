import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddContactComponent } from '../admin/addcontact/add-contact-component';
import { AddExpenseComponent } from '../admin/addexpense/add-expense-component';
import { AddNoteComponent } from '../admin/addnote/add-note-component';
import { AddBlogComponent } from '../add/add-blog/add-blog.component';
import { AddLeaveComponent } from '../add/add-leave/add-leave.component';
import { AddTaskComponent } from '../add/add-task/add-task.component';

@Component({
  selector: 'app-add-entity-menu',
  templateUrl: './add-entity-menu.component.html',
  styleUrls: ['./add-entity-menu.component.scss']
})
export class AddEntityMenuComponent implements OnInit {

  constructor( private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '800px',
      data: {name: 'beduk', animal: 'darrav'},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  openAddExpenseDialog(): void {
    const dialogRef = this.dialog.open(AddExpenseComponent, {
      width: '800px',
      data: {name: 'beduk', animal: 'darrav'},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  openAddNoteDialog(): void {
    this.dialog.open(AddNoteComponent, {
      width: '800px',
      data: {name: 'beduk', animal: 'darrav'},
      disableClose: true
    });
  }

  openAddTaskDialog(): void {
    this.dialog.open(AddTaskComponent, {
      width: '900px',
      height: '95%',
      data: {name: 'beduk', animal: 'darrav'},
      disableClose: false
    });
  }

  openAddBlogDialog(): void{
    this.dialog.open(AddBlogComponent,{
      width: '1000px',
      height: '100%',
      data: {name: 'beduk', animal: 'darrav'},
      disableClose: true
    });
  }

  openAddLeavegDialog(){
    this.dialog.open(AddLeaveComponent,{
      width: '400px',
      height: '60%',
      data: {name: 'beduk', animal: 'darrav'},
      disableClose: true
    });
  }
}
