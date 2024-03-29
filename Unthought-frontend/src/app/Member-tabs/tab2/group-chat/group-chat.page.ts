import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, IonContent } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.page.html',
  styleUrls: ['./group-chat.page.scss'],
})
export class GroupChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  limit:number=0;
  start_limit:number=0;
  user_data:any = [{}];
  post_id:any
  admin: boolean = false;

  postMembers:any;

  socket: any;
  endpoint:any;
  newmsg:string;
  SERVER_URL = "ws://127.0.0.1:8000/ws/chat/";
  message:any; /*= [
    {
      'member_name': "ashish cvnn",
      'createdAt': 1554090856000,
      'message': "hello",
    },
    {
      'member_name': "hrishi",
      'createdAt': 1554090956000,
      'message': "hi,how are you !!",
    },
    {
      'member_name': "ayesha",
      'createdAt': 1554091056000,
      'message': "hello ashish, sup?",
    },
    {
      'member_name': "ashish cvnn",
      'createdAt': 1554091156000,
      'message': "just texted to ask about the project??",
    },
  ];*/
  
  

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private acitivatedRoute: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    ) { 
      this.acitivatedRoute.paramMap.subscribe(paraMap => {
        this.auth.data.then((value) => {
          this.user_data = value;
          console.log(value);
          if(!paraMap.has('post_id')) {
            console.log('error');
            return
          }
  
          const post_id = paraMap.get('post_id');
          this.post_id = post_id;

          
          this.http.get(`http://127.0.0.1:8000/Post/${this.post_id}/`).subscribe( (data:any) => {
            if(this.user_data[0].id == data.admin_id) {
              this.admin = true;
            }
          });

          this.getTexts(30);
          this.getEndpoint(post_id);
          this.createSocket();
        });
      });
    }

  ngOnInit() {
    
  }

  ionViewDidLeave() {
    this.message = undefined;
    this.limit = 0;
    this.start_limit = 0;
  }

  getEndpoint(post_id:any) {

    let wsStart = "ws://"
    if (window.location.protocol == "https:") {
      wsStart = 'wss://'
    }
    this.endpoint = this.SERVER_URL + post_id +'/';
    return this.endpoint;

  }

  createSocket() {
    this.socket = new WebSocket(this.endpoint);
    console.log("endpoint: ", this.endpoint);

    this.socket.onopen = (e) => {
      console.log("open", e);
    }

    this.socket.onmessage = (e) => {
      let chatDataMsg = JSON.parse(e.data);
      console.log(chatDataMsg); 

      if(this.message == undefined) {
        this.message = [ {
          'sender_name': chatDataMsg.sender_name,
          'createdAt': chatDataMsg.createdAt,
          'message': chatDataMsg.message, 
        },]
      }
      else {
        this.message.push({
          'sender_name': chatDataMsg.sender_name,
          'createdAt': chatDataMsg.createdAt,
          'message': chatDataMsg.message,
        });
      }
      
      setTimeout( () => {
        this.content.scrollToBottom(100);
      });
    }

    this.socket.onerror = (e) => {
      console.log("error", e);
    }

    this.socket.onclose = (e) => {
      console.log("close", e);
    }
  }

  sendback() {

    this.socket.send((JSON.stringify({
      'post_id': this.post_id,
      'member_id': this.user_data[0].id,
      'member_name': this.user_data[0].Member_name, 
      'message': this.newmsg,
    })));

    this.newmsg = '';

  }

  getTexts(quantity) {
    this.limit = this.start_limit + quantity;
    console.log(this.start_limit);
    console.log(this.limit);
    var postdata_getTexts = {
      item_id: this.post_id,
      reciver_id: 0,
      type: 'group',
      limit: this.limit,
      start_limit: this.start_limit,
    }
    this.http.post('http://127.0.0.1:8000/get_texts/', postdata_getTexts).subscribe( (data:any) => {      
      if(data[0]) {
        this.start_limit = this.start_limit + data.length;
        var demo:any = data.reverse();
        Array.prototype.push.apply(demo,this.message);
        if(this.message == undefined) {
          this.message = demo;
          setTimeout( () => {
            this.content.scrollToBottom();
          });
        }
        else {
          this.message = demo;
        }
      }
      else {
        return
      }
    });
  }

  onPullOldMessages(event) {
    console.log("load");
    this.getTexts(5);
    event.target.complete();
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
