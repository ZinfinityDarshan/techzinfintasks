import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {
  
  url: any;
  constructor(private afstorage: AngularFireStorage) { }

  public getPic(path: any){
    this.afstorage.ref(path).getDownloadURL().subscribe(url1 => {
      this.url = url1;
      return this.url
    });
  }

  public getPics(path: any) : Observable<string>{
    return this.afstorage.ref(path).getDownloadURL();
  }
  
  public uploadToStorage(file: any, type: string) : any{
    let user = sessionStorage.getItem('user');
    let newname  = `img_${user +'_'+new Date().getTime()}.jpg`
    return this.afstorage.upload(type+'/'+newname, file);
  }

  public deletePic(path: any){
    return this.afstorage.ref(path).delete();
  }

  public getDownloadURL(bucket: string): Promise<string>{
    return this.afstorage.storage.refFromURL('gs://bucket/'
    +bucket).getDownloadURL()
  }
}
