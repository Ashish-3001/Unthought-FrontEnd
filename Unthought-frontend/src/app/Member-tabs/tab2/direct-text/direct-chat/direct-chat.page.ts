import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.page.html',
  styleUrls: ['./direct-chat.page.scss'],
})
export class DirectChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  limit:number=0;
  start_limit:number=0;
  user_data:any = [{}];
  reciver_id:any
  connect_id:any;
  socket: any;
  endpoint:any;
  newmsg:string;
  SERVER_URL = "ws://127.0.0.1:8000/ws/chat/";
  message:any;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private acitivatedRoute: ActivatedRoute,
  ) { 
    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      this.auth.data.then((value) => {
        this.user_data = value;

        if(!paraMap.has('connect_id')) {
          console.log('error');
          return
        }

        const connect_id = paraMap.get('connect_id');
        this.connect_id = connect_id;
        this.http.get(`http://127.0.0.1:8000/IndividualChatList/${connect_id}/`).subscribe( (data:any) => {
          if(this.user_data[0].id == data.member_id_1) {
            this.reciver_id = data.member_id_2;
          }
          else {
            this.reciver_id = data.member_id_1;
          }
          console.log(this.reciver_id);
          this.getTexts(30);
          this.getEndpoint(connect_id);
          this.createSocket();
        });  

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

      this.socket.send((JSON.stringify({
        'status': false,
        'my_id': this.user_data[0].id,
        'connect_id': this.connect_id,
        'message': "old chats",
      })));
    }

    this.socket.onmessage = (e) => {
      let chatDataMsg = JSON.parse(e.data);
      console.log(chatDataMsg); 
      if(this.message == undefined) {
        this.message = [{
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

        this.socket.send((JSON.stringify({
          'status': true,
          'my_id': this.user_data[0].id,
          'connect_id': this.connect_id,
          'message': chatDataMsg.message,
        })));
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
      'reciver_id': this.reciver_id,
      'sender_id': this.user_data[0].id,
      'sender_name': this.user_data[0].Member_name, 
      'message': this.newmsg,
    })));

    this.newmsg = '';

  }

  getTexts(quantity) {
    this.limit = this.start_limit + quantity;
    console.log(this.start_limit);
    console.log(this.limit);
    var postdata_getTexts = {
      item_id: this.user_data[0].id,
      reciver_id: this.reciver_id,
      type: 'personal',
      limit: this.limit,
      start_limit: this.start_limit,
    }
    this.http.post('http://127.0.0.1:8000/get_texts/', postdata_getTexts).subscribe( (data:any) => {      
      console.log(data);
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
