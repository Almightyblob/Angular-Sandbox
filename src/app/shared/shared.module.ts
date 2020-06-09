import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSPinnerComponent } from './loading-spinner/loading-spinner';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AlertComponent,
                   LoadingSPinnerComponent,
                   DropdownDirective],
    imports: [CommonModule, ],
    exports: [AlertComponent,
        LoadingSPinnerComponent,
        DropdownDirective, CommonModule]
})
export class SharedModule{}