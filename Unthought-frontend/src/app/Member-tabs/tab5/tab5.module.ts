import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberProfilePageRoutingModule } from './tab5-routing.module';

import { MemberProfilePage } from './tab5.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    MemberProfilePageRoutingModule
  ],
  declarations: [MemberProfilePage]
})
export class MemberProfilePageModule {}
