import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberPostPage } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: MemberPostPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberPostPageRoutingModule {}
