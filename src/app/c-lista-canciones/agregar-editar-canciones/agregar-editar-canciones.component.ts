import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaCanciones } from 'src/app/models/lista-canciones.model';
import { ListaCancionesService } from 'src/app/services/lista-canciones.service';

@Component({
  selector: 'app-agregar-editar-canciones',
  templateUrl: './agregar-editar-canciones.component.html',
  styleUrls: ['./agregar-editar-canciones.component.scss']
})
export class AgregarEditarCancionesComponent implements OnInit {
  formulario!:FormGroup;
  id!:number;
  constructor(
    private fb:FormBuilder,
    private router: Router,
    private servicioCanciones: ListaCancionesService,
    private snackBar:MatSnackBar,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formulario= this.fb.group({
      titulo:['', [Validators.required,Validators.minLength(5)]],
      artista:['', [Validators.required,Validators.minLength(5)]],
      genero:['', [Validators.required,Validators.minLength(5)]]
    });
    this.id = this.activatedRoute.snapshot.params['id'] ?
                +this.activatedRoute.snapshot.params['id'] : 0 ;
                
      if(this.id!==0){
        this.llenarDatosCanciones(this.id);
      }
  }
  llenarDatosCanciones(id:number){
    this.servicioCanciones.getById(id)
          .subscribe((canciones:ListaCanciones)=>{
            this.formulario.patchValue({
              ...canciones
            })
      });
  }
  guardar(){
    const canciones: ListaCanciones={
      ...this.formulario.value
    };
    if (this.id===0){
      this.agregar(canciones);
    }else{
      this.actualizar(canciones);
    }
  }
  agregar(canciones:ListaCanciones){
    this.servicioCanciones.save(canciones).subscribe(response=>{
      console.log('se ha agregado mi cancion');
      this.router.navigate(['/canciones']);
    })
  }
  actualizar(canciones:ListaCanciones){
    this.servicioCanciones
      .update(this.id,canciones).subscribe((response:any)=>{
        this.snackBar.open('La cancion se actualizo exitosamente','',{
          duration:3000
        });
        this.router.navigate(['/canciones']);
    })
    this.router.navigate(['/canciones']);
  }

}
