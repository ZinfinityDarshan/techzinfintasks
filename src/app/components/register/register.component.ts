import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendor } from '../../httpobjects/vendor';
import { VenodorService } from 'src/app/services/venodor.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   services = [
    "Tailor","AC Rempair","Painter"
  ];
  genders = [
    'male', 'female'
  ]
  registrationform: FormGroup;


  constructor(private fb: FormBuilder, 
    public vservice: VenodorService, public router: Router,
    private snackBar: MatSnackBar) {
    this.registrationform = fb.group({
      'id':[null],
      'name':[null, Validators.required],
      'mobile':[null, Validators.compose([Validators.minLength(10),Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      'email':[null, Validators.compose([Validators.required, Validators.email])],
      'address':[null],
      'pincode':[null, Validators.required],
      'pancard':[null],
      'service':[null, Validators.required],
      'gender':[null]
    })
   }

  ngOnInit() {
  }

  register(form: Vendor) {
    this.vservice.registerVendor(form)
    .then(
      res => {
        this.registrationform.reset();
        this.openSnackBar('Vendor is Registered Successfully','Admin Action')
        this.router.navigate(['admin'])
      }
      
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

}
