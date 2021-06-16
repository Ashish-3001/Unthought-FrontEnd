import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  user_data: any = {};
  saved_posts_ids: string = "";
  saved_posts: any =[];
  post_img:string = '';
  post_admin_img:string = '';
  image_dict: object = {};
  dp_image_dict: object = {};
  liked_post = [];

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.auth.data.then((value) => {
      this.user_data = value;
      console.log(this.user_data[0].User_id);

      this.http.get(`http://127.0.0.1:8000/SavePostMember/?post_id=&member_id=${this.user_data[0].id}&saved=true`).subscribe( (data:any = [{}]) => {
        var n: number = data.length;
        for(var i =0; i< n; i++) {
          this.saved_posts_ids += data[i].post_id.toString();
          this.saved_posts_ids += ',';
          }

          var postdata = {
            sorted_post_id: this.saved_posts_ids,
          }
          this.http.post('http://127.0.0.1:8000/saved-posts/', postdata).subscribe( (data:any) => {
            this.saved_posts = data;
            console.log(data);
            for(var i =0; i< this.saved_posts.length; i++) {
              this.post_img += this.saved_posts[i].pk.toString();
              this.post_img += ',';
              this.post_admin_img += this.saved_posts[i].fields.admin_id.toString();
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

          });

          this.http.get(`http://127.0.0.1:8000/LikedPostMember/?post_id=&member_id=${this.user_data[0].id}&liked=true`).subscribe( (data:any = [{}]) => {
            for(var i = 0; i < data.length ; i++) {
              this.liked_post.push(data[i].post_id);
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

  unsaved(post_id,i) {
    var postdata = {
      'post_id': post_id,
      'member_id': this.user_data[0].id,
      'action': 'unsaved',
    }
    this.http.post('http://127.0.0.1:8000/sorted-posts-liked/', postdata).subscribe( (data:any) => {
      const index = this.saved_posts.indexOf(this.saved_posts[i]);
      console.log(index);
      if(index > -1) {       
        this.saved_posts.splice(index,1);
      }
    });
  }
  
}
