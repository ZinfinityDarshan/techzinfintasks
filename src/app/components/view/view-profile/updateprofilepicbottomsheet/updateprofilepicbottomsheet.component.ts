import { User } from 'src/app/httpobjects/user';
import { IMGType, DBTableNames } from './../../../../constants/constants';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FireService } from 'src/app/services/fire.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-updateprofilepicbottomsheet',
  templateUrl: './updateprofilepicbottomsheet.component.html',
  styleUrls: ['./updateprofilepicbottomsheet.component.scss']
})
export class UpdateprofilepicbottomsheetComponent implements OnInit {

  trustedUrl: SafeUrl;

  constructor(private sheetref: MatBottomSheetRef<UpdateprofilepicbottomsheetComponent>, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public user: User,private sanitizer: DomSanitizer,
    private storage: FireStorageService,
    private spinner: SpinnerService,
    private db: FireService,
    private snackbar : MatSnackBar) { 
      this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.user.profilepicurl);
    }

  ngOnInit() {
    console.log(this.user);
  }

  file: File | null = null;
  imgName : string;
  public imageAdded = new EventEmitter<User>();
  img: any;

  addImg(event: any){
    this.file = event.target.files[0];    
    this.imgName = this.file.name;
    console.log(event);
    var reader = new FileReader()
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      // this.img = event.target.result;
      // this.trustedUrl = event.target.result;
      console.log(this.img);
    }
  }

  uploadProfilePic(){
    let ref = this.spinner.open();
    this.storage.uploadToStorage(this.file,IMGType.PROFILEPIC).then(
      object =>{
        this.user.profilepicurl = object.metadata.fullPath;
        this.user.firestoreURL = object.metadata.name;
        console.log(this.user);
        this.storage.getPics(this.user.profilepicurl).subscribe(data =>{
          console.log(data);                  
          this.spinner.close(ref);
          this.db.updateDocument(this.user,DBTableNames.users).subscribe(data =>{
            this.spinner.close(ref);
            this.snackbar.open('Profile Picture Updated SuccessFully', 'close', {duration:2000})
            this.imageAdded.emit(this.user);
            this.sheetref.dismiss(this.user)
          }, 
          err=>{});
        }, 
        err=>{});
    });
  }
}
