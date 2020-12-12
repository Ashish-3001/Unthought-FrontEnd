import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorTabsPage } from './mentor-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MentorTabsPage,
    children: [
      {
        path: 'mentor-home',
        loadChildren: () => import('./mentor-tab1/mentor-tab1.module').then( m => m.MentorTab1PageModule)
      },
      {
        path: 'mentor-active-zone',
        loadChildren: () => import('./mentor-tab2/mentor-tab2.module').then( m => m.MentorTab2PageModule)
      },
      {
        path: 'mentor-post',
        loadChildren: () => import('./mentor-tab3/mentor-tab3.module').then( m => m.MentorTab3PageModule)
      },
      {
        path: 'mentor-events',
        loadChildren: () => import('./mentor-tab4/mentor-tab4.module').then( m => m.MentorTab4PageModule)
      },
      {
        path: 'mentor-profile',
        loadChildren: () => import('./mentor-tab5/mentor-tab5.module').then( m => m.MentorTab5PageModule)
      },
      {
        path: '',
        redirectTo: '/mentor-tabs/mentor-home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorTabsPageRoutingModule {}
