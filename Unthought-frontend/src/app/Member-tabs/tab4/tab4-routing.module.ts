import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberPostPage } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: MemberPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberPostPageRoutingModule {}
