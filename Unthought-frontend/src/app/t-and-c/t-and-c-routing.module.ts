import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TAndCPage } from './t-and-c.page';

const routes: Routes = [
  {
    path: '',
    component: TAndCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TAndCPageRoutingModule {}
