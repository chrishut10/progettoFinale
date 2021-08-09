import { Component, OnInit,Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

interface fattureClienti {
  id: number;
  numero:any;
  anno:any;
}

export type SortColumn = keyof fattureClienti | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

//const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;  //serve per dati in formato statico, non per chiamate API

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

const FILTER_PAG_REGEX = /[^0-9]/g;

@Directive({                                            // da qui a riga 42: direttiva
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {   // importare nel rispettivo component in app.module.ts

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
@Component({
  selector: 'app-fatture-cliente',
  templateUrl: './fatture-cliente.component.html',
  styleUrls: ['./fatture-cliente.component.css']
})
export class FattureClienteComponent implements OnInit {

  invoices:any [] =[]
  message: string;
  errors= false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  id:any;
  sort:any='id';
  order:any='ASC'

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>; // figli del componente - da studiare

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }
  getAllInvoices() {
    return this.api.getInvoicesUserList(this.page -1, this.pageSize, this.id, this.sort+ ',' +this.order).subscribe((response) => {
      console.log(response);
      this.invoices = response.content;
      this.collectionSize = response.totalElements;
    },
    (error: any) => {
      console.log('Errore dal component', error.message);
      this.errors = true;
      this.message = 'Ooops, qualcosa è andato storto!'
      setTimeout(()=> this.router.navigate(['/']), 5000)
    });
  }
  selectPage(page:string) {
    this.page = parseInt(page, this.pageSize || 1);
    this.getAllInvoices()
  }
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
  viewInvoiceDetail(id) {
    this.router.navigate(['invoices/', id])
  }
  ngOnInit(): void {
    const routeParams= this.route.snapshot.paramMap;
    this.id =  Number(routeParams.get('id'));

    this.getAllInvoices()
  }
  
  onSort({column, direction}: SortEvent) {
    console.log('ciaoooooooooooooooooooo');
          // resetting other headers
        this.headers.forEach(header => {
          if (header.sortable !== column) {
            header.direction = '';
          }
        });
        // sorting countries
        if (direction === '' || column === '') {
          console.log(column, direction);
          this.order = 'ASC';
          this.sort = 'id';
          //this.countries = COUNTRIES;
        }  else {
          console.log(direction, column);
          this.order = direction.toUpperCase();
          this.sort = column;
          console.log(this.order, this.sort);

          //this.countries = [...COUNTRIES].sort((a, b) => {
            //const res = compare(a[column], b[column]);
            //return direction === 'asc' ? res : -res;
          };
          this.getAllInvoices();
        }


}
