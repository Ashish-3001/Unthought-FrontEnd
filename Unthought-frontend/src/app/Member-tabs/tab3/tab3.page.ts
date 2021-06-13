import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class MemberPostPage {
  
  form: FormGroup;
  primary_toggle: boolean = false;
  selected: any;
  primary2_toggle: boolean = false;
  selected2: any;
  primary3_toggle: boolean = false;
  selected3:any;
  
  constructor(public menuCtrl: MenuController, public alertController: AlertController,private router: Router,) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  primarySelcted(type) {
    this.selected = type;
    this.primary_toggle = false;
  }  
  primarySelcted2(type) {
    this.selected2 = type;
    this.primary2_toggle = false;
  }
  primarySelcted3(type){
    this.selected3 = type;
    this.primary3_toggle = false;
  }
}


