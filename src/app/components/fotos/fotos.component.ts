import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Item { nombre: string, url: string, date:string}
@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  private itemCollection:AngularFirestoreCollection<any>
  imagenes: Observable<Item[]>;
  constructor(private afs: AngularFirestore) {
    this.itemCollection = afs.collection<Item>('img');
  this.imagenes = this.itemCollection.valueChanges();

    
  }

  ngOnInit(): void {  console.log(this.imagenes);
  }

}
