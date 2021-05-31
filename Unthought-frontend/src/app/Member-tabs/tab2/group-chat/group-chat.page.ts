import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
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

}
