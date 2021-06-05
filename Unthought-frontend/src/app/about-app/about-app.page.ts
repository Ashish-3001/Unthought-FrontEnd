import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit {

  type:any;

  constructor(
    private router: Router,
    private acitivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.acitivatedRoute.paramMap.subscribe(paraMap => { 
      
      if(!paraMap.has('type')) {
        console.log('error');
        return
      }

      const type = paraMap.get('type');
      this.type = type;
    });

  }

  backtoprofile() {
    this.router.navigate([`/${this.type}//profile`])

  }
}
