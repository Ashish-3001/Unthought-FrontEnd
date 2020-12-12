import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorTab2Page } from './mentor-tab2.page';

const routes: Routes = [
  {
    path: '',
    component: MentorTab2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorTab2PageRoutingModule {}
