import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FireService } from 'src/app/services/fire.service';
import { User } from 'src/app/httpobjects/user';
import { MatSnackBar } from '@angular/material';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { UpdateprofilepicbottomsheetComponent } from './updateprofilepicbottomsheet/updateprofilepicbottomsheet.component';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  selectedFile: File = null;
  constructor(private afstorage: AngularFireStorage, private db: FireService, 
    private snackbar: MatSnackBar, private share: DataSharingService, private bottomsheet: MatBottomSheet,
    private sanitizer: DomSanitizer) { }
  done: string;
  currentuser: User;
  spinnerboolean: boolean = false;
  trustedUrl: SafeUrl;

  ngOnInit() {
    this.share.getCurrentUser().subscribe(data =>{
      this.currentuser = data;
      this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.currentuser.profilepicurl);
    })
  }

  onFileChange(event){
    this.selectedFile = event.target.files[0];
    console.log('filename',this.selectedFile.name);
  }

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  
  uploadFile(){
    this.spinnerboolean= true;
    const path = `profile/v2/${this.currentuser.username}/${Date.now()}_${this.currentuser.id}`;

    this.afstorage.upload(path, this.selectedFile).then(data =>{
     data.ref.getDownloadURL().then(value =>{
      this.done =  value;
      console.log(this.done);
      this.snackbar.open('profile pic is uploaded', 'close', {duration: 1200});
      this.selectedFile= null;

      this.currentuser.profilepicurl = this.done;
      this.db.updateDocument(this.currentuser, "users").subscribe(data =>{
        console.log('data from user table ----',data);
        this.snackbar.open('User Document is updated', 'close', {duration: 1200});
        this.spinnerboolean= false;
      })
      })
    })
  }
  upload(){

    this.spinnerboolean= true;

    const path = `profile/v2/${Date.now()}_${this.currentuser.username}`;

    const ref = this.afstorage.ref(path);

    this.task = this.afstorage.upload(path, this.selectedFile);

    this.task.snapshotChanges().subscribe(data =>{
      this.snackbar.open('profile pic is uploaded', 'close', {duration: 1200});
      this.downloadURL = data.downloadURL;
      console.log(this.downloadURL);
      this.selectedFile= null;
      this.db.updateDocument(this.currentuser, "users").subscribe(data =>{
        console.log('data from user table ----',data);
        this.snackbar.open('User Document is updated', 'close', {duration: 1200});
        this.spinnerboolean= false;
      })
    })
  }

  openBottomSheet(){
    this.bottomsheet.open(UpdateprofilepicbottomsheetComponent, {
      autoFocus:true,
      data: this.currentuser,
      
    })
  }
}
