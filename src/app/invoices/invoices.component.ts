// import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/app/service/api.service';


// const FILTER_PAG_REGEX = /[^0-9]/g;
// @Component({
//   selector: 'app-invoices',
//   templateUrl: './invoices.component.html',
//   styleUrls: ['./invoices.component.css']
// })
// export class InvoicesComponent implements OnInit {

//   invoices:any [] =[]
//   page = 1;
//   pageSize = 10;
//   collectionSize = 0;
//   constructor(private api: ApiService) { }
//   getAllInvoices() {
//     return this.api.getInvoicesList(this.page -1, this.pageSize).subscribe((response) => {
//       console.log(response);
//       this.invoices = response.content;
//       this.collectionSize = response.totalElements;
//     })
//   }
//   selectPage(page:string) {
//     this.page = parseInt(page, this.pageSize || 1);
//     this.getAllInvoices()
//   }
//   formatInput(input: HTMLInputElement) {
//     input.value = input.value.replace(FILTER_PAG_REGEX, '');
//   }

//   ngOnInit(): void {
//     this.getAllInvoices()
//   }

// }
