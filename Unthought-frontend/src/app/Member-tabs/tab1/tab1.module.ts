import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberHomePage } from './tab1.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MemberHomePageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MemberHomePageRoutingModule
  ],
  declarations: [MemberHomePage]
})
export class MemberHomePageModule {}
