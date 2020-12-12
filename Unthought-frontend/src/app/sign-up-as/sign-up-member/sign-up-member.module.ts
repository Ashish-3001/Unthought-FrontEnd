import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpMemberPageRoutingModule } from './sign-up-member-routing.module';

import { SignUpMemberPage } from './sign-up-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpMemberPageRoutingModule
  ],
  declarations: [SignUpMemberPage]
})
export class SignUpMemberPageModule {}
