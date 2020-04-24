import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule,
   MatSelectModule, MatRadioModule, MatTabsModule, MatTableModule, MatSnackBarModule,
   MatToolbarModule, MatIconModule, MatDatepickerModule, MatSidenavModule, MatListModule, 
   MatProgressSpinnerModule, MatProgressBarModule, MatChipsModule, MatGridListModule, 
   MatMenuModule, MatAutocompleteModule, MatButtonToggleModule, MatStepperModule, 
   MatTooltipModule, MatExpansionModule, MatRippleModule, MatBadgeModule, MatBottomSheetModule} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { OverlayModule } from '@angular/cdk/overlay';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,MatFormFieldModule, MatInputModule,MatMenuModule,MatAutocompleteModule,OverlayModule,MatButtonToggleModule,
    MatSelectModule, MatRadioModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatToolbarModule, MatIconModule, MatChipsModule
    ,MatDatepickerModule, MatMomentDateModule, MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatProgressBarModule, MatGridListModule,
    MatStepperModule, MatTooltipModule, MatExpansionModule, MatRippleModule, DragDropModule, MatBadgeModule, MatBottomSheetModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,MatFormFieldModule, MatInputModule,MatMenuModule,MatAutocompleteModule,OverlayModule,MatButtonToggleModule,
    MatSelectModule, MatRadioModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatToolbarModule, MatIconModule, MatChipsModule
    ,MatDatepickerModule, MatMomentDateModule, MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatProgressBarModule, MatGridListModule,
    MatStepperModule, MatTooltipModule, MatExpansionModule, MatRippleModule, DragDropModule, MatBadgeModule, MatBottomSheetModule
  ]
})
export class MaterialModule { }
