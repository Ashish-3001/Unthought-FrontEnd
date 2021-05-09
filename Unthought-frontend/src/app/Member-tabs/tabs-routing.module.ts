import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberTabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MemberTabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.MemberHomePageModule)
      },    
      {
        path: 'home/:post_id',
        loadChildren: () => import('./tab1/post-details/post-details.module').then( m => m.PostDetailsPageModule)
      },
      {
        path: 'active-zone',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.MemberActiveZonePageModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.MemberPostPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./tab4/tab4.module').then( m => m.MemberPostPageModule)
      },    
      {
        path: 'events/:event_id',
        loadChildren: () => import('./tab4/event-details/event-details.module').then( m => m.EventDetailsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./tab5/tab5.module').then( m => m.MemberProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/user/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberTabsPageRoutingModule {}
