import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  form: FormGroup;
  slide_no: number = 1;
  curent_data: object = {};

  user_data:any;
  new_post: object = {};
  
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private acitivatedRoute: ActivatedRoute,
    private auth: AuthenticationService,
    ) { }

  ngOnInit() {
    
  }

}
