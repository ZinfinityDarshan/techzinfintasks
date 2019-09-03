import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Note } from 'src/app/httpobjects/note';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { User } from 'src/app/httpobjects/user';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
    selector: 'add-note',
    templateUrl: 'addnote.component.html',
    styleUrls:['./../admin.component.scss']
  
  })
  export class AddNoteComponent {

    addNoteForm: FormGroup;
    currentuser: User;
  
    constructor(
      public dialogRef: MatDialogRef<AddNoteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Note, private db: FireService, private formHelper: FormHelperService,
      private fb: FormBuilder, private snackbar: MatSnackBar, private share: DataSharingService) {
            this.addNoteForm = this.fb.group({
                'title':[null, Validators.required],
                'note':[null, Validators.required]
            });
        
      this.share.getCurrentUser().subscribe(data =>{
        this.currentuser = data;
      })
        
      }
  
    closedialog(): void {
      this.dialogRef.close('imp');
    }

    description: string;
    onPaste(value: any){
      this.description = value;
    }


    addNote(note: Note){
      note.auther = this.currentuser;
      this.db.saveDocument(note, 'notes').subscribe(data =>{
        this.formHelper.removeValidators(this.addNoteForm);
        this.closedialog();
        this.snackbar.open('Note Saved Successfully','close',{
          duration:1500,
          politeness:'assertive',
        })
      })
    }
  
  }