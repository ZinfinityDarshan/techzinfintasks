import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { Observable } from 'rxjs';
import { IDCONFIG } from '../httpobjects/idconfig';

@Injectable({
  providedIn: 'root'
})
export class IdgeneratorService {

  constructor(private db: FireService) { }

  getNextId(collection: string): Observable<string>{
    return new Observable((observer) =>{
      this.db.getCollectionWithCondition<IDCONFIG>('IDCONFIG','doc','==',collection).subscribe((data:IDCONFIG[]) =>{
        let res = data[0];
        console.log('data from idconfig',data);
        
        let id = res.code.concat(res.pre.toString());
        res.pre = res.pre + 1;
        this.db.updateDocument<IDCONFIG>(res,'IDCONFIG').subscribe(data =>{
          if(data===null || data ===undefined){
            observer.error('ERR002');
            observer.complete();
          }else{
            observer.next(id);
            observer.complete();
          }
        });
      });
    });
  }
}
