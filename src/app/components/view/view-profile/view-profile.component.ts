import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FireService } from 'src/app/services/fire.service';
import { User } from 'src/app/httpobjects/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { UpdateprofilepicbottomsheetComponent } from './updateprofilepicbottomsheet/updateprofilepicbottomsheet.component';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { FireStorageService } from 'src/app/services/fire-storage.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  selectedFile: File = null;
  constructor(private afstorage: AngularFireStorage, private db: FireService, 
    private snackbar: MatSnackBar, private share: DataSharingService, private bottomsheet: MatBottomSheet,
    private sanitizer: DomSanitizer,
    private storage: FireStorageService) { }
  done: string;
  currentuser: User;
  spinnerboolean: boolean = false;
  trustedUrl: SafeUrl;

  ngOnInit() {
    this.share.getCurrentUser().subscribe(data =>{
      this.currentuser = data;
      if(this.currentuser.profilepicurl !== undefined){
        this.storage.getPics(this.currentuser.profilepicurl).subscribe(data =>{
          this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(data);
        });
      }
    })
  }

  onFileChange(event){
    this.selectedFile = event.target.files[0];
  }

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  isImgLoaded =false;
  uploadFile(){
    this.spinnerboolean= true;
    const path = `profile/v2/${this.currentuser.username}/${Date.now()}_${this.currentuser.id}`;

    this.afstorage.upload(path, this.selectedFile).then(data =>{
     data.ref.getDownloadURL().then(value =>{
      this.done =  value;
      this.snackbar.open('profile pic is uploaded', 'close', {duration: 1200});
      this.selectedFile= null;

      this.currentuser.profilepicurl = this.done;
      this.db.updateDocument(this.currentuser, "users").subscribe(data =>{
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
      this.selectedFile= null;
      this.db.updateDocument(this.currentuser, "users").subscribe(data =>{
        this.snackbar.open('User Document is updated', 'close', {duration: 1200});
        this.spinnerboolean= false;
      })
    })
  }

  openBottomSheet(){
    let ref = this.bottomsheet.open(UpdateprofilepicbottomsheetComponent, {
      autoFocus:true,
      data: this.currentuser,
    });
    ref.afterDismissed().subscribe((data:User) =>{
      if(data !== undefined){
        this.storage.getPics(data.profilepicurl).subscribe(data =>{
          this.trustedUrl = data;
        },err =>{
          this.snackbar.open('cannot fetch profile pic from storage', 'close', {duration: 2000})
        }); 
      }     
    }, err=>{
      this.snackbar.open('DataSheet is crached', 'close', {duration: 2000})
    })
  }
}
