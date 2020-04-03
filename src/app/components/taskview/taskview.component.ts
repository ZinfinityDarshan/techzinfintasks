import { DBTableNames } from './../../constants/constants';
import { TaskStatus } from 'src/app/constants/constants';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/httpobjects/task';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService } from 'src/app/services/fire.service';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/httpobjects/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Comment } from 'src/app/httpobjects/comment';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit, OnChanges {

  something: Task[];
  currentuser: User;
  task: Task;
  commentForm: FormGroup;
  spinnerFlag: boolean = false;
  comment: Comment;
  commentList: Comment[] = [];
  taskStatus: string[] = TaskStatus;

  constructor(private route: ActivatedRoute, private router: Router,
    private share: DataSharingService, private db: FireService, private snackBar: MatSnackBar, private fb: FormBuilder,
    private formhelper: FormHelperService, 
    private spinner: SpinnerService, private snackbar: MatSnackBar) { 
      this.spinnerFlag = true;
      let id = this.route.snapshot.params['id'];
        this.share.getCurrentUser().subscribe(data =>{
          this.currentuser = data;
        });
        this.getTask(id);

      this.commentForm = this.fb.group({
        'comment':[null, Validators.required]
      })
    }

  ngOnChanges(){
    
  }

  ngOnInit() {
    
  }

  getTasks(id: string){    
    this.db.getSingleDocumentById<Task>(id, 'tasks').subscribe(data =>{

      this.task = data;
      this.db.getCollectionWithCondition<Comment>('comments','taskid','==',this.task.taskid).subscribe(data =>{
        this.commentList = data;
      })
      this.spinnerFlag = false;

    })
  }
  getTask(id: string){
    this.db.getCollectionWithCondition<Task>('tasks', 'taskid', '==', id).subscribe(value =>{
      this.task = value[0];

      this.db.getCollectionWithCondition<Comment>('comments','taskid','==',this.task.taskid).subscribe(data =>{
        this.commentList = data;
      })
      this.spinnerFlag = false;

    });
  }

  commentstring: any;
  onPaste(value: any){
    console.log(value);
    
    this.commentstring = value;
  }

  
  addComment(form: Comment){
    form.comment = this.commentstring;
    form.user = this.currentuser;
    form.taskid = this.task.taskid;
    form.ondate = firebase.firestore.Timestamp.fromDate(new Date())

    this.db.saveDocument(form,'comments').subscribe(data =>{
      this.commentList.push(data);
      console.log(data)
      this.formhelper.removeValidators(this.commentForm);
      this.snackBar.open('comment added !', 'close', {
        duration: 1500
      })
    })
  }

  status: string;
  statusChanged(status: any){ 
    this.status = status;   
    console.log(status);
  }

  save(){
    let ref = this.spinner.open();
    this.task.status = this.status;
    this.db.updateDocument(this.task, DBTableNames.tasks).subscribe(data =>{
      this.task = data;
      ref.close();
      this.snackBar.open('Document Updated Successfully','close', {duration:2000})
    }, err =>{

    });
  }

}
