import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm,FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {
  form: FormGroup;
  slide_no: number = 1;
  curent_data: object = {};

  user_data:any;
  new_post: object = {};

  primary_toggle: boolean = false;
  selected: any;
  primary2_toggle: boolean = false;
  selected2: any;
  primary3_toggle: boolean = false;
  selected3:any;
  primary4_toggle:boolean = false;
  selected4:any;
  

  imageStringDp: string = undefined;
  imageStringDp_toggle: boolean = false;
  imageString1: string = undefined;
  imageString1_toggle: boolean = false;
  imageString2: string = undefined;
  imageString2_toggle: boolean = false;

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private acitivatedRoute: ActivatedRoute,
    private auth: AuthenticationService,
    ) { }

  ngOnInit() {

    this.acitivatedRoute.paramMap.subscribe(paraMap => {

      if(!paraMap.has('post_id')) {
        console.log('error');
        return
      }

      
      const post_id = paraMap.get('post_id');

      this.auth.data.then((value) => {
        this.user_data = value;
        this.http.get(`http://127.0.0.1:8000/Post/${post_id}`).subscribe((data:any) => {
          this.curent_data = data;
          this.new_post["admin_id"] = data.admin_id;
          this.new_post["admin_name"] = data.admin_name;
          this.new_post["admin_designation"] = data.admin_designation;
          this.selected = data.requirement1;
          this.selected2 = data.requirement2;
          this.selected3 = data.requirement3;
          this.selected4 = data.requirement4;
        });
      });
    });
  }
  ionViewWillEnter() {
    this.slide_no = 1;
    this.selected = undefined;
    this.selected2 = undefined;
    this.selected3 = undefined;
    this.selected4 = undefined;
    this.primary_toggle = false;
    this.primary2_toggle = false;
    this.primary3_toggle = false;
    this.primary4_toggle = false;
  }

  Slide1_submit(form: NgForm) {
    this.new_post["title_of_post"] = form.value.posttitle;
    this.new_post["short_desc"] = form.value.shortdec;
    this.new_post["long_desc"] = form.value.longdec;
    this.new_post["goal_of_project"] = form.value.projgoal;
    this.new_post["workdone"] = form.value.projwork;
    this.slide_no = 2;
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

  primarySelcted4(type){
    this.selected4 = type;
    this.primary4_toggle = false;
  }

  Slide2_submit() {
    this.new_post["requirement1"] = this.selected;
    this.new_post["requirement2"] = this.selected2;
    this.new_post["requirement3"] = this.selected3;
    this.new_post["requirement4"] = this.selected4;
    this.slide_no = 3;
    console.log(this.new_post);
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
}
