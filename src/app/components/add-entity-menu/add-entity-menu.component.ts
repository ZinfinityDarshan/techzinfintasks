import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddContactComponent } from '../admin/addcontact/add-contact-component';
import { AddExpenseComponent } from '../admin/addexpense/add-expense-component';
import { AddNoteComponent } from '../admin/addnote/add-note-component';

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
    const dialogRef = this.dialog.open(AddNoteComponent, {
      width: '800px',
      data: {name: 'beduk', animal: 'darrav'},
      disableClose: true
    });
  }
}
