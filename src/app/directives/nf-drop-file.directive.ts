import { Directive, EventEmitter, ElementRef, 
          HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNfDropFile]'
})
export class NfDropFileDirective {
   
  @Input() archivos:FileItem[]=[];
  @Output() mouseSobre :EventEmitter<boolean> = new EventEmitter();

  constructor() { }


    @HostListener('dragover',['$event'])
    public mouseover ( event:any ){
      
      this.mouseSobre.emit(true);
      this.prevenir(event);
    }
    @HostListener('dragleave',['$event'])
    public mouseleave ( event:any ){
      
      this.mouseSobre.emit(false);

    } 
    @HostListener('drop',['$event'])
    public drop ( event:any ){
      
      const transferencia = this.getTransfer(event);
      
      if (!transferencia){
        return;
      }
      this.extraerArchivos(transferencia.files);
      this.prevenir(event);
      
      this.mouseSobre.emit(false);
    }

    private getTransfer(event:any){
      return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }
    
    private extraerArchivos(archivosLista:FileList){
      console.log(archivosLista);

        for(const propiedad in Object.getOwnPropertyNames(archivosLista)){

          const archivoTemporal = archivosLista[propiedad];
        
        if(this.archivoPuedeSerCargado( archivoTemporal )){

          const nuevoArchivo = new FileItem( archivoTemporal );
          this.archivos.push(nuevoArchivo);
        }

      }
      console.log(this.archivos);
    }
    //validaciones
    private archivoPuedeSerCargado(archivo:File):boolean{
      if( !this.archivoYaFueDroppeado(archivo.name) && this.esImagen(archivo.type)){
        return true;
      }else {
        return false;
      }
    }

    private prevenir ( event ){
      event.preventDefault();
      event.stopPropagation();
    }

    private archivoYaFueDroppeado(nombreArchivo:string ):boolean {

      for(const archivo of this.archivos){
        if(archivo.nombreArchivo === nombreArchivo){
          console.log(`${nombreArchivo} Ya existe`);
          return true;
        }
      }
      return false;
    }

    private esImagen (tipoArchivo:string):boolean{
      return (tipoArchivo === undefined || tipoArchivo === '') ? false : tipoArchivo.startsWith('image');
    }

}
