import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberPostPage } from './tab3.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MemberPostPageRoutingModule } from './tab3-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: MemberPostPage }]),
    MemberPostPageRoutingModule,
  ],
  declarations: [MemberPostPage]
})
export class MemberPostPageModule {}
