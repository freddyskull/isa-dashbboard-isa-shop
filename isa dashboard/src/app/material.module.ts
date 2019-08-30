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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {BidiModule} from '@angular/cdk/bidi';
import {MatIconModule, MatProgressSpinnerModule } from '@angular/material';


@NgModule({
    imports: [
        BidiModule,
        DragDropModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
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
        BidiModule,
        DragDropModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
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