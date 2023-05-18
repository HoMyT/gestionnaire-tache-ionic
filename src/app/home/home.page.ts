import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm!: FormGroup;
  showPassword : boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void{}


  connexion(){
    this.router.navigateByUrl('connexion');
  }
  inscription(){
    this.router.navigateByUrl('inscription');
  }

}
