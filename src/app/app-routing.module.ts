import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { FattureClienteComponent } from './invoices/fatture-cliente/fatture-cliente.component';
import { InvoicesCreateComponent } from './invoices/invoices-create/invoices-create.component';
import { UserlistComponent } from './users/user-list/user-list.component';
import { ListcustomersComponent } from './customers/listcustomers/listcustomers.component';
import { CreateCustomersComponent } from './customers/create-customers/create-customers.component';
import { InvoicesListComponent } from './invoices/invoices-list/invoices-list.component';
import { InvoicesDetailComponent } from './invoices/invoices-detail/invoices-detail.component';
import { DetailcustomersComponent} from './customers/detailcustomers/detailcustomers.component'

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "user", component: UserlistComponent, canActivate:[AuthGuard]},
  {path: "customers", component: ListcustomersComponent, canActivate:[AuthGuard]},
  {path: "customers/create", component: CreateCustomersComponent, canActivate:[AuthGuard]},
  {path: "customers/:id", component: DetailcustomersComponent, canActivate:[AuthGuard]},
  {path: "invoices", component: InvoicesListComponent, canActivate:[AuthGuard]},
  {path: "invoices/create/:id", component: InvoicesCreateComponent, canActivate:[AuthGuard]},
  {path: "invoices/customers/:id", component: FattureClienteComponent, canActivate:[AuthGuard]},
  {path: "invoices/:id", component: InvoicesDetailComponent, canActivate:[AuthGuard]},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
