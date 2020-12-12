import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberHomePage } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: MemberHomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberHomePageRoutingModule {}
