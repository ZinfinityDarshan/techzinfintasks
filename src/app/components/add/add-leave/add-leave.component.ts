import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { LeavesType } from "src/app/constants/constants";
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Leave } from 'src/app/httpobjects/leave';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import * as firebase from 'firebase/app';
import { User } from 'src/app/httpobjects/user';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.scss']
})
export class AddLeaveComponent implements OnInit {

  leavesType: string[] = LeavesType;
  addLeavesForm: FormGroup;
  currentUser: User;

  constructor(public dialogRef: MatDialogRef<AddLeaveComponent>,
    private share: DataSharingService, private fb: FormBuilder, private db: FireService, private snackBar: MatSnackBar, 
    private formHelper: FormHelperService) {

    this.addLeavesForm = fb.group({
      'startdate':[null, Validators.required],
      'enddate': [null, Validators.required],
      'type':[null, Validators.required]
    })
   }


  ngOnInit() {
    this.share.getCurrentUser().subscribe(data => this.currentUser = data)
  }

  closedialog(){
    this.dialogRef.close();
  }

  addLeave(form: Leave){
    form.startdate = firebase.firestore.Timestamp.fromDate(form.startdate.toDate());
    form.enddate = firebase.firestore.Timestamp.fromDate(form.enddate.toDate());
    form.user = this.currentUser;

    
    this.db.saveDocument(form,'leaves').subscribe(data =>{
      console.log(data);
      this.snackBar.open('Leave Submitted SuccessFully','close',{
        duration: 1500
      });
      this.formHelper.removeValidators(this.addLeavesForm);
      this.closedialog();
    })
  }
}
