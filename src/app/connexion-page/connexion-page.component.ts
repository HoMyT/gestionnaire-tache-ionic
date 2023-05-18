import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/core/service/auth-user.service';

@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrls: ['./connexion-page.component.scss'],
})
export class ConnexionPageComponent  implements OnInit {
  connexionUser!: FormGroup;

  showPassword: boolean = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthUserService) { }

  ngOnInit() {
    this.connexionUser = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(){
    if (this.connexionUser.valid) {
      const user = {
        email: this.connexionUser.value.email,
        password: this.connexionUser.value.password
      };

      this.auth.connexionUser(user.email, user.password).subscribe(data => {
        alert(data.message)
      }, err => {
        alert(err.message)
      })
    }
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
}
