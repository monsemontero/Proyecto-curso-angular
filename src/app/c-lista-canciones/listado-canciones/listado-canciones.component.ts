import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaCanciones } from 'src/app/models/lista-canciones.model';
import { ListaCancionesService } from 'src/app/services/lista-canciones.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-listado-canciones',
  templateUrl: './listado-canciones.component.html',
  styleUrls: ['./listado-canciones.component.scss']
})
export class ListadoCancionesComponent implements OnInit {
  canciones: any[] = [];
  columnasaMostrar: string[] = ['id', 'titulo','artista','genero','acciones'];
  id!:number;
  constructor(private servicioCanciones:ListaCancionesService,
    private snackBar:MatSnackBar,
    private dialog: MatDialog ) { }

  ngOnInit(): void {
    // this.servicioCanciones.get().subscribe(response=>{
    //   this.canciones=response;
    // });
    this.cargarCanciones();
  }
  cargarCanciones(){
    this.servicioCanciones.get().subscribe(response=>{
      this.canciones=response;
    });
  }
  borrar(canciones:ListaCanciones){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent,{
      width:'350px',
      data:{
        mensaje:`¿Está segur@ que desea eliminar la canción ${canciones.titulo}?`
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result==='Si'){

        this.servicioCanciones.delete(canciones.id)
        .subscribe((response)=>{
          this.snackBar.open('¡La canción fue eliminada con éxito!','',{
            duration:3000
          });
          this.cargarCanciones();
        })

      }
    });

  }

}
