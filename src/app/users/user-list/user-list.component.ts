import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-userlist',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserlistComponent implements OnInit {

  users: any[] = []

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private api: ApiService) {  }

  getAllUsers() {
    return this.api.getUserlist(this.page -1, this.pageSize).subscribe((response) => {
      console.log(response);
      response.content.forEach((value)=> {
        let ruoli: string = ""
        value.roles.forEach((val)=> {
          ruoli += val.roleName
        })
    value.roles = ruoli
  })
    this.users = response.content;
    this.collectionSize = response.totalElements;
  })
}
selectPage(page: string) {
  this.page = parseInt(page, this.pageSize|| 1);
  this.getAllUsers();
}

formatInput(input: HTMLInputElement) {
  input.value = input.value.replace(FILTER_PAG_REGEX, '');
}


ngOnInit(): void {
  this.getAllUsers()
}

}
