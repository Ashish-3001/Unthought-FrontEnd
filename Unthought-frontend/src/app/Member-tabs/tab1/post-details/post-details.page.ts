import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  user_data: any = {};
  postDetails: any = [];
  postImage1:any;
  postImage2:any;
  postImage3:any;
  postMembers:any;
  postMembers_ids:string = '';
  postMembersDp: object = {};
  liked:boolean = false;
  saved:boolean = false;
  your_post: boolean = false;
  request_sent: boolean = false;
  user_type: any;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private acitivatedRoute: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    ) { }

  ngOnInit() {

    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      this.auth.data.then((value) => {
        this.user_data = value;
        if(this.user_data[0].pri_specification_submain) {
          this.user_type = 'member';
        }
        else {
          this.user_type = 'mentor'
        }
        if(!paraMap.has('post_id')) {
          console.log('error');
          return
        }
        const post_id = paraMap.get('post_id');
        this.http.get(`http://127.0.0.1:8000/LikedPostMember/?post_id=${post_id}&member_id=${this.user_data[0].id}&liked=true`).subscribe( (data) =>{
          if(data[0]) {
            this.liked = true;
          }          
        });
        this.http.get(`http://127.0.0.1:8000/SavePostMember/?post_id=${post_id}&member_id=${this.user_data[0].id}&saved=true`).subscribe( (data) =>{
          if(data[0]) {
            this.saved = true;
          }          
        });
        this.http.get(`http://127.0.0.1:8000/Post/${post_id}/`).subscribe((data) => {
          this.postDetails = data;
          this.postMembers_ids += this.postDetails.admin_id;
          this.postMembers_ids += ',';
          console.log(this.postDetails);
          this.http.get(`http://127.0.0.1:8000/PostPic/?post_id=${post_id}`).subscribe((data) => {
            this.postImage1 = data[0].post_dp;
            this.postImage2 = data[0].post_pic1;
            this.postImage3 = data[0].post_pic2;
            this.http.get(`http://127.0.0.1:8000/ProjectMember/?post_id=${post_id}&user_id=&active=true`).subscribe( (data:any = [{}]) => {
              this.postMembers = data;
              console.log(this.postMembers);
              for(var i = 0; i<this.postMembers.length; i++) {
                this.postMembers_ids += this.postMembers[i].user_id;
                this.postMembers_ids += ',';
              }
              var postdata_member_img = {
                sorted_post_id: this.postMembers_ids,
              }
              this.http.post('http://127.0.0.1:8000/sorted-people-img/', postdata_member_img ).subscribe( (data:any = [{}]) => {
                console.log(data);
                for(var i = 0; i < data.length ; i++) {
                  this.postMembersDp[data[i].fields.member_id] = 'http://127.0.0.1:8000/media/' + data[i].fields.member_dp;
                }
              })
            });
          })
          if(this.user_data[0].id == this.postDetails.admin_id) {
            this.your_post = true;
          }
          else {
            this.http.get(`http://127.0.0.1:8000/ProjectMember/?post_id=${this.postDetails.id}&user_id=${this.user_data[0].id}&active=true`).subscribe( (data:any) => {
              var n: number = data.length;
              if(n>0 && n==1) {
                if(data[0].active == true) {
                  this.your_post = true;
                }
                else {
                  this.request_sent = false;
                }
              }
            });
          }
        });
      });
    });
  }

  
  like(post_id, title_of_post) {
    var postdata = {
      'post_id': post_id,
      'member_id': this.user_data[0].id,
      'action': 'liked',
    }
    this.http.post('http://127.0.0.1:8000/sorted-posts-liked/', postdata).subscribe( (data:any) => {
      if(data.detail == 'first') {
        var postdata1 = {
          'post_id': post_id,
          'post_title': title_of_post,
          'member_id': this.user_data[0].id,
          'member_name': this.user_data[0].Member_name,
          'liked': true,
        }
        this.http.post('http://127.0.0.1:8000/LikedPostMember/', postdata1).subscribe((data) => {
          this.liked = true;
        });
      }
      else {
        this.liked = true;
      }
    });
  }

  dislike(post_id) {    
    var postdata = {
      'post_id': post_id,
      'member_id': this.user_data[0].id,
      'action': 'disliked',
    }
    this.http.post('http://127.0.0.1:8000/sorted-posts-liked/', postdata).subscribe( (data:any) => {
      this.liked = false;
    });
  }

  Saved(post_id, title_of_post) {
    var postdata = {
      'post_id': post_id,
      'member_id': this.user_data[0].id,
      'action': 'saved',
    }
    this.http.post('http://127.0.0.1:8000/sorted-posts-liked/', postdata).subscribe( (data:any) => {
      if(data.detail == 'first') {
        var postdata1 = {
          'post_id': post_id,
          'post_title': title_of_post,
          'member_id': this.user_data[0].id,
          'member_name': this.user_data[0].Member_name,
          'saved': true,
        }
        this.http.post('http://127.0.0.1:8000/SavePostMember/', postdata1).subscribe((data) => {
          this.saved = true;
        });
      }
      else {
        this.saved = true;
      }
    });
  }

  unsaved(post_id) {
    var postdata = {
      'post_id': post_id,
      'member_id': this.user_data[0].id,
      'action': 'unsaved',
    }
    this.http.post('http://127.0.0.1:8000/sorted-posts-liked/', postdata).subscribe( (data:any) => {
      this.saved = false;
    });
  }

  RequestJoin() {
    this.presentAlertConfirm();
  }

  
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmation',
      message: '<strong>Are you sure you Send a Request to join and be apart of this project</strong> ??',
      buttons: [{
        text: 'Send',
        handler: () => {
          console.log("join request clicked");
          var postdata = {
            post_id: this.postDetails.id,
            post_title: this.postDetails.title_of_post,
            user_id: this.user_data[0].id,
            user_name: this.user_data[0].Member_name,
            user_type: this.user_type,
            active: false,
            sent: true,
          }
          this.http.post('http://127.0.0.1:8000/ProjectMember/',postdata).subscribe((data) => {
            console.log(data);
            this.request_sent = true;
          }, (error) => {
            this.presentAlertSorry();
          });
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

  async presentAlertSentAlready() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Request Sent Already',
      message: 'Your Request has been sent to the admin <strong>Please Wait</strong> for the response !!!',
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

  async presentAlertMemberAlready() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Already in the group',
      message: 'Your Already a part of this project,<strong>Please</strong> chech the <strong>active tab</strong> to see the activity of this Project !!!',
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
      header: 'Try Again',
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

  changePage(member_id) {
    this.router.navigate([`/user/profilee/${member_id}`])
  }
}
