import { Component, OnInit, Inject } from '@angular/core';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image-viever',
  templateUrl: './image-viever.component.html',
  styleUrls: ['./image-viever.component.scss']
})
export class ImageVieverComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public urlfromout: string, 
  private dialogref: MatDialogRef<ImageVieverComponent>,
  private strorage: FireStorageService) { }

  url: string = "../../../assets/images/img.jpg";

  ngOnInit() {
    this.url = this.urlfromout;
  }

}
