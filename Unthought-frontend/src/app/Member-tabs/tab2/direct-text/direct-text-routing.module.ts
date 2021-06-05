import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectTextPage } from './direct-text.page';

const routes: Routes = [
  {
    path: '',
    component: DirectTextPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectTextPageRoutingModule {}
