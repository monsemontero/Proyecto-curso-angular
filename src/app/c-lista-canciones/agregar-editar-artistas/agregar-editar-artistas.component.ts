import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Artista } from 'src/app/models/artista.model';
import { ListaArtistasService } from 'src/app/services/lista-artistas.service';

@Component({
  selector: 'app-agregar-editar-artistas',
  templateUrl: './agregar-editar-artistas.component.html',
  styleUrls: ['./agregar-editar-artistas.component.scss']
})
export class AgregarEditarArtistasComponent implements OnInit {
  formulario!:FormGroup;
  id!:number;
  constructor(
    private fb:FormBuilder,
    private servicioArtistas:ListaArtistasService,
    private router: Router,
    private snackBar:MatSnackBar,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['',  [Validators.required,Validators.minLength(5),Validators.maxLength(100)]  ],
      genero:['', [Validators.required,Validators.minLength(5)]] ,
      albunes:['', [Validators.required]],
    });
    this.id = this.activatedRoute.snapshot.params['id'] ?
              +this.activatedRoute.snapshot.params['id'] : 0 ;
              
    if(this.id!==0){
      this.llenarDatosArtista(this.id);
    }
  }
  llenarDatosArtista(id:number){
    this.servicioArtistas.getById(id)
        .subscribe((artista:Artista)=>{
          this.formulario.patchValue({
            ...artista
          })
    });
  }
  guardar(){
    const artista: Artista={
      ...this.formulario.value
    };
    if(this.id===0){
      this.agregar(artista);
    }else{
      this.actualizar(artista);
    }
  }
  agregar(artista:Artista){
    this.servicioArtistas.save(artista).subscribe(response=>{
      this.snackBar.open('El artista fue agregada exitosamente','',{
        duration:3000
      })
      this.router.navigate(['/artistas']);
    })
  }
  actualizar(artista:Artista){
    this.servicioArtistas
    .update(this.id, artista).subscribe((response:any)=>{
        this.snackBar.open('Los datos del artista se actualizaron exitosamente','',{
          duration:3000
        });
        this.router.navigate(['/artistas']);
    })
    this.router.navigate(['/artistas']);
  }

  getControlFormulario=(valor:string)=>this.formulario.get(valor);

  get nombre(){
    return this.getControlFormulario('nombre');
  }
  get genero(){
    return this.getControlFormulario('genero');
  }
  get albunes(){
    return this.getControlFormulario('albunes');
  }
}
