import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class MemberPostPage implements OnInit {

  user_data: any = {};
  sortedData: any = [];
  sortFilter: string = 'date';
  searchToggle: boolean = false;
  sortedData_img: object = {};

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router,
    ) {}

  ngOnInit() {

    this.auth.data.then((value) => {
      this.user_data = value;
      this.search(this.sortFilter);
    });

  }
  
  search(sort_type: string) {
    var postdata = {
      'pri_specification_submain': this.user_data[0].pri_specification_submain,
      'sec_specification_submain': this.user_data[0].sec_specification_submain,
      'sort_filter': sort_type,
    }
    this.http.post('http://127.0.0.1:8000/events_near_you/', postdata).subscribe((data:any) => {
      console.log(data);
      this.sortedData = data;
      for(var i = 0; i < data.length ; i++) {
        this.sortedData_img[data[i].pk] = 'http://127.0.0.1:8000/media/' + data[i].fields.event_dp;
      }
    });
  }

  changePage(event_id:any) {
    console.log(event_id);
    this.router.navigate([`/user/events/${event_id}`])
  }
}
