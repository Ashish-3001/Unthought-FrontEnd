import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core'
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

const { Camera } = Plugins;

//**dataURL to blob**


function blobToFile(theBlob: Blob, fileName:string){
  var b: any = theBlob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  //Cast to a File() type
  return <File>theBlob;
}

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>();
  
  selectedImage: string;
  
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  async  onPickImage() {
    if(!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    await Camera.getPhoto({
      quality:100,
      source: CameraSource.Prompt,
      correctOrientation: true,
      allowEditing: false,
      height: 300,
      width:200,
      resultType: CameraResultType.DataUrl
    }).then ((image) => {
      this.selectedImage = image.dataUrl.toString();
      this.imagePick.emit(this.selectedImage);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
  }
  
}
