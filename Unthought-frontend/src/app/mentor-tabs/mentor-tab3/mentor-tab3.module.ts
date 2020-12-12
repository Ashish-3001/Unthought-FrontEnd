import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentorTab3PageRoutingModule } from './mentor-tab3-routing.module';

import { MentorTab3Page } from './mentor-tab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentorTab3PageRoutingModule
  ],
  declarations: [MentorTab3Page]
})
export class MentorTab3PageModule {}
