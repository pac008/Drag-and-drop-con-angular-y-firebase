import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaimagenesService } from 'src/app/service/cargaimagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {
    estaSobreElemto = false;
    archivos:FileItem[] = [];

  
  constructor( private _cargarImagenes:CargaimagenesService) { }

  ngOnInit(): void {
  }
  cargararchivos(){
    
    this._cargarImagenes.cargarImagenFirebase(this.archivos);
  }

  limpiar(){
    this.archivos = [];
  }
  
}
