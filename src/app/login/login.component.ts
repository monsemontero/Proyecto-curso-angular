import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formulario!:FormGroup;
  constructor(
    private authService:AuthService,
    private router:Router,
    private fb:FormBuilder,) { }

  ngOnInit(): void {
    this.formulario= this.fb.group({
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(4)]],
    });
  }
  login(){
    this.authService
    .login(this.formulario.value)
    .subscribe(response=>{
      this.router.navigate(['/canciones'])
      });
      //this.router.navigate(['/login'])
    }
    getControlFormulario = (valor:string) => this.formulario.get(valor);
    get email(){
      return this.getControlFormulario('email');
    }
  
    get password(){
      return this.getControlFormulario('password');
    }

}
