import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private db: AngularFirestore) { }

  private doc: AngularFirestoreDocument

  saveDocument <T extends Document>(document: T, collection: string) : Observable<T>{
    return new Observable((observer)=>{
      this.db.collection<T>(collection).add(document).then(
        res =>{
          document.id = res.id;
          this.updateDocument<T>(document, collection).subscribe(res =>{
            observer.next(res);
            observer.complete();
          })
        }
      ).catch(err =>{
        observer.error('error saving document');
        observer.complete();
        console.log(err);
      });
    });
  }

  updateDocument <T extends Document> (document: T, collection: string) : Observable<T>{
    return new Observable((observer)=>{
      let collectionref = this.db.collection<T>(collection);      
      collectionref.doc(document.id).update(document).then(res =>{
        observer.next(document);
        observer.complete();
      }).catch(error =>{
        console.log(error)
      });
    });
  }

  deleteDocument <T extends Document> (document: T, collection:string){
    return new Observable((observer)=>{
      let collectionref = this.db.collection<T>(collection);
      collectionref.doc(document.id).delete().then(res =>{
        observer.next(true);
        observer.complete();
      }).catch(error =>{
        console.log(error)
      })
    });
  }

  deleteAllDocumentsInCollection <T extends Document> (collection: string){
    return new Observable((observer)=>{
      let collectionref = this.db.collection<T>(collection);
      collectionref.valueChanges().subscribe(documents =>{
        documents.forEach(document=>{
          collectionref.doc(document.id).delete().then(res =>{
            // observer.next(true);
            // observer.complete();
          }).catch(error =>{
            console.log(error)
          })
        });
        observer.next(true);
        observer.complete();
      }, err=>{
        console.log(err)
        observer.error(false);
        observer.complete()
      });
    });
  }
  
  getSingleDocumentById <T extends Document> (id: string, collection: string) : Observable<T>{
    
    return new Observable((observer) =>{
      let doc : AngularFirestoreDocument<T> =  this.db.doc<T>(collection+'/'+id);

      doc.snapshotChanges().subscribe(info =>{
        observer.next(info.payload.data({serverTimestamps:"estimate"}))
        observer.complete();
      }, (error) =>{
        observer.error(error)
        observer.complete();
      })
    });
  }

  getCollection<T extends Document>(collection:string) : Observable<T[]>{
    return new Observable((observer) =>{
      this.db.collection<T>(collection).valueChanges().subscribe(res =>{
        observer.next(res);
        observer.complete();
      });
    });
  }

  getCollectionWithCondition <T extends Document> (collection:string, match: string, operator: any, matcher: any): Observable<T[]>{
    return new Observable((observer) =>{
      this.db.collection<T>(collection, ref => ref.where(match, operator, matcher)).valueChanges()
      .subscribe(data => {
        if(data.length!=0){          
          observer.next(data);          
          observer.complete();
        }else{
          observer.error('No Element Found');
          observer.complete();
        }
      }); 
    });
  }

  queryCollection <T extends Document> (collection:string, where: FBWhere[]){
    let res = this.db.collection<T>(collection);
    where.forEach(data =>{
      res.ref.where(data.match,data.operator, data.matcher);
    });
    res.valueChanges().subscribe(data => console.log(data))
  }

  getCollectionForAutocomplete(collection:string, orderBy: string, 
    limit: number, startat: string, endat: string){
    
    return this.db.collection(collection, ref => 
        ref
        .orderBy(orderBy)
        .startAt(startat)
        .endAt(endat)
        .limit(limit)
      ).valueChanges()
  }
}

export interface Document{
  id?: string;
}
export interface FBWhere{
  match: string, 
  operator: any, 
  matcher: string
}