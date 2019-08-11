import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../httpobjects/user';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private initialuser: User;
  private userSource = new BehaviorSubject<User>(this.initialuser);

  currentUser = this.userSource.asObservable();

  changeUser(user: User){
    this.userSource.next(user);
  }
}
