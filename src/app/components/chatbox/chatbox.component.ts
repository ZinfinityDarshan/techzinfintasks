import { MatSnackBar } from '@angular/material';
import { Notification } from './../../httpobjects/notification';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatMessage } from './../../httpobjects/chat-message';
import { User } from './../../httpobjects/user';
import { DBTableNames } from './../../constants/constants';
import { NotificationService } from './../../services/notification.service';
import { SpinnerService } from './../../services/spinner.service';
import { FireService } from './../../services/fire.service';
import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, OnChanges, ViewChild, AfterViewChecked } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {
  
  chatRef: AngularFirestoreCollection<ChatMessage>;
  commentstring: any;
  text: FormControl;
  currentUser = this.shared.currentUser;
  dummy: ChatMessage[] = [{}];
  chatSource = new BehaviorSubject(null);
  chats: Observable<ChatMessage[]> = this.chatSource.asObservable();
  @ViewChildren("commentDiv") commentDivs: QueryList<ElementRef>;
  @ViewChild('target') target: ElementRef;
  @ViewChild('targett') targett: ElementRef;

  constructor(
    private db: FireService,
    private spinner: SpinnerService, 
    private notification: NotificationService,
    private shared: DataSharingService, 
    private afs: AngularFirestore,
    private snackbar: MatSnackBar) {
    
    this.text = new FormControl('', []);
    this.chatRef = this.afs.collection(DBTableNames.chatbox);
    afs.collection(DBTableNames.chatbox).stateChanges([ 'modified', 'added', 'removed' ])
    .subscribe((data: any) =>{
      this.ngOnInit();
    });

   }

   ngAfterViewInit() {       
    this.commentDivs.changes.subscribe(() => {
      if (this.commentDivs && this.commentDivs.last) {
        this.commentDivs.last.nativeElement.focus();
      }
    });
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
    this.scrollToBottom2();
  }

  ngOnChanges(){
  }

  updateChat(chat: ChatMessage[]){
    this.chatSource.next(chat);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  scrollToBottom(): void {
    try {
        this.target.nativeElement.scrollTop = this.target.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  scrollToBottom2(): void {
    try {
        this.targett.nativeElement.scrollTop = this.targett.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  ngOnInit() {
    let ref = this.spinner.open()
    this.db.getCollection(DBTableNames.chatbox).subscribe((data:ChatMessage[]) => {      
      if(data.length === 0) {
        ref.close();
      }else{
        data = this.sortByDate(data);
        this.updateChat(data);
        this.scrollToBottom();
        this.scrollToBottom2();
        ref.close();
      }
    }, (error)=>{
      ref.close();
      console.log(error);
    });
  }

  public onPaste(value: any){
    this.commentstring = value;
  }

  public sortByDate(myArray: ChatMessage[]): ChatMessage[] {    
    return myArray.sort((a: ChatMessage, b: ChatMessage) => {
        return a.sentdate.toDate() - b.sentdate.toDate();
    });
  }

  addMesage(){
    this.text.reset();
    this.currentUser.subscribe((data: User) =>{
      let chat: ChatMessage = {message:this.commentstring, user:data, sentdate: firebase.firestore.Timestamp.fromDate(new Date())}
      if(this.commentstring === null ||this.commentstring === '' && data === null || data === undefined){
        let tect: Notification = {message: 'Please Message Again'}
        this.notification.open(tect);
      }else{
        this.db.saveDocument(chat,DBTableNames.chatbox).subscribe(data =>{
          this.ngOnInit();
          this.commentstring = null;
          this.text.reset();
          this.text.clearValidators();
        }, err =>{});
      }
    }, err =>{
      console.log(err); 
    })
  }

  deleteAllChat(){
    let ref = this.spinner.open();
    this.db.deleteAllDocumentsInCollection(DBTableNames.chatbox).subscribe(data=>{
      if(data){
        ref.close();
        this.snackbar.open('Messages deleted successfully', 'close', {duration: 2000});
      }else{
        this.snackbar.open('Failed to delete messages', 'close', {duration: 2000});
        ref.close();
      }
    });
  }

}
