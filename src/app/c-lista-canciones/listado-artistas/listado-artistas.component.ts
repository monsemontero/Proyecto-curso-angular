import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Artista } from 'src/app/models/artista.model';
import { ListaArtistasService } from 'src/app/services/lista-artistas.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-listado-artistas',
  templateUrl: './listado-artistas.component.html',
  styleUrls: ['./listado-artistas.component.scss']
})
export class ListadoArtistasComponent implements OnInit {
  id!:number;
  artista : any[] = [];
  columnasaMostrar: string[] = ['id', 'artista','genero', 'albunes', 'acciones'];
  constructor(
    private servicioArtistas:ListaArtistasService,
    private router: Router,
    private snackBar:MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }
  cargarCategorias(){
    this.servicioArtistas.get().subscribe(response=>{
      this.artista=response;
    });
  }
  borrar(artista:Artista){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent,{
      width:'350px',
      data:{
        mensaje:`¿Está segur@ que desea eliminar al artista ${artista.nombre}?`
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result==='Si'){

        this.servicioArtistas.delete(artista.id)
        .subscribe((response)=>{
          this.snackBar.open('¡El artista fue eliminada con éxito!','',{
            duration:3000
          });
          this.cargarCategorias();
        })

      }
    });

  }
}
