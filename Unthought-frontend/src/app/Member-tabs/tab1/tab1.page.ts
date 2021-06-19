import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class MemberHomePage {

  user_data: any = {};
  searchToggle: boolean = false;
  sortedData: any = [];
  post_img:string = '';
  post_admin_img:string = '';
  image_dict: object = {};
  dp_image_dict: object = {};
  liked_post = [];
  saved_post = [];
  image:any;
  instrested_people: any = [];
  instrested_member_img: string ='';
  instrested_people_img_dict: object = {};
  trending_projects: any = [];


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.auth.data.then((value) => {
      this.user_data = value;
      var postdata = {
        pri_specification_submain: this.user_data[0].pri_specification_submain,
        sec_specification_submain: this.user_data[0].sec_specification_submain,
        pri_specification_main: this.user_data[0].pri_specification_main,
        sec_specification_main: this.user_data[0].sec_specification_main,
      }
      console.log(postdata);
      this.http.post('http://127.0.0.1:8000/sorted-posts/', postdata).subscribe( (data:any) => {
        this.sortedData = data;
        console.log(data);
        for(var i =0; i< this.sortedData.length; i++) {
          this.post_img += this.sortedData[i].pk.toString();
          this.post_img += ',';
          this.post_admin_img += this.sortedData[i].fields.admin_id.toString();
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
          this.http.get('http://127.0.0.1:8000/Trending_post/').subscribe((data) => {
            var postdata_img1 = {
              sorted_post_id: data.toString().split("").toString()+",",
            }
            this.http.post('http://127.0.0.1:8000/sorted-posts-img/', postdata_img1 ).subscribe( (data:any = [{}]) => {  
              this.trending_projects = data;
              console.log(this.trending_projects);
            })
          })
        })
      })

      var postdata_people = {
        pri_specification_submain: this.user_data[0].pri_specification_submain,
        sec_specification_submain: this.user_data[0].sec_specification_submain,
      }
      this.http.post('http://127.0.0.1:8000/People_interested/', postdata_people).subscribe( (data:any) => {
        console.log(data);
        this.instrested_people = data;
        for(var i = 0; i < this.instrested_people.length; i++) {
          this.instrested_member_img += this.instrested_people[i].pk.toString();
          this.instrested_member_img += ',';
        }
        var postdata_people_img  = {
          sorted_post_id: this.instrested_member_img, 
        }
        this.http.post('http://127.0.0.1:8000/sorted-people-img/', postdata_people_img ).subscribe( (data:any = [{}]) => {
          console.log(data);
          for(var i = 0; i < data.length ; i++) {
            this.instrested_people_img_dict[data[i].fields.member_id] = 'http://127.0.0.1:8000/media/' + data[i].fields.member_dp;
          }
          console.log(this.instrested_people_img_dict);
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
      })
    })
  }

  ionViewWillEnter(){
    this.searchToggle = false;
    this.sortedData = [];
    this.post_img = '';
    this.post_admin_img = '';
    this.image_dict = {};
    this.dp_image_dict = {};
    this.liked_post = [];
    this.saved_post = [];
    this.instrested_people = [];
    this.instrested_member_img ='';
    this.instrested_people_img_dict = {};
    this.trending_projects = [];
    this.ngOnInit();
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
  

  search(type: boolean) {
    this.searchToggle = type;
  }

  chagepage(id) {
    this.router.navigate([`user/profilee/${id}`])
  }

  chagepagetrending(id) {
    this.router.navigate([`user/homee/${id}`])
  }
}
