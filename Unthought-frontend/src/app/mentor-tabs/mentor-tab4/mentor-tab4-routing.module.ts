import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorTab4Page } from './mentor-tab4.page';

const routes: Routes = [
  {
    path: '',
    component: MentorTab4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorTab4PageRoutingModule {}
