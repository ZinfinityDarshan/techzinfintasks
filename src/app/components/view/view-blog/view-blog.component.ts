import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { Blog } from 'src/app/httpobjects/blog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {

  blogs: Blog[] = [];
  constructor(private db: FireService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getAvailableBlogs();
  }

  getAvailableBlogs(){
    this.db.getCollection<Blog>('blogs').subscribe(data =>{
      if(data.length > 0 && data != null){
        this.blogs = data;
        
        this.snackbar.open('Blogs Available', 'close', {
          duration: 1500
        })
      }
    }, (error) =>{
      // console.log(error);
      this.snackbar.open('No Blogs Available', 'close', {
        duration: 1500
      })
    })
  }

}
