import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.page.html',
  styleUrls: ['./progress-bar.page.scss'],
})
export class ProgressBarPage implements OnInit {

  user_type: any;
  user_data: any = [{}];
  postDetails: any = [];
  postMembers:any;
  postMembers_ids:string = '';
  postMembersDp: object = {};
  post_id:any
  admin: boolean = false;
  prograss_ing: string = '../assets/img/20_percent.jpg';


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private acitivatedRoute: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
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
        
        this.http.get(`http://127.0.0.1:8000/Post/${post_id}/`).subscribe((data) => {
          this.postDetails = data;
          this.postMembers_ids += this.postDetails.admin_id;
          this.postMembers_ids += ',';
          console.log(this.postDetails);
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
          if(this.user_data[0].id == this.postDetails.admin_id) {
            this.admin = true;
          }
        });
      })
    })
  }

  
  changePage(member_id) {
    this.router.navigate([`/user/profilee/${member_id}`])
  }

  options() {
    if(this.admin == true) {
      this.presentActionSheetAdmin();
    }
    else {
      this.presentActionSheetMember();
    }
  }

  async presentActionSheetAdmin() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Add Mentor',
        icon: 'person-add-outline',
        handler: () => {
          console.log("Saved clicked");
        }
      }, {
        text: 'Remove Mentor',
        icon: 'person-remove-outline',
        handler: () => {
          console.log('Edit Profile clicked');
        }
      }, {
        text: 'Add Member',
        icon: 'person-add-outline',
        handler: () => {
          console.log('Edit Profile clicked');
          this.router.navigate([`user/search/members/${this.post_id}`]);
        }
      }, {
        text: 'Remove Member',
        icon: 'person-remove-outline',
        handler: () => {
          this.http.get(`http://127.0.0.1:8000/ProjectMember/?post_id=${this.post_id}&user_id=&active=true`).subscribe( (data:any = [{}]) => {
            this.postMembers = data;
            console.log(this.postMembers);
            this.presentActionSheetRemoveMember();
          });
        }
      }, {
        text: 'Change Admin',
        icon: 'receipt-outline',
        handler: () => {
          this.presentAlertUpdateChangeAdmin();
        }
      }, {
        text: 'Group Media',
        icon: 'images-outline',
        handler: () => {
          console.log('Help clicked');
        }
      }, {
        text: 'Edit Project Details',
        icon: 'create-outline',
        handler: () => {
          console.log('Help clicked');
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

  async presentActionSheetMember() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Group Media',
        icon: 'images-outline',
        handler: () => {
          console.log('Help clicked');
        }
      }, {
        text: 'Exit Group',
        icon: 'exit-outline',
        handler: () => {
          this.presentAlertConfirmExitGroup();
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

  async presentActionSheetRemoveMember () {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons:  this.createButtons(),
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  
  }

  createButtons() {
    let buttons = [];
    for (var index in this.postMembers) {
      let button = {
        text: this.postMembers[index].user_name,
        icon: 'person-remove-outline',
        handler: () => {
          console.log(this.postMembers[index].user_name);
          this.presentAlertConfirm(this.postMembers[index].user_name, this.postMembers[index].id)
          return true;
        }
      }
      buttons.push(button);
    }
    let cancle_button = {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }
    buttons.push(cancle_button);
    return buttons;
  }

  async presentAlertConfirm(username,id) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmation',
      message: `<strong>Are you sure you want to remove ${username}this project</strong> ??`,
      buttons: [{
        text: 'cancel',
        role: 'cancel',
        cssClass: 'alert-button',
      }, {
        text: 'Remove',
        handler: () => {
          console.log("join request clicked");
          this.http.delete(`http://127.0.0.1:8000/ProjectMember/${id}/`).subscribe(() => {
          }, (error) => {
            this.presentAlertSorry();
          });
        }
      }]
    });

    await alert.present();

  }

  async presentAlertConfirmExitGroup() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmation',
      message: `<strong>Are you sure you want to exit this project</strong> ??`,
      buttons: [{
        text: 'cancel',
        role: 'cancel',
        cssClass: 'alert-button',
      }, {
        text: 'Exit',
        handler: () => {
          console.log("join request clicked");
          this.http.get(`http://127.0.0.1:8000/ProjectMember/?post_id=${this.post_id}&user_id=${this.user_data[0].id}&active=true`).subscribe ((data) => {
            var id =  data[0].id;
            this.http.delete(`http://127.0.0.1:8000/ProjectMember/${id}/`).subscribe(() => {
              this.router.navigate(['user/active-zone'])
            }, (error) => {
              this.presentAlertSorry();
            });
          }, (error) => {
            this.presentAlertSorry();
          });
        }
      }]
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

  async presentAlertUpdate() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Sorry',
      message:  'This faeture is start a group Vedio Confrence and will be avaiable Soon <strong>Please wait</strong>!!!',
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

  async presentAlertUpdateChangeAdmin() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Sorry',
      message:  'This faeture to change admin will be avaiable Soon <strong>Please wait and be patient</strong>!!!',
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
