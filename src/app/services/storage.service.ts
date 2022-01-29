import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  storageRef = firebase.app().storage().ref();
  constructor(private storage: AngularFireStorage) { }

  async uploadImage(name: string, imgBase64: any){
    try{
      let response = await this.storageRef.child("upload/"+name).putString(imgBase64, 'data_url');

      return await response.ref.getDownloadURL();
    } catch(err) {
      console.log(err);
      return null;
    }
    

  }
}
