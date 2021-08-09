import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-create-customers',
  templateUrl: './create-customers.component.html',
  styleUrls: ['./create-customers.component.css']
})
export class CreateCustomersComponent implements OnInit {

  form: FormGroup;
  id:any;
  customer:any;
  listacomuni:any[];
  tipicliente:any[]
  showform:boolean = false;

  constructor(private router: Router, private route:ActivatedRoute, private api:ApiService, private fb: FormBuilder) { }

  inizializzaForm(){
    this.form = this.fb.group({
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
  }
    aggiungi(form){
      this.listacomuni.forEach(item=>{
        if(item.id === form.value.indirizzoSedeOperativa.comune.id) {
          form.value.indirizzoSedeOperativa.comune = item
        }
        if(item.id === form.value.indirizzoSedeLegale.comune.id) {
          form.value.indirizzoSedeLegale.comune = item
        }
      })
      this.api.newCustomer(form.value).subscribe(   //.value e non tutto il form
         data => {
         console.log(data);
       })

    }
    ngOnInit(): void {
      const routeParams = this.route.snapshot.paramMap;
      this.id = Number(routeParams.get('id'));
      this.api.getComuni().subscribe( data =>{
        this.listacomuni = data.content
      })
      this.api.getTipicliente().subscribe(
        data=>{
          this.tipicliente = data
        }
      )
      this.inizializzaForm();
      this.showform = true;

    }

}
