import { TaskReference } from './../../httpobjects/task-reference';
import { Task } from './../../httpobjects/task';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from './../../httpobjects/notification';
import { DocumentViewerComponent } from './../document-viewer/document-viewer.component';
import { Attachment } from './../../httpobjects/attachment';
import { DBTableNames, IMGType, TaskTypeEnum } from './../../constants/constants';
import { TaskStatus } from 'src/app/constants/constants';
import { Component, OnInit, OnChanges, DoCheck, IterableDiffers, KeyValueDiffers, SimpleChange, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { FireService } from 'src/app/services/fire.service';
import { MatSnackBar, MatDialog, MatMenuContent, MatMenuTrigger } from '@angular/material';
import { User } from 'src/app/httpobjects/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Comment } from 'src/app/httpobjects/comment';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageVieverComponent } from '../image-viever/image-viever.component';
import {Location} from '@angular/common';
import { Viewer } from 'src/app/httpobjects/viewer';


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
  profilePic: any;
  users: User[];
  menuUsers: User[];
  isImgLoaded2: false;
  toInformUsersList: string[] = [];
  viewwerList: Viewer[] = [];
  viewerForm: FormControl;
  nonViewerList: Viewer[] = [];
  autoCtrl = new FormControl();

  @ViewChild(MatMenuTrigger, {static:true}) userInput: MatMenuTrigger;

  constructor(private route: ActivatedRoute, private router: Router,
    private share: DataSharingService, private db: FireService, private snackBar: MatSnackBar, private fb: FormBuilder,
    private formhelper: FormHelperService, 
    private spinner: SpinnerService, private snackbar: MatSnackBar,
    private storage: FireStorageService, private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private notify: NotificationService,
    differs: KeyValueDiffers,
    private location: Location) { 
      this.spinnerFlag = true;
      let id = this.route.snapshot.params['id'];
        this.share.currentUser.subscribe(data =>{
          this.currentuser = data;
          this.storage.getPics(this.currentuser.profilepicurl).subscribe(data =>{
            this.profilePic = this.sanitizer.bypassSecurityTrustUrl(data);
            this.db.getCollectionForAutocomplete('tasks','taskid',10,'TASK-4','TASK-4'+'\uf8ff').subscribe((data:Task[]) =>{
              data.forEach(d =>{console.log();
              })
              
            })
          });
        });
        this.getTask(id);

      this.commentForm = this.fb.group({
        'comment':[null, Validators.required]
      });

      this.viewerForm = new FormControl('', []);
      this.autoCtrl.valueChanges.subscribe((data: any) =>{
          if(typeof data === 'string'){
            this.searchForTasks(data.toUpperCase());        
          }else{

          }
      });
    }
  
  addReference(task: Task){
    if(task.id === this.task.id){
      this.notify.open({message:'please do not refer to same task'})
    }else{
      let taskref: TaskReference = {
        id: task.id,
        taskid: task.taskid,
        title: task.title
      }
      if(this.task.references === null || this.task.references === undefined){
        this.task.references = []
        if(this.task.references.findIndex(x => x.id === taskref.id) === -1){
          this.task.references.push(taskref);
        }
      }else{
        if(this.task.references.findIndex(x => x.id === taskref.id) === -1){
          this.task.references.push(taskref);
        }
      }
      console.log('whole array', this.task.references);
    }
  }

  displayWith(task: Task){
    if(task === undefined || task === null){
      return '';
    }else{
      return task.taskid;
    }
  }

  taskListForSearch: Task[] = [];
  searchForTasks(startat: string){
    this.db.getCollectionForAutocomplete(DBTableNames.tasks,
      'taskid',10,startat,startat+'\uf8ff').subscribe((data: Task[]) =>{
        this.taskListForSearch = data;
      });
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log('getting called');
  }

  addedViewers: [] = [];

  addviewer(){  
    console.log('form in start',this.viewerForm.value);
    
    let ref = this.spinner.open();
    if(this.viewerForm.value.length > 0){
      this.viewerForm.value.forEach((data:User) =>{
        console.log('value in array', data);
        if(this.task.reviewer === null || this.task.reviewer === undefined){
          this.task.reviewer = [];
        }
        if(!this.task.reviewer.includes(data)){
          this.nonViewerList.splice(this.nonViewerList.findIndex(x=>x.id == data.id),1);
          //this.viewwerList.push(data);
          let notif: Notification = {
            message: 'you are added as a viewer in '+this.task.taskid,
            receiverId: [data.id],
            sendingDate: new Date(),
            redirectionURL: '/task/'+this.task.taskid
          }
          this.notify.openAndNotify(notif).subscribe(data =>{}, err=>{console.log(err);
          });
        }
      });
      if(this.viewerForm.value.length > 0){
        this.viewerForm.value.forEach((element: User) => {    
          let viewer: Viewer = {
            id:element.id,
            name: element.name,
            role: element.role
          }      
          if(this.task.reviewer == undefined || this.task.reviewer == null){
            this.task.reviewer = [];
            if(!this.task.reviewer.includes(viewer)){
              this.task.reviewer.push(viewer);
              }           
          }else{
            if(!this.task.reviewer.includes(viewer)){
              this.task.reviewer.push(viewer);
            } 
          }
        });
      }
    }
    this.save();
    this.viewwerList = this.task.reviewer;
    ref.close();
  }
  differ: any;

  ngOnInit() {
    this.share.getCommonData().subscribe(data =>{
      if(data.length == 0 || data == null || data === undefined){}
      else{
        // console.log(data);
        
        this.users = data;
        this.nonViewerList = data;
        this.menuUsers = data;
        console.log(data);
        
        this.snackBar.open('Data Refreshed Success ..!!', 'close', {duration : 1200});       
      }
    });
  }
  isImgLoaded = false;
  openImageViever(url: string){
    const dialogRef = this.dialog.open(ImageVieverComponent, {
      width: '1000px',
      height: '95%',
      data: url,
      disableClose: false
    });
  }

  addUserAsViewer(event : any, user: User){    
    let old = this.commentForm.controls['comment'].value;
    if(old === undefined || old === null){
      this.commentForm.controls['comment'].patchValue('@'+user.name);
    }else{
      this.commentForm.controls['comment'].patchValue(old+'@'+user.name);
    }
    this.toInformUsersList.push(user.id);
  }

  getTasks(id: string){    
    this.db.getSingleDocumentById<Task>(id, 'tasks').subscribe(data =>{

      this.task = data;
      this.db.getCollectionWithCondition<Comment>('comments','taskid','==',this.task.taskid).subscribe(data =>{
        this.commentList = data.reverse();
        this.commentList.reverse()
      })
      this.spinnerFlag = false;

    })
  }
  getTask(id: string){
    
    this.db.getCollectionWithCondition<Task>('tasks', 'taskid', '==', id).subscribe(value =>{
      this.task = value[0];
      if(this.task.reviewer != null || this.task.reviewer != undefined){
        if(this.task.reviewer.length >0){          
          this.task.reviewer.forEach(dd =>{
            this.viewwerList.push(dd);
            let i = this.nonViewerList.findIndex(x => x.id === dd.id);
            this.nonViewerList.splice(i,1);
          });
          //this.viewerForm.setValue(this.task.reviewer);          
          this.viewwerList = this.task.reviewer;
        }else{
          //this.viewerForm.setValue([]);
          this.viewwerList = [];
        }
      }else{
        //this.viewerForm.setValue([]);
        this.viewwerList = [];
      }  

      if(this.task.attachments != undefined){
        this.task.attachments.forEach(attachement =>{
          this.getImgURL(attachement.url).subscribe(image =>{
            attachement.tempForImgURL = image;
          });
        });
        this.task.attachments.reverse();
      }
      this.db.getCollectionWithCondition<Comment>('comments','taskid','==',this.task.taskid).subscribe(data =>{
        this.commentList = data;
        this.commentList.forEach(comment =>{
          this.db.getSingleDocumentById(comment.user.id, DBTableNames.users).subscribe((user1:User) =>{
            this.storage.getPics(user1.profilepicurl).subscribe(url =>{
              comment.tempProfilePic = this.sanitizer.bypassSecurityTrustUrl(url);              
            }, err =>{
              comment.tempProfilePic = '../../../assets/images/blank-profile.png';
            });
          });
        });
        this.commentList = this.sortByDate(this.commentList);
      })
      this.spinnerFlag = false;

    }, err =>{
        this.notify.notify(this.snackbar, 'This task is Removed from board')
        this.location.back();
    });
  }

  deleteViewerFromTask(user: User){
    console.log(this.task.reviewer);

    console.log('user',user);
    
    let ref = this.spinner.open();
    console.log(this.viewwerList.findIndex(x=>x.id === user.id));
    console.log(this.task.reviewer.findIndex(x=>x.id === user.id));

    this.nonViewerList.push(user);
    // console.log(this.task.reviewer);
    
    this.task.reviewer.splice(this.task.reviewer.findIndex(x=>x.id === user.id),1)
    console.log('entity going to get saved',this.task.reviewer);
    
    this.save();
    let notif: Notification = {
      message: 'You are revoved as a viewer from '+ this.task.taskid,
      receiverId: [user.id],
      sendingDate: new Date(),
      redirectionURL: '/task/'+this.task.taskid
    }
    this.notify.openAndNotify(notif).subscribe(data =>{}, err=>{console.log(err);
    });
    ref.close();
  }

  deleteReference(refr: TaskReference){
    this.task.references.splice(this.task.references.findIndex(x=>x.id === refr.id),1);
    this.save();
  }
  public sortByDate(myArray: Comment[]): Comment[] {    
    return myArray.sort((a: Comment, b: Comment) => {
        return a.ondate.toDate() - b.ondate.toDate();
    });
  }

  commentstring: any;
  onPaste(value: any){
    this.commentstring = value;
  }

  assigneeChanged(user: User){
    this.task.assignee = user;
  }

  back(){
    this.location.back()
  }
  
  addComment(form: Comment){
    if(this.commentForm.valid){

    form.comment = this.commentstring;
    form.user = this.currentuser;
    form.taskid = this.task.taskid;
    form.ondate = firebase.firestore.Timestamp.fromDate(new Date())

    this.db.saveDocument(form,'comments').subscribe(data =>{
        
        let notifier = [this.task.assignee.id, this.task.owner.id];
        if(this.viewwerList.length !== 0){
          this.viewwerList.forEach(tata =>{
            notifier.push(tata.id);
          });
        }
        let notif: Notification = {
          message: form.user.name+' have commented on '+this.task.taskid,
          receiverId: notifier,
          sendingDate: new Date(),
          redirectionURL: '/task/'+this.task.taskid
        }
        this.notify.openAndNotify(notif).subscribe(data =>{}, err=>{console.log(err);
        });

        if(this.toInformUsersList.length > 0){
          let notif2: Notification = {
            message: this.currentuser.name+' have mentioned you in comment please respond ASAP',
            receiverId: this.toInformUsersList,
            sendingDate: new Date(),
            redirectionURL: '/task/'+this.task.taskid
          }
          this.notify.openAndNotify(notif2).subscribe(data =>{}, err=>{console.log(err);
          });
        }

      this.storage.getPics(this.currentuser.profilepicurl).subscribe(url =>{
        data.tempProfilePic = this.sanitizer.bypassSecurityTrustUrl(url);
        this.commentList.push(data);
        this.formhelper.removeValidators(this.commentForm);
        this.snackBar.open('comment added !', 'close', {
          duration: 1500
        });
      }, err =>{
        console.log(err);
      });
      this.commentList.reverse();

    });
    }else{
      this.notify.open({message:'please enter comment'});
    }
    
  }

  status: string;

  statusChanged(status: any){ 
    this.status = status;  
    this.task.status = this.status;
  }
  
  endDateChanged(event){
    let datee = firebase.firestore.Timestamp.fromDate(event.target.value.toDate());
    this.task.enddate = datee;
  }

  file: File | null = null;
  fileName: any;

  addFile(event: any){
    this.file = event.target.files[0];    
    this.fileName = this.file.name;
    alert(this.fileName)
    this.addAttachmentToTask();
  }

  addAttachmentToTask(){
    let ref = this.spinner.open();
    this.storage.uploadRawFileToStorage(this.file,IMGType.TASK+'/'+this.task.taskid, this.file.name.split('.').pop()).then(object =>{
      this.snackBar.open('file got uploaded successfully','close', {duration:1500});

      let attach: Attachment = {url: object.metadata.fullPath, file: this.file.name,
        fileType: this.file.type, taskType: this.task.type}
      if(this.task.attachments === undefined || this.task.attachments === null){
        this.task.attachments = [];
      }
      this.getImgURL(attach.url).subscribe(fire =>{
        attach.tempForImgURL = fire;
        this.task.attachments.push(attach);
        this.db.updateDocument<Task>(this.task, DBTableNames.tasks).subscribe(data =>{
          this.snackBar.open('Task updated with Attachment','close', {duration:1500});
          let notifier = [this.task.assignee.id, this.task.owner.id]

          if(this.viewwerList.length !== 0){
            this.viewwerList.forEach(tata =>{
              notifier.push(tata.id);
            });
          }

          let notif: Notification = {
            message: this.task.taskid+' '+'has been updated,'+' status : '+this.task.status+
            ', assignee : '+this.task.assignee.name+' Attachment has been Added '+attach.file,
            receiverId: notifier,
            sendingDate: new Date(),
            redirectionURL: '/task/'+this.task.taskid
          }
          this.notify.openAndNotify(notif).subscribe(data =>{}, err=>{console.log(err);
          })
          this.task = data;
          ref.close();
          attach = {};
          this.file = null;
          this.fileName = null;
        }, err=>{
          console.error(err);
        });
      });
    }, err =>{
      console.error(err);
    })
  }

  getImgURL(url: string){
      return this.storage.getPics(url);
  }

  save(){    
    let notifier = [this.task.assignee.id, this.task.owner.id];
    console.log('array',this.task.reviewer);
    if(this.viewwerList.length > 0){
      this.viewwerList.forEach(tata =>{
         notifier.push(tata.id);
      });
    }
    let ref = this.spinner.open();
    this.db.updateDocument(this.task, DBTableNames.tasks).subscribe(data =>{
      let notif: Notification = {
        message: this.task.taskid+' '+'has been updated,'+' status : '+this.task.status+
        ', assignee : '+this.task.assignee.name,
        receiverId: notifier,
        sendingDate: new Date(),
        redirectionURL: '/task/'+this.task.taskid
      }
      this.notify.openAndNotify(notif).subscribe(data =>{}, err=>{console.log(err);
      })
      // this.notify.open(notif);
      this.task = data;
      ref.close();
      this.snackBar.open('Document Updated Successfully','close', {duration:2000})
    }, err =>{
      ref.close();
    });
  }

  downloadFile(path: string){
    window.open(path);
  }

  openDocument(path: string){
    const dialogRef = this.dialog.open(DocumentViewerComponent, {
      width: '150%',
      height: '100%',
      data: path,
      disableClose: false
    });
    if(path.includes('doc')){
      dialogRef.close();
      window.open(path);
    }
  }

  deleteDocumentAndUpdateAttachment(attachment: Attachment){
    
    let ref = this.spinner.open();
    this.storage.deletePic(attachment.url).subscribe(data =>{
        let i = this.task.attachments.indexOf(attachment,0)
        this.task.attachments.splice(i,1);
        let notifier = [this.task.assignee.id, this.task.owner.id];
        if(notifier.length !== 0){
          this.viewwerList.forEach(tata =>{
            notifier.push(tata.id);
          });
        }
        let notif: Notification = {
          message: this.task.taskid+' '+'has been updated,'+' status : '+this.task.status+
          ', assignee : '+this.task.assignee.name+' Attachment has been Deleted '+attachment.file,
          receiverId: notifier,
          sendingDate: new Date(),
          redirectionURL: '/task/'+this.task.taskid
        }
        this.notify.openAndNotify(notif).subscribe(data =>{}, err=>{console.log(err);
        })
        ref.close();
        this.save();
    });
  }

}
