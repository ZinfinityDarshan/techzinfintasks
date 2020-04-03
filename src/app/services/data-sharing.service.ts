import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../httpobjects/user';
import { FireService } from './fire.service';
import { Task } from '../httpobjects/task';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService implements OnInit{

  constructor(private db: FireService) { }

  ngOnInit(){

  }
  
  private initialuser: User = {};
  private userSource = new BehaviorSubject<User>(this.initialuser);

  public currentUser = this.userSource.asObservable();

  getCurrentUser(): Observable<User>{
    return new Observable((observer) =>{
      this.currentUser.subscribe(data=>{
        if (data===undefined || data===null || data===''){          
          let temp = JSON.parse(localStorage.getItem('user'));
          if(temp===undefined || temp === null){
            observer.error('null');
            observer.complete();
          }else{
            observer.next(temp);
            observer.complete();
          }
        }else{
          observer.next(data);
          observer.complete();
        }
      });
    });

  }

  changeUser(user: User){    
    this.userSource.next(user);
  }

  ////////////////////////////////////////////////////////////////

  private initialusers: User[];
  private usersSource: any;
  public availableUsers: any;

  getUsersFromDatabase(): Observable<User[]>{
    return new Observable((observer)=>{
      this.db.getCollection('users').subscribe(data => {
        if(data.length != 0){
          this.initialusers = data;
          this.usersSource = new BehaviorSubject<User[]>(this.initialusers);
          this.availableUsers = this.usersSource.asObservable();
          observer.next(data);
          observer.complete();
        }else{
          observer.error('ERR001')
          observer.complete();
        }
      });
    });
  }
//////////////////////////////////////////////////////////////////////////////

  private LoggedInSource = new BehaviorSubject<boolean>(false);
  LoggedIn = this.LoggedInSource.asObservable();

  LoggedInObserve(): Observable<boolean>{
    return new Observable((observer) =>{
      this.getCurrentUser().subscribe(data =>{
        if(data === null || data === undefined || data === ''){
          this.LoggedInSource.next(false);
          observer.next(false);observer.complete();
        }else{
          this.LoggedInSource.next(false);
          observer.next(true);  
          observer.complete();
        }
      });
    });
  }

  setLoggedIn(value:boolean){
    this.LoggedInSource.next(value);
  }

  //////////////////////////////////////////////////////////////////////////


  getCommonData() : Observable<User[]>{
    if(this.availableUsers === undefined || this.availableUsers === null){
        return new Observable((observer) =>{
          this.getUsersFromDatabase().subscribe(res =>{
            observer.next(res);
            observer.complete();
          });
        });
    }else{
      return new Observable((observer) =>{
        this.availableUsers.subscribe((data:User[]) =>{
          if(data==null || data==undefined || data.length == 0){
            this.db.getCollection<User>('users').subscribe(res =>{
              if(res.length == 0 || res == undefined || res == null){
                observer.error('Element Not Found'); observer.complete();
              }              
              observer.next(res);
              observer.complete();
            })
          }else{
            observer.next(data);
            observer.complete();
          }
        });
      });
    }
  }

//////////////////////////////////////////////////////////////////////////////////

  getViewDataTables(){
    // users, projects, tasks
  }

  getTasksPerProject(projectname: string) : Observable<Task[]>{
    return new Observable((observer)=>{
      this.db.getCollectionWithCondition<Task>('tasks', 'project.name', '==', projectname).subscribe(data =>{

          if (data != null || data != undefined){
            observer.next(data);
            observer.complete();
          }else{
            observer.error('No Documents found');
            observer.complete();
          }

      },(error)=>{
        observer.error(error);
        observer.complete();
      });
    })
  }
}

