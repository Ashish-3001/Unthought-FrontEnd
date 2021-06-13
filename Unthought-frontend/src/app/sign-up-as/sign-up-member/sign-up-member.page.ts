import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up-member',
  templateUrl: './sign-up-member.page.html',
  styleUrls: ['./sign-up-member.page.scss'],
})
export class SignUpMemberPage implements OnInit {
  
  form: FormGroup;

  primary_toggle: boolean = false;
  pri_specification_main: any;
  pri_specification_sub: any;
  primary_sub_toggle:  boolean = false;

  secoundary_toggle: boolean = false;
  sec_specification_main: any;
  sec_specification_sub: any;
  secoundary_sub_toggle:  boolean = false;

  constructor(public menuCtrl: MenuController, public alertController: AlertController,private router: Router,) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  onSubmit(form: NgForm) {
    var postdata = {
      unique_name: form.value.Uname,
      Member_name: form.value.Mname,
      gender: form.value.gender,
      dob: form.value.dob,
      phone_number: form.value.Uname,   
      email: form.value.email,
      working_status: form.value.workstatus,
      company_name: form.value.campany,
    }
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
  
  secoundarySelcted(type){
    this.sec_specification_main = type;
    this.secoundary_sub_toggle = true;  
  }

  secoundarysubSelcted(type) {
    this.sec_specification_sub = type;
    this.secoundary_sub_toggle = false;
    this.secoundary_toggle = false;
  }


}
