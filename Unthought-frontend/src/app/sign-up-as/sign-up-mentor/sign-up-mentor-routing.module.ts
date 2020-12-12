import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpMentorPage } from './sign-up-mentor.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpMentorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpMentorPageRoutingModule {}
