import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class MemberActiveZonePage {

  user_data:any;
  member_id: any;
  check_post:boolean = false;
  post_ids:string = '';
  post_image:any;
  other_check_post:boolean = false;
  other_post_ids:string = '';
  other_post_image:any;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.auth.data.then((value) => {
      this.user_data = value;
      this.member_id = this.user_data[0].id;

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

  changePage(post_id) {
    this.router.navigate([`/user/active-zone/group-chat/${post_id}`])
  }
}
