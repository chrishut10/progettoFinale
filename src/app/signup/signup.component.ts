import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  user:any = {
    "username": "",
    "email": "",
    "password": "",
    "role": ["admin"]
  }
  constructor(private auth: AuthService, private route: Router) { }
  register(registerForm) {
    this.auth.signup(registerForm.value).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/login']);
    })
  }
  ngOnInit(): void {
  }

}
