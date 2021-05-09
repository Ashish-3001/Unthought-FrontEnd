import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class MemberProfilePage implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  logOut() {
    this.auth.logout();
  }
}
