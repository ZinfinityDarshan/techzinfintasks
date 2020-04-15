import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Vendor } from '../httpobjects/vendor';
import { User } from '../httpobjects/user';

@Injectable({
  providedIn: 'root'
})
export class VenodorService {

  usercollection: AngularFirestoreCollection<User>;
  constructor(public db: AngularFirestore) { }

  registerVendor(form: Vendor) {

    return this.db.collection('Vendor').add({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      address: form.address,
      pincode: form.pincode,
      pancard: form.pancard,
      service: form.service,
      gender: form.gender
    })
  }

  login(token: string){
    return this.usercollection =  this.db.collection('users',ref => ref.where('token', '==', token));
  }

  getVendorFullData() {
    return this.db.collection('Vendor').valueChanges();
  }

  addUser(form: User){
    
    // return this.db.collection('users').add({
    //   username: form.username,
    //   password: form.password,
    //   token: btoa(form.username+form.password),
    //   email: form.email,
    //   manager: form.manager,
    //   role: form.role,
    //   name: form.name,
    //   wing: form.wing,
    //   status: form.status
    // });
    return this.db.collection('users').add(form);
  }
}
