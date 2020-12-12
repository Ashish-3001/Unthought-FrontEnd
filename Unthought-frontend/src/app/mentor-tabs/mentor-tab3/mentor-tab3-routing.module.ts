import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorTab3Page } from './mentor-tab3.page';

const routes: Routes = [
  {
    path: '',
    component: MentorTab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorTab3PageRoutingModule {}
