import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MentorTabsPageRoutingModule } from './mentor-tabs-routing.module';

import { MentorTabsPage } from './mentor-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MentorTabsPageRoutingModule
  ],
  declarations: [MentorTabsPage]
})
export class MentorTabsPageModule {}
