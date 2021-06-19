import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ImagePickerComponent } from './image-picker/image-picker.component';

@NgModule({
    declarations: [ImagePickerComponent],
    imports: [CommonModule, IonicModule, FormsModule,],
    exports: [ImagePickerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule{}