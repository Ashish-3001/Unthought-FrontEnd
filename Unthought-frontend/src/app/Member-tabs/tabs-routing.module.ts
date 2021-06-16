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
        path: 'homee/:post_id',
        loadChildren: () => import('./tab1/post-details/post-details.module').then( m => m.PostDetailsPageModule)
      },
      {
        path: 'active-zone',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.MemberActiveZonePageModule)
      },
      {
        path: 'active-zone/progress-bar/:post_id',
        loadChildren: () => import('./tab2/progress-bar/progress-bar.module').then( m => m.ProgressBarPageModule)
      },
      {
        path: 'active-zone/group-chat/:post_id',
        loadChildren: () => import('./tab2/group-chat/group-chat.module').then( m => m.GroupChatPageModule)
      },
      {
        path: 'active-zone/direct-text',
        loadChildren: () => import('./tab2/direct-text/direct-text.module').then( m => m.DirectTextPageModule)
      },
      {
        path: 'active-zone/direct-text/:connect_id',
        loadChildren: () => import('./tab2/direct-text/direct-chat/direct-chat.module').then( m => m.DirectChatPageModule)
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
        path: 'eventss/:event_id',
        loadChildren: () => import('./tab4/event-details/event-details.module').then( m => m.EventDetailsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./tab5/tab5.module').then( m => m.MemberProfilePageModule)
      },
      {
        path: 'profilee/:member_id',
        loadChildren: () => import('./tab5/tab5.module').then( m => m.MemberProfilePageModule)
      },
      {
        path: 'profilee/:member_id/:add',
        loadChildren: () => import('./tab5/tab5.module').then( m => m.MemberProfilePageModule)
      },
      {
        path: 'profile/saved/:member_id',
        loadChildren: () => import('./tab5/saved/saved.module').then( m => m.SavedPageModule)
      },
      {
        path: 'profilee/edit-profile/:member_id',
        loadChildren: () => import('./tab5/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
      },
      {
        path: 'search/:for',
        loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'search/:for/:add',
        loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
      },    
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
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
