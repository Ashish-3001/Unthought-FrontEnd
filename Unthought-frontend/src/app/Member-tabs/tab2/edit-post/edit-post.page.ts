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

  primary_toggle: boolean = false;
  selected: any;
  primary2_toggle: boolean = false;
  selected2: any;
  primary3_toggle: boolean = false;
  selected3:any;
  primary4_toggle:boolean = false;
  selected4:any;
  

  imageStringDp: string = undefined;
  imageStringDp_toggle: boolean = false;
  imageString1: string = undefined;
  imageString1_toggle: boolean = false;
  imageString2: string = undefined;
  imageString2_toggle: boolean = false;

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private acitivatedRoute: ActivatedRoute,
    private auth: AuthenticationService,
    ) { }

  ngOnInit() {

    this.acitivatedRoute.paramMap.subscribe(paraMap => {

      if(!paraMap.has('post_id')) {
        console.log('error');
        return
      }

      
      const post_id = paraMap.get('post_id');

      this.auth.data.then((value) => {
        this.user_data = value;
        this.http.get(`http://127.0.0.1:8000/Post/${post_id}`).subscribe((data:any) => {
          this.curent_data = data;
          this.new_post["admin_id"] = data.admin_id;
          this.new_post["admin_name"] = data.admin_name;
          this.new_post["admin_designation"] = data.admin_designation;
          this.selected = data.requirement1;
        });
      });
    });
  }

}
