import { Contact } from 'src/app/httpobjects/contact';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { FireService } from 'src/app/services/fire.service';

@Component({
    selector: 'add-contact',
    templateUrl: './addcontact.component.html',
    styleUrls:['./../admin.component.scss']
  })
  export class AddContactComponent {
  
    addContactForm: FormGroup;
    businesses: string[] = [];
    isLinear = true;
    tags: string[] = [];
  
    appearance: MatFormFieldDefaultOptions = {
      appearance: 'outline'
    };
    constructor(
      public dialogRef: MatDialogRef<AddContactComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Contact, private fb: FormBuilder, public formhelper: FormHelperService, 
      private snackbar: MatSnackBar, private db: FireService) {
  
        this.addContactForm = fb.group({
          'name':[null, Validators.required],
          'id':[null],
          'contactno': [null, Validators.required],
          'phoneno':[null],
          'address': fb.group({
              'fline':[],
              'sline':[],
              'landmark':[],
              'pincode':[],
              'city':[],
              'state':[],
              'country':[]
          }),
          'company':[],
          'businesscard':[],
          'officeaddress': fb.group({
              'fline':[],
              'sline':[],
              'landmark':[],
              'pincode':[],
              'city':[],
              'state':[],
              'country':[]
          }),
          'business':[],
          'tags':[]
        })
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    business: string;
    tag: string;
  
    addBusinessKeyUp(value: any){
      this.business=  value.target.value;
    }
  
    addBusinessKeyUp2(value: any){
      this.tag=  value.target.value;
    }
  
    addBusiness(){
      this.businesses.push(this.business);
      this.snackbar.open(this.business+' Business is Added','close',{duration: 1200});
      this.business=null;
      this.formhelper.removeValidatorsForField(this.addContactForm, 'business');
    }
  
    addTags(){
      this.tags.push(this.tag);
      this.snackbar.open(this.tag+' Tag is Added','close',{duration: 1200});
      this.tag=null;
      this.formhelper.removeValidatorsForField(this.addContactForm, 'tags');
    }
  
    addContact(form: Contact){
      form.business = this.businesses;
      form.tags = this.tags;
      this.db.saveDocument<Contact>(form, 'contacts').subscribe(data =>{
        if(data !== null || data !== undefined){
          this.tags = [];
          this.businesses = [];
          this.snackbar.open('Contact Added','close',{duration: 1500});
          this.formhelper.removeValidators(this.addContactForm);
          this.dialogRef.close(); 
        }
      }, (error) =>{
        console.error(error);
      });    
    }

    closedialog(){
      this.dialogRef.close('Canceled');
    }
  
  }