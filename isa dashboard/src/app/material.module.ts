import { NgModule } from '@angular/core';

import {MatTabsModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material'
@NgModule({
    imports: [
        MatIconModule,
        MatChipsModule,
        MatListModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatTooltipModule,
        MatSelectModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatTableModule,
        MatFormFieldModule
    ],
    exports: [
        MatListModule,
        MatIconModule,
        MatChipsModule,
        MatListModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatTooltipModule,
        MatSelectModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatTableModule,
        MatFormFieldModule
    ]
})

export class materialModule {}