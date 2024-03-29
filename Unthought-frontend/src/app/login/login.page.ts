import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  dp_img: string = '../assets/img/11.png';
  arrow_img: string = '../assets/img/right-arrow.png'; 
  slide2_img: string = '../assets/img/slide3.jpg';

  constructor(private http: HttpClient, 
    public alertController: AlertController,
    private router:Router,
    private auth: AuthenticationService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    var postdata = {
      user_name: form.value.username,
      password: form.value.password,
    }
    this.http.post('http://127.0.0.1:8000/validate-user/', postdata).subscribe( (data:any) => {
      if(data.status == true){
        this.auth.login(data.user_type, data.user_id)
      }
      else{
        this.presentAlertError();
      }
    }, (error) => {
      console.log(error);
      this.presentAlertError();
    });
    form.resetForm(); 
  }
  
  async presentAlertError() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Try Again',
      message: 'Something went wrong. Please <strong>Try Again</strong> with correct Username and Password!!!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

    await alert.present();
  }

}
