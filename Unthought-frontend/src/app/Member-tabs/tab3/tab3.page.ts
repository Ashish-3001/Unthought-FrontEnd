import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class MemberPostPage {
  
  form: FormGroup;
  slide_no: number = 1;

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
    public menuCtrl: MenuController, 
    public alertController: AlertController,
    private auth: AuthenticationService,
    private router: Router,
    ) {}


  ngOnInit() {
    this.auth.data.then((value) => {
      this.user_data = value;
      this.new_post["admin_id"] = this.user_data[0].id;
      this.new_post["admin_name"] = this.user_data[0].Member_name;
      this.new_post["admin_designation"] = this.user_data[0].pri_specification_main;
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

  onImagePickedDp(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageStringDp = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePicked1(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageString1 = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  onImagePicked2(imageData:string) {
    if(typeof imageData === 'string') {
      this.imageString1 = imageData;
     }
     else {
       console.log("error in reciving the string");
     }
  }

  async presentAlertPost() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmation',
      message: '<strong>Are you sure you want to Post this Project</strong> ??',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'alert-button',
        },
        {
        text: 'Post',
        handler: () => {
          this.on_sumbint();
        }
      }]
    });

    await alert.present();
  }

  on_sumbint() {
    var postimage = new FormData(document.forms[0]);

    this.http.post('http://127.0.0.1:8000/Post/', this.new_post).subscribe((data:any) => {
      postimage.append("post_id", data.id.toString());
      postimage.append("post_title", data.title_of_post);

      var file1 =  this.auth.onImagePicked(this.imageStringDp);
      postimage.append("post_dp", file1 ,'name:image.jpeg');
      if(this.imageString1 == undefined && this.imageString2 == undefined ) {
        this.http.post("http://127.0.0.1:8000/PostPic/", postimage).subscribe( (data1) => {
          console.log(data1);
        },(error) => {
          this.http.delete(`http://127.0.0.1:8000/Post/${data.id}`);
          this.presentAlertSorry();
        });
      }
      else if (this.imageString2 == undefined) {
        var file2 =  this.auth.onImagePicked(this.imageString1);
        postimage.append("post_pic1", file2 ,'name:image.jpeg');

        this.http.post("http://127.0.0.1:8000/PostPic/", postimage).subscribe( (data1) => {
          console.log(data1);
        },(error) => {
          this.http.delete(`http://127.0.0.1:8000/Post/${data.id}`);
          this.presentAlertSorry();
        });
      }
      else {
        var file2 =  this.auth.onImagePicked(this.imageString1);
        postimage.append("post_pic1", file2 ,'name:image.jpeg');
        var file3 =  this.auth.onImagePicked(this.imageString2);
        postimage.append("post_pic2", file3 ,'name:image.jpeg');

        this.http.post("http://127.0.0.1:8000/PostPic/", postimage).subscribe( (data1) => {
          console.log(data1);
        },(error) => {
          this.http.delete(`http://127.0.0.1:8000/Post/${data.id}`);
          this.presentAlertSorry();
        });
      }
    },(error) => {
      this.presentAlertSorry();
    });
    
  }

  async presentAlertSorry() {
    
    this.slide_no = 1;
    this.selected = undefined;
    this.selected2 = undefined;
    this.selected3 = undefined;
    this.selected4 = undefined;
    this.primary_toggle = false;
    this.primary2_toggle = false;
    this.primary3_toggle = false;
    this.primary4_toggle = false;

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


