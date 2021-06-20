import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OtpVerifyComponent } from 'src/app/shared/otp-verify/otp-verify.component';



@Component({
  selector: 'app-sign-up-member',
  templateUrl: './sign-up-member.page.html',
  styleUrls: ['./sign-up-member.page.scss'],
})
export class SignUpMemberPage implements OnInit {
  
  form: FormGroup;
  slide_no: number = 1;

  new_user:object = {};
  new_member: object = {};
  working_status:any;

  primary_toggle: boolean = false;
  pri_specification_main: any;
  pri_specification_sub: any;
  primary_sub_toggle:  boolean = false;

  secoundary_toggle: boolean = false;
  sec_specification_main: any;
  sec_specification_sub: any;
  secoundary_sub_toggle:  boolean = false;

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private auth: AuthenticationService,
    private modalCtrl: ModalController,
    private router: Router,) { }

  ngOnInit() {
  }

  Slide1_submit(form: NgForm) {
    var postdata = {
      'phone': form.value.phonenumber.toString(),
      'user_name': form.value.Uname,
      'password': form.value.password,
    }
    this.http.post('http://127.0.0.1:8000/validate-otp/', postdata).subscribe( (data:any) => {
      console.log(data);
      if(data.status == true){

        this.new_user["user_name"] = form.value.Uname;
        this.new_user["password"] = form.value.password;
        this.new_user["user_type"] = "member";
        this.new_member["phone_number"] = form.value.phonenumber;
        this.new_member["user_name"] = form.value.Uname;

        var otp =data.otp.toString();
        this.auth.otp_verification.next(otp);
        
        this.modalCtrl.create({component: OtpVerifyComponent }).then(modalEl => {
          modalEl.present();
          modalEl.onWillDismiss().then(() => {
            console.log(this.auth.otp_verification.value);
            if(this.auth.otp_verification.value == "1111") {
              this.slide_no = 2;
            }
          });
        });
      }
      else {
        if (data.detail == "User name is already present"){
         this.presentAlertUsername();
         form.reset(); 
        }
        else if (data.detail ==  "phone number is already present"){
          this.presentAlertNumber();
          form.reset();
        }
        else {
          this.presentAlertNumber();
          form.reset();
        }
      }
    });
  }

  Slide2_submit(form2: NgForm) {

    this.new_member["Member_name"] = form2.value.Mname
    this.new_member["gender"] = form2.value.gender
    this.new_member["dob"] = form2.value.dob
    this.new_member["email"] = form2.value.email

    if (this.working_status == 'true') {
      this.new_member["working_status"] = true
      this.new_member["company_name"] = form2.value.campany
      this.new_member["college_name"] = 'null'
      this.new_member["course"] = 'null'
    } 
    else {
      this.new_member["working_status"] = false
      this.new_member["company_name"] = 'null'
      this.new_member["college_name"] = form2.value.college
      this.new_member["course"] = form2.value.course
    }
    this.slide_no = 3;
  }

  Slide3_submit() {
    this.new_member["pri_specification_main"] = this.pri_specification_main;
    this.new_member["pri_specification_submain"] = this.pri_specification_sub;
    this.new_member["sec_specification_main"] = this.sec_specification_main;
    this.new_member["sec_specification_submain"] = this.sec_specification_sub;
    console.log(this.new_member);
    this.slide_no = 4;
  }

  ionViewWillEnter() {

  }

  onSubmit(form: NgForm) {
    
  }

  primarySelcted(type) {
    this.pri_specification_main = type;
    this.primary_sub_toggle  = !this.primary_sub_toggle;
  }

  primarysubSelcted(type) {
    this.pri_specification_sub = type;
    this.primary_sub_toggle = false;
    this.primary_toggle = false;
  }
  
  secoundarySelcted(type){
    this.sec_specification_main = type;
    this.secoundary_sub_toggle = !this.primary_sub_toggle;  
  }

  secoundarysubSelcted(type) {
    this.sec_specification_sub = type;
    this.secoundary_sub_toggle = false;
    this.secoundary_toggle = false;
  }

  back(num) {
    this.presentAlertBack(num);
  }


  async presentAlertBack(num) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Alert',
      message: '<strong>Are you sure you want to go back your previously entered Data might be Erased</strong> ??',
      buttons: [{
        text: 'Go Back',
        handler: () => {
          console.log("join request clicked");
          this.new_user = {};
          this.new_member = {};
          this.slide_no = num;
        }
      },
      {
        text: 'cancel',
        role: 'cancel',
        cssClass: 'alert-button',
      }]
    });

    await alert.present();
  }

  async presentAlertUsername() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Sorry !!',
      message:  'User name already Present. <strong>Please Try Again with a Unique Name</strong>!!!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'alert-button',
        }
      ]
    });

    await alert.present();
  }

  async presentAlertNumber() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Sorry !!',
      message:  'This number is alreday registered if you hvae a account please login else <strong>Please Try Again with a different number.</strong>!!!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'alert-button',
        }
      ]
    });

    await alert.present();
  }

  async presentAlertSorry() {
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Sorry !!',
      message:  'Something went wrong. <strong>Please Try Again</strong>!!!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'alert-button',
        }
      ]
    });

    await alert.present();
  }
}
