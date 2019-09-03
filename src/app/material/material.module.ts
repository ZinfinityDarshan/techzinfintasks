import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule,
   MatSelectModule, MatRadioModule, MatTabsModule, MatTableModule, MatSnackBarModule,
   MatToolbarModule, MatIconModule, MatDatepickerModule, MatSidenavModule, MatListModule, 
   MatProgressSpinnerModule, MatProgressBarModule, MatChipsModule, MatGridListModule, 
   MatMenuModule, MatAutocompleteModule, MatButtonToggleModule, MatStepperModule, 
   MatTooltipModule, MatExpansionModule, MatRippleModule} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,MatMenuModule,MatAutocompleteModule,OverlayModule,MatButtonToggleModule,
    MatSelectModule, MatRadioModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatToolbarModule, MatIconModule,MatChipsModule,
    MatDatepickerModule, MatMomentDateModule, MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatProgressBarModule,MatGridListModule,
    MatStepperModule, MatTooltipModule, MatExpansionModule, MatRippleModule

  ],
  exports: [
    MatCardModule,
    MatButtonModule,MatFormFieldModule, MatInputModule,MatMenuModule,MatAutocompleteModule,OverlayModule,MatButtonToggleModule,
    MatSelectModule, MatRadioModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatToolbarModule, MatIconModule, MatChipsModule
    ,MatDatepickerModule, MatMomentDateModule, MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatProgressBarModule, MatGridListModule,
    MatStepperModule, MatTooltipModule, MatExpansionModule, MatRippleModule
  ]
})
export class MaterialModule { }
