import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpInvestorPageRoutingModule } from './sign-up-investor-routing.module';

import { SignUpInvestorPage } from './sign-up-investor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpInvestorPageRoutingModule
  ],
  declarations: [SignUpInvestorPage]
})
export class SignUpInvestorPageModule {}
