import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpMentorPageRoutingModule } from './sign-up-mentor-routing.module';

import { SignUpMentorPage } from './sign-up-mentor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpMentorPageRoutingModule
  ],
  declarations: [SignUpMentorPage]
})
export class SignUpMentorPageModule {}
