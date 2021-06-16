import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  type: any;
  user_data: any = {};
  test:any ="";
  search_state:boolean = false;
  searchData: any = [];
  post_img:string = '';
  post_admin_img:string = '';
  post_member_img: string = '';
  image_dict: object = {};
  dp_image_dict: object = {};
  liked_post = [];
  saved_post = [];
  adding_members: boolean = false;
  adding_post:any;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private acitivatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {

    this.acitivatedRoute.paramMap.subscribe(paraMap => { 

        if(!paraMap.has('for')) {
          console.log('error');
          return
        }
        if(paraMap.has('add')) {
          this.adding_members = true;
          const id = paraMap.get('add');
          this.adding_post = id;
        }
        const type = paraMap.get('for');
        this.type = type;
        this.auth.data.then((value) => {
          this.user_data = value;
        });
    });
  }
 
  searchEnter() {
    this.search_state=false
    console.log(this.test);
    if(this.type == 'project') {
      if(this.test != "") {
        this.http.get(`http://127.0.0.1:8000/Post/?search=${this.test}`).subscribe( (searchdata:any = [{}]) => {
          var n: number = searchdata.length;
          if(n > 0) {
            this.searchData = searchdata;
            console.log(this.searchData);

            for(var i =0; i< n; i++) {
              this.post_img += this.searchData[i].id.toString();
              this.post_img += ',';
              this.post_admin_img += this.searchData[i].admin_id.toString();
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
            console.log(postdata_admin_img);
            this.http.post('http://127.0.0.1:8000/sorted-people-img/', postdata_admin_img ).subscribe( (data:any = [{}]) => {
              console.log(data);
              for(var i = 0; i < data.length ; i++) {
                this.dp_image_dict[data[i].fields.member_id] = 'http://127.0.0.1:8000/media/' + data[i].fields.member_dp;
              }
              console.log(this.dp_image_dict);
            })

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

          }
          else {
            this.searchData = [];
            this.presentAlertSorry();
          }
        }, (error) => {
          console.log("couldn't search try again");
          this.searchData = [];
          this.presentAlertSorry();
        });
      }
      else {
        this.searchData = [];
        this.presentAlertSorry();
      }
    }

    else if(this.type == 'members') {
      if(this.test != "") {
        this.http.get(`http://127.0.0.1:8000/Member/?search=${this.test}`).subscribe( (searchdata:any = [{}]) => {
          var n: number = searchdata.length;
          if(n > 0) {
            this.searchData = searchdata;
            console.log(this.searchData);

            for(var i =0; i< n; i++) {
              this.post_member_img += this.searchData[i].id.toString();
              this.post_member_img += ',';
            }

            var postdata_member_img = {
              sorted_post_id: this.post_member_img,
            }
            console.log(postdata_member_img);
            this.http.post('http://127.0.0.1:8000/sorted-people-img/', postdata_member_img ).subscribe( (data:any = [{}]) => {
              console.log(data);
              for(var i = 0; i < data.length ; i++) {
                this.dp_image_dict[data[i].fields.member_id] = 'http://127.0.0.1:8000/media/' + data[i].fields.member_dp;
              }
              console.log(this.dp_image_dict);
            })

          }
          else {
            this.searchData = [];
            this.presentAlertSorry();
          }
        }, (error) => {
          console.log("couldn't search try again");
          this.searchData = [];
          this.presentAlertSorry();
        });
      }
      else {
        this.searchData = [];
        this.presentAlertSorry();
      }
    }

    else if(this.type == 'mentors') {
      console.log("MEntor has to be done");
    }

    else {
      console.log("wrong URL can't search for that");
    }

  }

  async presentAlertSorry() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom',
      header: 'Try Again',
      message: 'Serach details not avaiable OR Something went wrong. <strong>Please Try Again</strong>!!!',
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

  changePage(item_id:any) {
    
    if(this.type == 'members') {
      if(this.adding_members == true) {
        this.router.navigate([`/user/profilee/${item_id}/${this.adding_post}/`])
      }
      else {
        this.router.navigate([`/user/profilee/${item_id}`])
      }
    }
    else if(this.type == 'mentors') {
      console.log("Mentor has to be done");
    }
    else {
      this.router.navigate([`/user/homee/${item_id}`])
    }

  }

}
