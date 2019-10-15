import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'
import { User } from 'src/app/httpobjects/user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-updateprofilepicbottomsheet',
  templateUrl: './updateprofilepicbottomsheet.component.html',
  styleUrls: ['./updateprofilepicbottomsheet.component.scss']
})
export class UpdateprofilepicbottomsheetComponent implements OnInit {

  trustedUrl: SafeUrl;

  constructor(private ref: MatBottomSheetRef<UpdateprofilepicbottomsheetComponent>, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public user: User,private sanitizer: DomSanitizer) { 
      this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.user.profilepicurl);
    }

  ngOnInit() {
    console.log(this.user);
    
  }


}
