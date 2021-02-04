import { AdminAuthGuard } from './auth/admin-auth.guard';
import { AuthGuard } from './auth/auth.guard';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopTenComponent } from './top-ten/top-ten.component';
import { ConversionComponent } from './conversion/conversion.component';
import { AdminAccountManagementComponent } from './admin-account-management/admin-account-management.component';
import {SearchComponent } from './search/search.component';
import {FavoritesComponent } from './favorites/favorites.component';
import { LoginComponent } from './login/login.component';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'favorites', pathMatch: 'full'},
  { path: 'create-ticket', component: CreateTicketComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'conversion', component: ConversionComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminAccountManagementComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'top-ten', component: TopTenComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user-account', component: UserAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
