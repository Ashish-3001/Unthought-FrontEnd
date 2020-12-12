import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberPostPageRoutingModule } from './tab4-routing.module';

import { MemberPostPage } from './tab4.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    MemberPostPageRoutingModule
  ],
  declarations: [MemberPostPage]
})
export class MemberPostPageModule {}
