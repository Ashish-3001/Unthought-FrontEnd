import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-mentor',
  templateUrl: './sign-up-mentor.page.html',
  styleUrls: ['./sign-up-mentor.page.scss'],
})
export class SignUpMentorPage implements OnInit {

  primary_toggle: boolean = false;
  pri_specification_main: any;
  pri_specification_sub: any;
  primary_sub_toggle:  boolean = false;


  constructor(public menuCtrl: MenuController, public alertController: AlertController,private router: Router,) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  primarySelcted(type) {
    this.pri_specification_main = type;
    this.primary_sub_toggle  =true;
  }
  primarysubSelcted(type) {
    this.pri_specification_sub = type;
    this.primary_sub_toggle = false;
    this.primary_toggle = false;
  }
}
