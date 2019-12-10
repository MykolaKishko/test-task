import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule,
} from '@angular/material';


const MaterialComponents = [
  MatButtonModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule,
];

@NgModule({
  imports: [ MaterialComponents, MatSnackBarModule ],
  exports: [ MaterialComponents ]
})
export class MaterialModule { }
