import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
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

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private acitivatedRoute: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController,
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
          this.http.get(`http://127.0.0.1:8000/ProjectMember/?post_id=&user_id=${this.member_id}&active=`).subscribe((data:any = [{}]) => {
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
        const member_id = paraMap.get('member_id');
        this.member_id = member_id;
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
          this.router.navigate([`user/profile/edit-profile/${this.member_id}`]);
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

  changePage(post_id) {
    this.router.navigate([`/user/homee/${post_id}`])
  }

}
