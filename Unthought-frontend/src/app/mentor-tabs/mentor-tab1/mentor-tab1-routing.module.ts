import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorTab1Page } from './mentor-tab1.page';

const routes: Routes = [
  {
    path: '',
    component: MentorTab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorTab1PageRoutingModule {}
