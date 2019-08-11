import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatToolbarModule, MatIconModule, MatDatepickerModule} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatRadioModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatToolbarModule, MatIconModule,
    MatDatepickerModule, MatMomentDateModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,MatFormFieldModule, MatInputModule,
    MatSelectModule, MatRadioModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatToolbarModule, MatIconModule
    ,MatDatepickerModule, MatMomentDateModule
  ]
})
export class MaterialModule { }
