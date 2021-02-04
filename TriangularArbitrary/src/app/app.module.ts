import { TicketStorageService } from './Services/ticket-storage.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { AdminAccountManagementComponent } from './admin-account-management/admin-account-management.component';
import { ConversionComponent } from './conversion/conversion.component';
import { TopTenComponent } from './top-ten/top-ten.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { DupeCheckDirective } from './directives/dupe-check.directive';
import { LoginComponent } from './login/login.component';
import { MustMatchDirective } from './directives/must-match.directive';
import { environment } from 'src/environments/environment';
import { FavoritesStorageService } from './Services/favorites-storage.service';
import { AlphaVantageService } from './Services/alpha-vantage.service';
import { CryptoAssetService } from './Services/crypto-asset.service';
import { AccountService } from './Services/account.service';
import { YahooFinanceService } from './Services/yahoo-finance.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CreateTicketComponent,
    AdminAccountManagementComponent,
    SearchComponent,
    FavoritesComponent,
    ConversionComponent,
    TopTenComponent,
    UserAccountComponent,
    LoginComponent,
    DupeCheckDirective,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    NgbModalModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    TicketStorageService,
    ToastrService,
    NgbModalModule,
    FavoritesStorageService,
    AccountService,
    AlphaVantageService,
    CryptoAssetService,
    YahooFinanceService,
    environment.socialAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
