import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TAndCPageRoutingModule } from './t-and-c-routing.module';

import { TAndCPage } from './t-and-c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TAndCPageRoutingModule
  ],
  declarations: [TAndCPage]
})
export class TAndCPageModule {}
