import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectTextPageRoutingModule } from './direct-text-routing.module';

import { DirectTextPage } from './direct-text.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectTextPageRoutingModule
  ],
  declarations: [DirectTextPage]
})
export class DirectTextPageModule {}
