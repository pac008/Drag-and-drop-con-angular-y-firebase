import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';
@Injectable({
  providedIn: 'root'
})
export class CargaimagenesService {
  
  private carpeta_imagen ='img';
  constructor( private db:AngularFirestore) { }


  cargarImagenFirebase(imagenes:FileItem[]){

   const storageRef = firebase.storage().ref();
    
       for (const item of imagenes){
      item.estaSubiendo = true;

      if(item.progreso >= 100){
        continue;                                                          
      }
      const refChild = storageRef.child(`${this.carpeta_imagen}/${item.nombreArchivo}`);
      const uploadTask: firebase.storage.UploadTask = 
            storageRef.child(`${this.carpeta_imagen}/${item.nombreArchivo}`)
                      .put(item.archivo);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
              ( snapshop: firebase.storage.UploadTaskSnapshot ) =>
               item.progreso = ( snapshop.bytesTransferred / snapshop.totalBytes ) *100,
              (error) => console.error('error al subir', error),
              () => {
                
               refChild.getDownloadURL().then ( (ref) => {
                console.log('Imagen guardada');

                item.url = ref;
                item.estaSubiendo = false;
                this.guardarimagen({
                  nombre:item.nombreArchivo,
                  url:item.url,
                  date:new Date().toDateString()
                });



               }).catch( (error) => {
                 console.log(error);
               })
                


              });
              
              
   }

  }

  private guardarimagen(imagen: {nombre:string, url:string, date:string} ) {
  
    this.db.collection(`/${this.carpeta_imagen}`)
              .add(imagen);
  }

}
