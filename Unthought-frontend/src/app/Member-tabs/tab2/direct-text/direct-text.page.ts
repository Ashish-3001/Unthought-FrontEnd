import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-direct-text',
  templateUrl: './direct-text.page.html',
  styleUrls: ['./direct-text.page.scss'],
})
export class DirectTextPage implements OnInit {

  user_data:any;
  member_id: any;
  chatMembers: any;
  chatMembers_ids:string = '';
  chatMembersDp: object = {};

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.http.get(`http://127.0.0.1:8000/empty_chat_delete/`).subscribe((data) => {
      console.log(data);
    });
    this.auth.data.then((value) => {
      this.user_data = value;
      this.member_id = this.user_data[0].id;

      var postdata = {
        'member_id':this.member_id,
      }
      this.http.post('http://127.0.0.1:8000/individual_chat_list/', postdata).subscribe( (data) => {
        this.chatMembers = data;
        console.log(this.chatMembers);
        for(var i = 0; i<this.chatMembers.length; i++) {
          if(this.chatMembers[i].fields.member_id_1 == this.member_id) {
            this.chatMembers_ids += this.chatMembers[i].fields.member_id_2;
            this.chatMembers_ids += ',';
          }
          else {
            this.chatMembers_ids += this.chatMembers[i].fields.member_id_1;
            this.chatMembers_ids += ',';
          }
        }
        var postdata_member_img = {
          sorted_post_id: this.chatMembers_ids,
        }
        this.http.post('http://127.0.0.1:8000/sorted-people-img/', postdata_member_img ).subscribe( (data:any = [{}]) => {
          console.log(data);
          for(var i = 0; i < data.length ; i++) {
            this.chatMembersDp[data[i].fields.member_id] = 'http://127.0.0.1:8000/media/' + data[i].fields.member_dp;
          }
        })
      });
    });

  }

  ionViewWillEnter(){
   this.ngOnInit();
  }
  changePage(connect_id) {
    this.router.navigate([`/user/active-zone/direct-text/${connect_id}`])
  }

  ionViewWillLeave(){
    this.user_data = undefined;
    this.member_id = undefined;
    this.chatMembers = undefined;
    this.chatMembers_ids= '';
    this.chatMembersDp = {};
  }
  
}
