import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  state:number = 1;
  user_data: any = {};
  your_post_ids:string = "";
  requested_member_ids: string = "";
  requested_members: any = [];
  requested_projects: object = {};
  project_member_ids:object = {};
  MembersDp: object = {};
  read_more_member: any = [];

  join_posts_ids:string = "";
  join_posts: any =[];
  post_img:string = '';
  post_admin_img:string = '';
  image_dict: object = {};
  dp_image_dict: object = {};
  liked_post = [];
  saved_post = [];
  project_member_post_ids:object = {};
  read_more_post: any = [];

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private acitivatedRoute: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {

    this.auth.data.then((value) => {
      this.user_data = value;

      this.http.get(`http://127.0.0.1:8000/Post/?admin_id=${this.user_data[0].id}&active=true`).subscribe((data:any) => {
        var n:number = data.length;
        if(n>0) {
          for(var i =0; i<n; i++) {
            this.your_post_ids += data[i].id;
            this.your_post_ids += ',';
          }
          var postdata = {
            sorted_post_id: this.your_post_ids,
          }
          this.http.post('http://127.0.0.1:8000/post-members/', postdata ).subscribe((data:any) => {
            var m:number = data.length;
            if(m>0) {
              for(var i =0; i<m; i++) {
                this.requested_member_ids += data[i].fields.user_id;
                this.requested_member_ids += ',';
                this.requested_projects[data[i].fields.user_id] = data[i].fields.post_title;
                this.project_member_ids[data[i].fields.user_id] = data[i].pk;
              }
              var postdata_mamber = {
                sorted_post_id: this.requested_member_ids,
              }
              this.http.post('http://127.0.0.1:8000/members/', postdata_mamber ).subscribe((data:any) => {
                this.requested_members = data;
              });
              this.http.post('http://127.0.0.1:8000/sorted-people-img/', postdata_mamber ).subscribe( (data:any = [{}]) => {
                for(var i = 0; i < data.length ; i++) {
                  this.MembersDp[data[i].fields.member_id] = 'http://127.0.0.1:8000/media/' + data[i].fields.member_dp;
                }
                console.log(this.MembersDp);
              })
            }
          });
        }
      })

      this.http.get(`http://127.0.0.1:8000/ProjectMember/?post_id=&user_id=${this.user_data[0].id}&active=false&sent=false`).subscribe((data:any) => {
        var n: number = data.length;
        for(var i =0; i< n; i++) {
          this.join_posts_ids += data[i].post_id.toString();
          this.join_posts_ids += ',';
          this.project_member_post_ids[data[i].post_id] = data[i].id;
          }

          var postdata = {
            sorted_post_id: this.join_posts_ids,
          }
          this.http.post('http://127.0.0.1:8000/saved-posts/', postdata).subscribe( (data:any) => {
            this.join_posts = data;
            console.log(data);
            for(var i =0; i< this.join_posts.length; i++) {
              this.post_img += this.join_posts[i].pk.toString();
              this.post_img += ',';
              this.post_admin_img += this.join_posts[i].fields.admin_id.toString();
              this.post_admin_img += ',';
            }

            var postdata_img = {
              sorted_post_id: this.post_img,
            }
            this.http.post('http://127.0.0.1:8000/sorted-posts-img/', postdata_img ).subscribe( (data:any = [{}]) => {
              console.log(data);
              for(var i = 0; i < data.length ; i++) {
                this.image_dict[data[i].fields.post_id] = 'http://127.0.0.1:8000/media/' + data[i].fields.post_dp;
              }
              console.log(this.image_dict[2]);          
            })
            
            var postdata_admin_img = {
              sorted_post_id: this.post_admin_img,
            }
            this.http.post('http://127.0.0.1:8000/sorted-people-img/', postdata_admin_img ).subscribe( (data:any = [{}]) => {
              console.log(data);
              for(var i = 0; i < data.length ; i++) {
                this.dp_image_dict[data[i].fields.member_id] = 'http://127.0.0.1:8000/media/' + data[i].fields.member_dp;
              }
              console.log(this.dp_image_dict);
            });

            this.http.get(`http://127.0.0.1:8000/LikedPostMember/?post_id=&member_id=${this.user_data[0].id}&liked=true`).subscribe( (data:any = [{}]) => {
              for(var i = 0; i < data.length ; i++) {
                this.liked_post.push(data[i].post_id);
              }
            });

            this.http.get(`http://127.0.0.1:8000/SavePostMember/?post_id=&member_id=${this.user_data[0].id}&saved=true`).subscribe( (data:any = [{}]) => {
              for(var i = 0; i < data.length ; i++) {
                this.saved_post.push(data[i].post_id);
              }
            });
          });
      });
    });
  }

  readMoreUser(user_id, state) {
    if (state == true) {
      this.read_more_member.push(user_id);
    }
    else {
      const index = this.read_more_member.indexOf(user_id);  
      if(index > -1) {       
        this.read_more_member.splice(index,1);
      }
    }
    
  }

  async presentAlertacceptUser(user_id,i) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmation',
      message: '<strong>Are you sure you want him to join and be apart of this project</strong> ??',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'alert-button',
        },
        {
        text: 'Accept',
        handler: () => {
          var pacthdata = {
            active: true,
          }
          this.http.patch(`http://127.0.0.1:8000/ProjectMember/${this.project_member_ids[user_id]}/`, pacthdata).subscribe( (data) => { 
            console.log(data);
            const index = this.requested_members.indexOf(this.requested_members[i]);
            console.log(index);
            if(index > -1) {       
              this.requested_members.splice(index,1);
            }
          }, (error) => {
            this.presentAlertSorry();
          });
        }
      }]
    });

    await alert.present();

  }

  async presentAlertrejectUser(user_id,i) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmation',
      message: '<strong>Are you sure you want reject this cadidate for this project</strong> ??',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'alert-button',
        },
        {
        text: 'Reject',
        handler: () => {
          this.http.delete(`http://127.0.0.1:8000/ProjectMember/${this.project_member_ids[user_id]}/`).subscribe( (data) => {
            console.log(data);
            const index = this.requested_members.indexOf(this.requested_members[i]);
            console.log(index);
            if(index > -1) {       
              this.requested_members.splice(index,1);
            }
          }, (error) => {
            this.presentAlertSorry();
          });
        }
      }]
    });

    await alert.present();

  }

  readMorePost(user_id, state) {
    if (state == true) {
      this.read_more_post.push(user_id);
    }
    else {
      const index = this.read_more_post.indexOf(user_id);  
      if(index > -1) {       
        this.read_more_post.splice(index,1);
      }
    }
    
  }

  async presentAlertacceptPost(user_id,i) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmation',
      message: '<strong>Are you sure you want to be apart of this project</strong> and will give your best for the success of this project ?? ',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'alert-button',
        },
        {
        text: 'Join',
        handler: () => {
          var pacthdata = {
            active: true,
          }
          this.http.patch(`http://127.0.0.1:8000/ProjectMember/${this.project_member_post_ids[user_id]}/`, pacthdata).subscribe( (data) => { 
            console.log(data);
            const index = this.join_posts.indexOf(this.join_posts[i]);
            console.log(index);
            if(index > -1) {       
              this.join_posts.splice(index,1);
            }
          }, (error) => {
            this.presentAlertSorry();
          });
        }
      }]
    });

    await alert.present();

  }

  async presentAlertrejectPost(user_id,i) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmation',
      message: "<strong>Are you sure you want don't want to be a part of this project</strong> ??",
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'alert-button',
        },
        {
        text: 'Reject',
        handler: () => {
          this.http.delete(`http://127.0.0.1:8000/ProjectMember/${this.project_member_post_ids[user_id]}/`).subscribe( (data) => {
            console.log(data);
            const index = this.join_posts.indexOf(this.join_posts[i]);
            console.log(index);
            if(index > -1) {       
              this.join_posts.splice(index,1);
            }
          }, (error) => {
            this.presentAlertSorry();
          });
        }
      }]
    });

    await alert.present();

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
          this.liked_post.push(post_id);
        });
      }
      else {
        this.liked_post.push(post_id);
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
      const index = this.liked_post.indexOf(post_id);  
      if(index > -1) {       
        this.liked_post.splice(index,1);
      }
    });
  }

  saved(post_id, title_of_post) {
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
          this.saved_post.push(post_id);
        });
      }
      else {
        this.saved_post.push(post_id);
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
      const index = this.saved_post.indexOf(post_id);  
      if(index > -1) {       
        this.saved_post.splice(index,1);
      }
    });
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
}
