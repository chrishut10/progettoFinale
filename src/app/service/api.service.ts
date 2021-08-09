import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiPath = environment.apiPath;

  constructor(private http: HttpClient) { }

  getUserlist(page, size){
    return this.http.get<any>(this.apiPath + 'users?page='+ page+'&size=' + size);
  }
  getCustomersList(page, size) {
    return this.http.get<any>(this.apiPath + 'clienti?page='+ page+'&size=' + size);
  }
  getInvoicesList(page, size) {
    return this.http.get<any>(this.apiPath + 'fatture?page='+ page+'&size=' + size);
  }
  getInvoice(id:any){
    return this.http.get<any>(this.apiPath + 'fatture/' +id);

  }
  getCustomer(id:any){
    return this.http.get<any>(this.apiPath + 'clienti/' +id);
  }
  updateCustomer(id:any, customer){
    return this.http.put<any>(this.apiPath + 'clienti/' +id, customer);
  }
  updateInvoice(id:any, invoice){
    return this.http.put<any>(this.apiPath + 'fatture/' +id, invoice);
  }
  // newCustomer(id:any, customer){
  //   return this.http.post<any>(this.apiPath + 'clienti/' +id, customer);
  // }
  newCustomer(customer){
    return this.http.post<any>(this.apiPath + 'clienti', customer);
  }
  getInvoicesUserList(page, size, id,sort){
    return this.http.get<any>(this.apiPath + 'fatture/cliente/' + id+'?page='+page+'&size' + size +'&sort=' + sort);
  }
  getComuni(){
    return this.http.get<any>(this.apiPath + 'comuni')
  }
  getTipicliente(){
    return this.http.get<any>(this.apiPath + 'clienti/tipicliente')
  }
  newInvoice(invoice){
    return this.http.post<any>(this.apiPath+ 'fatture',invoice)
  }
  deleteInvoice(id){
    return this.http.delete<any>(this.apiPath+ 'fatture/' + id)
  }

}
