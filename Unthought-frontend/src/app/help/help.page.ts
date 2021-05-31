import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  type:any;
  user_id:any;

  constructor(
    private router: Router,
    private acitivatedRoute: ActivatedRoute,
    private http: HttpClient, 
    public alertController: AlertController,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.acitivatedRoute.paramMap.subscribe(paraMap => { 
      
      if(!paraMap.has('type')) {
        console.log('error');
        return
      }

      const type = paraMap.get('type');
      this.type = type;

      this.auth.data.then((value:any) => {
        this.user_id = value[0].id;
      });
    });

  }

  backtoprofile() {
    this.router.navigate([`/${this.type}//profile`])

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Try Again',
      message: 'Something went wrong. Please Re Enter the give Details and<strong>Try Again</strong>!!!',
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

  async presentAlertThanks() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Thank You',
      message: 'We will get back to you <strong>Shortly</strong>!!!',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });

    await alert.present();
  }

  help(form: NgForm) {
    var postdata = {
      user_id: this.user_id,
      user_type: this.type,
      user_name: form.value.name,
      user_number: form.value.phone,
      user_desc: form.value.des,
    }
    this.http.post('http://127.0.0.1:8000/Help/', postdata).subscribe( (data) => {
      this.presentAlertThanks();
    }, (error) => {
      console.log(error);
      this.presentAlertConfirm();
    });
    form.resetForm(); 
  }

}
