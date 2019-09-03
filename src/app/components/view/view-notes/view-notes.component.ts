import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService } from 'src/app/services/fire.service';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { Note } from 'src/app/httpobjects/note';
import { User } from 'src/app/httpobjects/user';

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

}
