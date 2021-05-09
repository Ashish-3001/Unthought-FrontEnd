import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  eventDetails: any = {};
  eventImage1: any;
  eventImage2: any;
  eventImage3: any;

  constructor(
    private http: HttpClient,
    private acitivatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {

    this.acitivatedRoute.paramMap.subscribe(paraMap => {
      
      if(!paraMap.has('event_id')) {
        console.log('error');
        return
      }
      const event_id = paraMap.get('event_id');

      this.http.get(`http://127.0.0.1:8000/Events/${event_id}/`).subscribe((data) => {
        this.eventDetails = data;
        this.http.get(`http://127.0.0.1:8000/EventsPics/?event_id=${event_id}`).subscribe((data) => {
          this.eventImage1 = data[0].event_dp;
          this.eventImage2 = data[0].event_pic1;
          this.eventImage3 = data[0].event_pic2;
        });
      });
    });

  }

}
