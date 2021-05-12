import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberSignUpPageRoutingModule } from './member-sign-up-routing.module';

import { MemberSignUpPage } from './member-sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberSignUpPageRoutingModule
  ],
  declarations: [MemberSignUpPage]
})
export class MemberSignUpPageModule {}
