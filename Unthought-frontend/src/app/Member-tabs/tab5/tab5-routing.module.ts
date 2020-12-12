import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberProfilePage } from './tab5.page';

const routes: Routes = [
  {
    path: '',
    component: MemberProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberProfilePageRoutingModule {}
