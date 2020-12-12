import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberActiveZonePage } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: MemberActiveZonePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberActiveZonePageRoutingModule {}
