import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentorTab2PageRoutingModule } from './mentor-tab2-routing.module';

import { MentorTab2Page } from './mentor-tab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentorTab2PageRoutingModule
  ],
  declarations: [MentorTab2Page]
})
export class MentorTab2PageModule {}
