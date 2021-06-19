import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';


const TOKEN_KEY = 'auth-token';
const DATA_KEY = 'n';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  otp_verification = new BehaviorSubject("0000");
  
  imageFile: Blob;
  
  constructor(
    private storage: Storage,
    private platform: Platform,
    private router: Router,
    private http:HttpClient,
    private navController:NavController
    )
  {
    
  } 

  login(type:string, user_id: number) {
    if(type == 'member'){
      this.http.get(`http://127.0.0.1:8000/Member/?User_id=${user_id}`).subscribe( (data) =>{
        this.storage.set(DATA_KEY, data ).then(res => {
          this.router.navigate(['/user/home']);
          });
      });
    }
    else if(type == 'mentor') {
      return
    }
    this.storage.set(TOKEN_KEY, type ).then(res => {
      this.authenticationState.next(true);
    });
    this.menu();
  }

  logout() {
    this.router.navigate(['login']);
    this.storage.remove(DATA_KEY);
    return this.storage.remove(TOKEN_KEY).then(res => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  check() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res == 'member') {
        this.authenticationState.next(true);
        this.router.navigate(['user']);
      }
      else if (res == 'mentor') {
        this.authenticationState.next(true);
        this.router.navigate(['/mentor-tabs/mentor-home']);
        this.navController.navigateRoot(['/mentor-tabs/mentor-home']);
      }
      else {
        this.router.navigate(['login']);
      }
    });
  }

  menu() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res == 'member') {
        return res;
      }
      else if (res == 'mentor') {
        return res;
      }
    });
  }

  get data() {
    return this.storage.get(DATA_KEY).then(res => {
      return res;
    });
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ia], {type:mimeString});
  }

  onImagePicked(imageData:string) {
    if(typeof imageData === 'string' ) {
      try {
        this.imageFile = this.dataURItoBlob(imageData);
        
        return this.imageFile;
      } catch(error) {
        console.log(error);
        return;
      }
     }
     else {
       console.log("error in reciving the string");
     }
  }
}
