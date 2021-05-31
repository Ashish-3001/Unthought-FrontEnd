import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-t-and-c',
  templateUrl: './t-and-c.page.html',
  styleUrls: ['./t-and-c.page.scss'],
})
export class TAndCPage implements OnInit {
  
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
