import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberActiveZonePage } from './tab2.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MemberActiveZonePageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MemberActiveZonePageRoutingModule
  ],
  declarations: [MemberActiveZonePage]
})
export class MemberActiveZonePageModule {}
