import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentorSignUpPageRoutingModule } from './mentor-sign-up-routing.module';

import { MentorSignUpPage } from './mentor-sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentorSignUpPageRoutingModule
  ],
  declarations: [MentorSignUpPage]
})
export class MentorSignUpPageModule {}
