import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor() { }

  removeValidators(form: FormGroup){
    form.reset();
    for(const key in form.controls){
      if(key === undefined || key === null || key === '' || key.length === 0){}else{
        form.get(key).clearValidators();
        form.get(key).clearAsyncValidators();
        form.get(key).updateValueAndValidity();
      }
    }
  }

  removeValidatorsForField(form: FormGroup, key: any){
      if(key === undefined || key === null || key === '' || key.length === 0){}else{
        form.get(key).reset();
        form.get(key).clearValidators();
        form.get(key).clearAsyncValidators();
        form.get(key).updateValueAndValidity();
      }
  }
}
