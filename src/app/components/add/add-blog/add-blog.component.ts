import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireService } from 'src/app/services/fire.service';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/httpobjects/user';
import { Blog } from 'src/app/httpobjects/blog';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import * as Quill from 'quill';
import { IdgeneratorService } from 'src/app/services/idgenerator.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  addBlogForm: FormGroup;
  currentuser: User;

  config: {
    toolbar:[
      ['bold', 'italic', 'code']
    ]
  }

  editorConfig = {
    height: '500px'

  }


  constructor(
    public dialogRef: MatDialogRef<AddBlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Blog, public formHelper: FormHelperService, private db: FireService,
    private fb: FormBuilder, private snackbar: MatSnackBar, private share: DataSharingService,
    private idgenerator: IdgeneratorService) {
          this.addBlogForm = this.fb.group({
              'title':[null, Validators.required],
              'blog':[null, Validators.required]
          });
    this.share.getCurrentUser().subscribe(data =>{
      this.currentuser = data;
    })
      
    }


  ngOnInit() {
  }

  closedialog(): void {
    this.dialogRef.close('imp');
  }

  addBlog(blog: any){
    blog.auther = this.currentuser;
    blog.publishDate = firebase.firestore.Timestamp.fromDate(moment().toDate());
    this.idgenerator.getNextId('blogs').subscribe(data =>{

      blog.id =data;
      // console.log('date in publish brace',blog);
      this.db.saveDocument<Blog>(blog,'blogs').subscribe(data =>{
        this.snackbar.open('blog added', 'close', {duration:1500});
        this.closedialog();
      });
      
    });

  }

}
