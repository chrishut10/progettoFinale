import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { DetailcustomersComponent } from './customers/detailcustomers/detailcustomers.component';
import { ListcustomersComponent } from './customers/listcustomers/listcustomers.component';
import { CreateCustomersComponent } from './customers/create-customers/create-customers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { UserlistComponent } from './users/user-list/user-list.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { EpicInterceptor } from './service/epic.interceptor';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoicesListComponent } from './invoices/invoices-list/invoices-list.component';
import { InvoicesDetailComponent } from './invoices/invoices-detail/invoices-detail.component';
import { FattureClienteComponent, NgbdSortableHeader } from './invoices/fatture-cliente/fatture-cliente.component';
import { InvoicesCreateComponent } from './invoices/invoices-create/invoices-create.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CustomersComponent,
    DetailcustomersComponent,
    ListcustomersComponent,
    CreateCustomersComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignupComponent,
    UserlistComponent,
    HeaderComponent,
    FooterComponent,
    InvoicesListComponent,
    InvoicesDetailComponent,
    InvoicesCreateComponent,
    FattureClienteComponent,
    NgbdSortableHeader

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: EpicInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
