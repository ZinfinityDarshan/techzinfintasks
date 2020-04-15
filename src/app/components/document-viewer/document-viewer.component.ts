import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit, AfterViewInit {

  trustedUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) public urlfromout: string, 
  private dialogref: MatDialogRef<DocumentViewerComponent>,) { 

    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(urlfromout);
  }

  @ViewChild('iframe', {static: true}) iframe: ElementRef

  ngOnInit() {
    // console.log('URL is '+this.trustedUrl);
    
  }

  ngAfterViewInit() {
    this.iframe.nativeElement.setAttribute('src', this.urlfromout);
   }

}
