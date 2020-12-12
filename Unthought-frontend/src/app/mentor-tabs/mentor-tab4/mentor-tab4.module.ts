import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentorTab4PageRoutingModule } from './mentor-tab4-routing.module';

import { MentorTab4Page } from './mentor-tab4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentorTab4PageRoutingModule
  ],
  declarations: [MentorTab4Page]
})
export class MentorTab4PageModule {}
