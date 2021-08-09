import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiPath = environment.apiPath

    HttpOptions = {
    headers: new HttpHeaders().set('X-TENANT-ID', 'fe_0221')

     }

  constructor(private http: HttpClient, private router: Router) { }
  login(person:any) {
    console.log(person);
    return this.http.post(this.apiPath + 'auth/login', person, this.HttpOptions);
  }

  signup(person:any) {
    return this.http.post(this.apiPath + 'auth/signup', person,  this.HttpOptions);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  get isLogged():boolean{
    if(localStorage.getItem('currentUser')!==null){
      let accessToken = JSON.parse(localStorage.getItem('currentUser')).accessToken;
      return true;
    } else {
      return false;
    }
  }

  get currentUser():any{
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
