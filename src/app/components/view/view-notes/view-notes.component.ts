import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService } from 'src/app/services/fire.service';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { Note } from 'src/app/httpobjects/note';
import { User } from 'src/app/httpobjects/user';
import { DBTableNames } from 'src/app/constants/constants';

@Component({
  selector: 'view-notes',
  templateUrl: './view-notes.component.html',
  styles: []
})
export class ViewNotesComponent implements OnInit {

  myNotes: Note[];
  currentuser: User;

  constructor(private snackBar: MatSnackBar, private share: DataSharingService,
      private formhelper: FormHelperService, private db: FireService) { 
        share.getCurrentUser().subscribe(data =>{
          this.currentuser = data;
          this.db.getCollectionWithCondition<Note>('notes','auther.id','==',this.currentuser.id).subscribe(data =>{
              if(data != null || data != undefined){
                this.myNotes = data;
                this.snackBar.open('Notes Available','close', {
                  duration:1500
                });
              }
          }, (error: any)=>{
            this.snackBar.open('Notes are not Available','close', {
              duration:1500
            });
          });
        });      
    }

  ngOnInit() {

  }

  deleteNote(note: Note){
    this.db.deleteDocument(note,DBTableNames.notes).subscribe(data =>{
      let i = this.myNotes.indexOf(note);
      this.myNotes = this.myNotes.splice(i,1);
    },err =>{
      this.snackBar.open('note cannot be deleted due to network problem', 'close', {duration:2000})
    })
  }

  updateNote(note: Note){
    this.db.updateDocument(note, DBTableNames.notes).subscribe(data =>{
      let i = this.myNotes.indexOf(note);
      this.myNotes = this.myNotes.splice(i,1);
      this.myNotes.push(data);
    }, err =>{
      this.snackBar.open('note cannot be updated due to network problem', 'close', {duration:2000})
    })
  }

}
