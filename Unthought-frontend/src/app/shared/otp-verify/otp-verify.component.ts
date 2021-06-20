import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss'],
})
export class OtpVerifyComponent implements OnInit {

  otp:string;


  constructor(private http:HttpClient,
    private router:Router,
    private modalCtrl: ModalController,
    private auth: AuthenticationService,
    public alertController: AlertController,
    private navController:NavController) { }

  ngOnInit() {

  }

  verify(form: NgForm) {
    this.otp = form.value.otp;
    if(this.auth.otp_verification.value !== "0000") {
      if(this.auth.otp_verification.value === this.otp) {
        this.auth.otp_verification.next("1111")
        this.modalCtrl.dismiss();
      }
      else {
        console.log("invalid otp ");
      }
    }
    else {
      console.log("error '0000' ");
    }
  }

  
  async presentAlertResendOTP() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Comfirm',
      message: 'Please confirm Your <strong>Phone Number</strong> Again!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.modalCtrl.dismiss();
          }
        }
      ]
    });
    
    await alert.present();
  }
}
