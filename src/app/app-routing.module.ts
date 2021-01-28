import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthGuard } from './helperclases/auth.guard';
import { HomeComponent } from './home/home.component';
import { MakeTransactionComponent } from './make-transaction/make-transaction.component';
import { ShowTransactionComponent } from './show-transaction/show-transaction.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newUser', component: CreateUserComponent  },
  { path: 'users', component: ViewUserComponent  },
  { path: 'transactions', component: MakeTransactionComponent },
  { path: 'listTransactions', component: ShowTransactionComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '**', redirectTo: '' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
