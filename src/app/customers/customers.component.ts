import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
