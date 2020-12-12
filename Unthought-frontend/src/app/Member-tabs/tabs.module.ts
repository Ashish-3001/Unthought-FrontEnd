import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MemberTabsPageRoutingModule} from './tabs-routing.module';

import { MemberTabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MemberTabsPageRoutingModule
  ],
  declarations: [MemberTabsPage]
})
export class MemberTabsPageModule {}
