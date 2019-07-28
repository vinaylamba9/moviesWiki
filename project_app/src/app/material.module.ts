import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDatepickerInput, MatDatepicker, MatDatepickerContent, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class MaterialModule {}
