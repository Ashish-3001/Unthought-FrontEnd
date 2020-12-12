import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorTab5Page } from './mentor-tab5.page';

const routes: Routes = [
  {
    path: '',
    component: MentorTab5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorTab5PageRoutingModule {}
