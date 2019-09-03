import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataSharingService } from '../services/data-sharing.service';
import { User } from '../httpobjects/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private share: DataSharingService){}
  currentuser: User;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.share.getCurrentUser().subscribe(data => {
        this.currentuser = data;
      });
      if(this.currentuser!=undefined || this.currentuser!=null){
        if(this.currentuser.role.includes('ADMIN',0)){
          return true;
        }
      }
      return false;
  }
  
}
