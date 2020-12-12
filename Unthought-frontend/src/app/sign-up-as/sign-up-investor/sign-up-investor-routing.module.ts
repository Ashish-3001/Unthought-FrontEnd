import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpInvestorPage } from './sign-up-investor.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpInvestorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpInvestorPageRoutingModule {}
