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
  slide_no: number = 1;

  new_user:any;
  new_member: object = {};

  primary_toggle: boolean = false;
  pri_specification_main: any;
  pri_specification_sub: any;
  primary_sub_toggle:  boolean = false;

  secoundary_toggle: boolean = false;
  sec_specification_main: any;
  sec_specification_sub: any;
  secoundary_sub_toggle:  boolean = false;

  constructor(
    public alertController: AlertController,
    private router: Router,) { }

  ngOnInit() {
  }

  Slide1_submit(form: NgForm) {
    this.new_user["user_name"] = form.value.Uname;
    this.new_user["password"] = form.value.password;
    this.new_member["phone_number"] = form.value.phonenumber;
    var postdata = {
      'phone': form.value.phonenumber,
      'user_name': form.value.Uname,
      'password': form.value.password,
    }
  }

  ionViewWillEnter() {

  }

  onSubmit(form: NgForm) {
    
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
