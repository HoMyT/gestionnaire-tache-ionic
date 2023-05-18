import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/core/service/auth-user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent  implements OnInit {
  inscriptionUser!: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthUserService, private router: Router) { }

  ngOnInit(): void {
    this.inscriptionUser = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
      name: [null, Validators.required],
      last_name: [null, Validators.required]
    });

    // console.log(this.inscriptionUser.valid)
  }
  onSubmit(){
    console.log(this.inscriptionUser.valid)
    const user = {
      email: this.inscriptionUser.value.email,
      password: this.inscriptionUser.value.password,
      confirmPassword: this.inscriptionUser.value.confirmPassword,
      name: this.inscriptionUser.value.name,
      last_name: this.inscriptionUser.value.last_name
    };

    if (this.inscriptionUser.valid && user.password == user.confirmPassword) {
      this.auth.inscriptionUser(user.email, user.password, user.name, user.last_name).subscribe(data => {
        alert(data.message);
        this.router.navigateByUrl('connexion')
      }, err => {
        alert(err.message)
      })
    }
  }
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
}
