import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ' ',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user',
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
  },
  {
    path: 'search-bar',
    loadChildren: () => import('./search-bar/search-bar.module').then( m => m.SearchBarPageModule)
  },
  {
    path: 'about-app/:type',
    loadChildren: () => import('./about-app/about-app.module').then( m => m.AboutAppPageModule)
  },
  {
    path: 'help/:type',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 't-and-c/:type',
    loadChildren: () => import('./t-and-c/t-and-c.module').then( m => m.TAndCPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
