import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-invoices-detail',
  templateUrl: './invoices-detail.component.html',
  styleUrls: ['./invoices-detail.component.css']
})
export class InvoicesDetailComponent implements OnInit {
  [x: string]: any;
  id:any;
  invoice:any;
  showForm:boolean = false;
  constructor(private router: Router, private api: ApiService,private route: ActivatedRoute,private fb: FormBuilder) { }
  fattura= this.fb.group({
    data:[''],
    numero:[''],
    anno:[''],
    importo:[''],
    stato: this.fb.group({
      id:[''],
        nome:['']
    }),
    cliente: this.fb.group({
      id:['']
    })
  })
  updateF(invoice){
    this.api.updateInvoice(this.id,invoice.value).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/invoices'])
    })
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.fattura.value);
  }

  ngOnInit(): void {
    const routeParams= this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));

    this.api.getInvoice(this.id).subscribe(
      (response:any)=>{
        console.log(response);
        if(response){
          this.invoice = response
          this.invoice.data = this.invoice.data.substring(0,10)
          console.log(response);
          let newInvoice = {
            'data': this.invoice.data,
            'numero': this.invoice.numero,
            'anno': this.invoice.anno,
            'importo': this.invoice.importo,
            'stato': {
              'id': this.invoice.stato.id,
              'nome': this.invoice.stato.nome
            },
            'cliente':{
              'id':this.invoice.cliente.id
            }
          }
          this.fattura.setValue(newInvoice)
          this.showForm = true
        } else {
          setTimeout(()=>{
            this.router.navigate(['/'])
          },1000)
        }
      }
    )
  }

}
