import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class MemberProfilePage implements OnInit {

  own_profile: boolean;
  member_id: any;
  user_data: any;
  member_dp: any;
  check_post:boolean = false;
  post_ids:string = '';
  post_image:any;
  other_check_post:boolean = false;
  other_post_ids:string = '';
  other_post_image:any;

  adding_member:boolean = false;
  add_post_id:any;
  add_post_title:any;
  your_post: boolean = false;
  request_sent: boolean = false;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private acitivatedRoute: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    ) { }

  ngOnInit() {

    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      if(!paraMap.has('member_id')) {  
        this.auth.data.then((value) => {
          this.user_data = value;
          this.member_id = this.user_data[0].id;
          this.own_profile = true;

          this.http.get(`http://127.0.0.1:8000/MemberDp/?member_id=${this.member_id}`).subscribe((data) =>{
            this.member_dp = data[0].member_dp;
          });
          console.log(this.member_id);
          this.http.get(`http://127.0.0.1:8000/Post/?admin_id=${this.member_id}`).subscribe( (data: any = [{}]) => {
            if(data.length > 0){
              this.check_post = true;
              for(var i = 0; i<data.length; i++) {
                this.post_ids += data[i].id;
                this.post_ids += ',';              
              }
              var postdata = {
                sorted_post_id: this.post_ids,
              }
              this.http.post('http://127.0.0.1:8000/sorted-posts-img/', postdata ).subscribe((data) => {
                this.post_image = data;
                console.log(this.post_image);
              });              
            }
          this.http.get(`http://127.0.0.1:8000/ProjectMember/?post_id=&user_id=${this.member_id}&active=true`).subscribe((data:any = [{}]) => {
              if(data.length>0) {
                this.other_check_post = true;
                for(var i = 0; i<data.length; i++) {
                  this.other_post_ids += data[i].post_id;
                  this.other_post_ids += ',';
                }
                var postdata = {
                  sorted_post_id: this.other_post_ids,
                }
                this.http.post('http://127.0.0.1:8000/sorted-posts-img/', postdata ).subscribe((data) => {
                  this.other_post_image = data;
                  console.log(this.other_post_image); 
                });
              }
            });
          });
        });
      }
      else {  
        this.auth.data.then((value) => {
          this.user_data = value;

          const member_id = paraMap.get('member_id');
          this.member_id = member_id;

          if(paraMap.has('add')) { 
            const post_id = paraMap.get('add');
            this.add_post_id = post_id;
            this.adding_member = true;
            console.log(this.add_post_id);
            console.log(this.user_data[0].id);

            this.http.get(`http://127.0.0.1:8000/ProjectMember/?post_id=${this.add_post_id}&user_id=${this.member_id}&active=true`).subscribe( (data:any) => {
                var n: number = data.length;
                if(n>0 && n==1) {
                  if(data[0].active == true) {
                    this.your_post = true;
                  }
                  else {
                    this.request_sent = false;
                  }
                }
                else {
                  this.http.get(`http://127.0.0.1:8000/Post/${this.add_post_id}/`).subscribe((data:any) => {
                    this.add_post_title = data.title_of_post;
                  });
                }
              });
          }

          this.http.get(`http://127.0.0.1:8000/Member/${member_id}`).subscribe((data) => {
            this.user_data = data;
            this.own_profile = false;

            this.http.get(`http://127.0.0.1:8000/MemberDp/?member_id=${this.member_id}`).subscribe((data) =>{
              this.member_dp = data[0].member_dp;
            });
            console.log(this.member_id);
            this.http.get(`http://127.0.0.1:8000/Post/?admin_id=${this.member_id}`).subscribe( (data: any = [{}]) => {
              if(data.length > 0){
                this.check_post = true;
                for(var i = 0; i<data.length; i++) {
                  this.post_ids += data[i].id;
                  this.post_ids += ',';              
                }
                var postdata = {
                  sorted_post_id: this.post_ids,
                }
                this.http.post('http://127.0.0.1:8000/sorted-posts-img/', postdata ).subscribe((data) => {
                  this.post_image = data;
                  console.log(this.post_image);
                });
              }
              this.http.get(`http://127.0.0.1:8000/ProjectMember/?post_id=&user_id=${this.member_id}&active=`).subscribe((data:any = [{}]) => {
                if(data.length > 0){
                  this.other_check_post = true;
                  for(var i = 0; i<data.length; i++) {
                    this.other_post_ids += data[i].post_id;
                    this.other_post_ids += ',';
                  }
                  var postdata = {
                    sorted_post_id: this.other_post_ids,
                  }
                  this.http.post('http://127.0.0.1:8000/sorted-posts-img/', postdata ).subscribe((data) => {
                    this.other_post_image = data;
                    console.log(this.other_post_image); 
                  });
                }
              });
            });

          });
        });
      }
    });
    
  }

  settings() {
    this.presentActionSheet();
  }
    
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Saved posts',
        icon: 'bookmark-outline',
        handler: () => {
          console.log("Saved clicked");
          this.router.navigate([`user/profile/saved/${this.member_id}`]);
        }
      }, {
        text: 'Edit Profile',
        icon: 'create-outline',
        handler: () => {
          console.log('Edit Profile clicked');
          this.router.navigate([`user/profilee/edit-profile/${this.member_id}`]);
        }
      }, {
        text: 'About App',
        icon: 'list-outline',
        handler: () => {
          console.log('About App clicked');
          this.router.navigate(['about-app/user']);
        }
      }, {
        text: 'T & C',
        icon: 'receipt-outline',
        handler: () => {
          console.log('T & C clicked');
          this.router.navigate(['t-and-c/user']);
        }
      }, {
        text: 'Help',
        icon: 'alert-outline',
        handler: () => {
          console.log('Help clicked');
          this.router.navigate(['help/user']);
        }
      }, {
        text: 'Log out',
        icon: 'log-out-outline',
        handler: () => {
          console.log('Log out clicked');
          this.auth.logout();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  
  }

  
  RequestJoin() {
    this.presentAlertConfirm();
  }

  
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmation',
      message: '<strong>Are you sure you wan to Send a Request asking him to join and be apart of this project</strong> ??',
      buttons: [{
        text: 'Send',
        handler: () => {
          console.log("join request clicked");
          var postdata = {
            post_id: this.add_post_id,
            post_title: this.add_post_title,
            user_id: this.member_id,
            user_name: this.user_data.Member_name,
            user_type: "member",
            active: false,
            sent: false,
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
      header: 'Request Sent or recived Already',
      message: 'You already sent a request <strong>Please Wait for the response</strong> or check your notification if he has sent any<strong>Request before you</strong>!!!',
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
      message: '<strong>This Member Already a part of this project</strong>!!',
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

  startChat() {
    console.log("hey");
    this.auth.data.then((value) => {
      console.log(value);
      this.http.get(`http://127.0.0.1:8000/IndividualChatList/?member_id_1=${value[0].id}&member_id_2=${this.user_data.id}`).subscribe( (data:any = [{}] ) => {
        if( data.length > 0) { 
          this.router.navigate([`/user/active-zone/direct-text/${data[0].id}`])
        }
        else {
          this.http.get(`http://127.0.0.1:8000/IndividualChatList/?member_id_1=${this.user_data.id}&member_id_2=${value[0].id}`).subscribe( (data:any = [{}] ) => {
            if( data.length > 0) {
              this.router.navigate([`/user/active-zone/direct-text/${data[0].id}`])
            }
            else {
              var postdata = {
                member_id_1: value[0].id,
                member_name_1: value[0].Member_name,
                member_id_2: this.user_data.id,
                member_name_2: this.user_data.Member_name,
                last_message: '/?#$%^&*(!@#$^?',
              }
              this.http.post('http://127.0.0.1:8000/IndividualChatList/', postdata).subscribe((data:any) => {
                console.log(data);
                this.router.navigate([`/user/active-zone/direct-text/${data.id}`])
              });
            }
          });
        }
      });
    });
  }

  changePage(post_id) {
    this.router.navigate([`/user/homee/${post_id}`])
  }

}
