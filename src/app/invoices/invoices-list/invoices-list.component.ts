import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ApiService } from 'src/app/service/api.service';


const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit {

  invoices:any [] =[]
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(private api: ApiService, private router: Router) { }
  getAllInvoices() {
    return this.api.getInvoicesList(this.page -1, this.pageSize).subscribe((response) => {
      console.log(response);
      this.invoices = response.content;
      this.collectionSize = response.totalElements;
    })
  }
  selectPage(page:string) {
    this.page = parseInt(page, this.pageSize || 1);
    this.getAllInvoices()
  }
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
  viewInvoiceDetail(id:any){
    this.router.navigate(['invoices/',id])
  }
  elimina(id){
    if(confirm('sei sicuro di voler cancellare')){
      this.api.deleteInvoice(id).subscribe((data)=>{
        console.log(data);
        let index = this.invoices.findIndex((value)=>{
          return value.id === id
        })
        if(index != -1) {
          this.invoices.splice(index, 1)
        }
      })
    }
  }
  ngOnInit(): void {
    this.getAllInvoices()
  }

}
