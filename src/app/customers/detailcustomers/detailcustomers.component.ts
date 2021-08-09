import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute,Router} from '@angular/router';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-detailcustomers',
  templateUrl: './detailcustomers.component.html',
  styleUrls: ['./detailcustomers.component.css']
})
export class DetailcustomersComponent implements OnInit {
  [x: string]: any;
  customer:any;
  id:any;
  listacomuni:any[];
  tipicliente:any[]

  constructor(private router: Router, private api: ApiService,private route: ActivatedRoute, private fb: FormBuilder) { }
  clienti = this.fb.group({
    ragioneSociale: [''],
    partitaIva: [''],
    tipoCliente:[''],
    email: [''],
    pec: [''],
    telefono: [''],
    nomeContatto: [''],
    cognomeContatto: [''],
    telefonoContatto:[''],
    emailContatto: [''],
    indirizzoSedeOperativa: this.fb.group({
      id: [''],
      via: [''],
      civico: [''],
      cap: [''],
      localita: [''],
      comune: this.fb.group({
        id: [''],
        nome: [''],
        provincia: this.fb.group({
          id:[''],
          nome: [''],
          sigla: ['']
        }),
      }),
    }),
    indirizzoSedeLegale: this.fb.group({
      id: [''],
      via: [''],
      civico: [''],
      cap: [''],
      localita:[''],
      comune:  this.fb.group({
        id: [''],
        nome: [''],
        provincia: this.fb.group({
          id:[''],
          nome: [''],
          sigla: ['']
        }),
      }),
    }),
    dataInserimento: [''],
    dataUltimoContatto: [''],
    fatturatoAnnuale: ['']
  })
  Update(customer) {
    this.listacomuni.forEach(item=>{
      if(item.id === customer.value.indirizzoSedeOperativa.comune.id) {
        customer.value.indirizzoSedeOperativa.comune = item
      }
      if(item.id === customer.value.indirizzoSedeLegale.comune.id) {
        customer.value.indirizzoSedeOperativa.comune = item
      }
    })
    this.api.updateCustomer(this.id,customer.value).subscribe((data)=>{
    console.log(data);
    this.router.navigate(['/customer'])
    })
  }

  ngOnInit(): void {
    const routeParams= this.route.snapshot.paramMap;
    this.id =  Number(routeParams.get('id'));

    this.api.getCustomer(this.id).subscribe(
      (response:any)=>{
        console.log(response);
        if(response){
          this.customer = response
          this.api.getComuni().subscribe( data =>{
            this.listacomuni = data.content
          })
          this.api.getTipicliente().subscribe(
            data=>{
              this.tipicliente = data
            }
          )
          console.log(response);
          delete this.customer.id
          this.clienti.setValue(this.customer)
        } else {
          setTimeout(()=>{
            this.router.navigate(['/'])
          },1000)
        }
      }
    )
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.clienti.value);
  }

}
