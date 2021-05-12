import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorSignUpPage } from './mentor-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: MentorSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorSignUpPageRoutingModule {}
