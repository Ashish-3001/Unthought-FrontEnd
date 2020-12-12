import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentorTab5PageRoutingModule } from './mentor-tab5-routing.module';

import { MentorTab5Page } from './mentor-tab5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentorTab5PageRoutingModule
  ],
  declarations: [MentorTab5Page]
})
export class MentorTab5PageModule {}
