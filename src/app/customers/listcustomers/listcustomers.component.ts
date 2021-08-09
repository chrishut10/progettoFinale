import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';


const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-listcustomers',
  templateUrl: './listcustomers.component.html',
  styleUrls: ['./listcustomers.component.css']
})
export class ListcustomersComponent implements OnInit {

  customers:any [] =[]
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(private api: ApiService, private router: Router) { }
  getAllCustomer() {
    return this.api.getCustomersList(this.page -1, this.pageSize).subscribe((response) => {
      console.log(response);
      this.customers = response.content;
      this.collectionSize = response.totalElements;
    })
  }
  selectPage(page:string) {
    this.page = parseInt(page, this.pageSize)|| 1;
    this.getAllCustomer()
  }
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
  goToDetail(id:any){
    this.router.navigate(['customers/', id])
  }
  nuovo(){
    this.router.navigate(['customers/create'])
  }
  goToFatture(id:any){
    this.router.navigate(['/invoices/customers/'+id])
  }
  ngOnInit(): void {
    this.getAllCustomer()
  }

}
