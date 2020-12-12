import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentorTab1PageRoutingModule } from './mentor-tab1-routing.module';

import { MentorTab1Page } from './mentor-tab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentorTab1PageRoutingModule
  ],
  declarations: [MentorTab1Page]
})
export class MentorTab1PageModule {}
