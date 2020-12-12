import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Member-tabs/tabs.module').then(m => m.MemberTabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up-as',
    loadChildren: () => import('./sign-up-as/sign-up-as.module').then( m => m.SignUpAsPageModule)
  },
  {
    path: 'sign-up-as/sign-up-member',
    loadChildren: () => import('./sign-up-as/sign-up-member/sign-up-member.module').then( m => m.SignUpMemberPageModule)
  },
  {
    path: 'sign-up-as/sign-up-mentor',
    loadChildren: () => import('./sign-up-as/sign-up-mentor/sign-up-mentor.module').then( m => m.SignUpMentorPageModule)
  },
  {
    path: 'sign-up-as/sign-up-investor',
    loadChildren: () => import('./sign-up-as/sign-up-investor/sign-up-investor.module').then( m => m.SignUpInvestorPageModule)
  },
  {
    path: 'mentor-tabs',
    loadChildren: () => import('./mentor-tabs/mentor-tabs.module').then( m => m.MentorTabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
