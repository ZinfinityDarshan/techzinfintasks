import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
