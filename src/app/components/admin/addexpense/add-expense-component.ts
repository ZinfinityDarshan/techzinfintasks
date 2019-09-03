import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Expense } from 'src/app/httpobjects/expense';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelperService } from 'src/app/utilities/form-helper.service';
import { FireService } from 'src/app/services/fire.service';
import { Router } from '@angular/router';
import { User } from 'src/app/httpobjects/user';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { ExpenseStatus } from 'src/app/constants/constants';
@Component({
    selector: 'add-expense',
    templateUrl: './addexpense.component.html',
    styleUrls:['./../admin.component.scss']
  
  })
  export class AddExpenseComponent {
  
    addExpenseForm: FormGroup;
    users: User[];
    expenseStatus:String[] =  ExpenseStatus;

    constructor(
      public dialogRef: MatDialogRef<AddExpenseComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Expense, private fb: FormBuilder, private formhelper: FormHelperService, private db: FireService,
      private route: Router, private share: DataSharingService) {


            this.addExpenseForm = fb.group({
                'title':[null, Validators.required],
                'amt':[null, Validators.required],
                'currency':[],
                'ondate':[],
                'whopaid':[],
                'status':[]
            });

            this.share.getCommonData().subscribe(data =>{
                this.users = data;
            });
      }
      
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    closedialog(){
      this.dialogRef.close('Expense Operation Canceled');
    }
  
  }
