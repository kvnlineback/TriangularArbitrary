import { Injectable } from '@angular/core';

import { Currency, UserAccountType } from './../Enums/Enums';
import { IUserModel } from './../Models/IUserModel';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from '../../../node_modules/ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class AccountService {
  loggedIn: boolean;
  account: IUserModel;
  private authService: SocialAuthService;

  constructor(authService?: SocialAuthService, private router?: Router, private toastr?: ToastrService) {
    this.authService = authService;
    this.account = new IUserModel();
  }

  // +--------------------------------------+
  // |    Firebase methods begin            |
  // +--------------------------------------+

     public async getUserAccountByEmail(email: string, includeSecret: boolean = false): Promise<IUserModel>{

      var result = null;

      await firebase.firestore().collection('users')
      .where('email', '==', email)
      .get()
      .then(function(querySnapshot){

          if(querySnapshot.docs.length === 1 && querySnapshot != null){
            querySnapshot.docs.map(function(doc){

              //map into an IUserModel
              result = new IUserModel(
                doc.id,
                doc.data().email,
                doc.data().firstName,
                doc.data().lastName,
                null,
                doc.data().accountType,
                doc.data().preferredCurrency,
                includeSecret ? doc.data().secret : null,
                null
              );
              return result;
            });

          }else if(querySnapshot.docs.length > 1){
            throw new Error('More than 1 matching document');
          }else if (querySnapshot.empty){
            return result;
          };
        }, () => { throw new Error('An unexpected error ocurred during sign in'); });

      return result;
     }

     public async insertUserAccount(user: IUserModel): Promise<any>{

       //check that email is unique -- TODO: move to directive?
       var userCheck = await this.getUserAccountByEmail(user.email, false);
       if(userCheck != null && userCheck.email === user.email){
          throw new Error("Error creating new user account. Please try again.");
       }

        return firebase.firestore().collection('users').add({
          accountType: (user.accountType) ? user.accountType: UserAccountType.Undeclared,
          isSocialUser: user.isSocialUser,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          preferredCurrency: (user.preferredCurrency) ? user.preferredCurrency : Currency.Undeclared,
          secret: (user.isSocialUser) ? "xxsocialxx" : user.secret,
          createDate:  firebase.firestore.FieldValue.serverTimestamp(),
          modifiedDate:  firebase.firestore.FieldValue.serverTimestamp()
        }).catch((e) => {
          throw new Error('Error creating new user account');
        });

      }


     public async updateUserAccount(user: IUserModel): Promise<any>{

      var userCheck = await this.getUserAccountByEmail(user.email, false);

      if(userCheck == null){
        throw new Error("Account can't be updated. Call the police.")
      }else{

        return firebase.firestore().collection('users').doc(userCheck.id).update({
          accountType: (user.accountType) ? user.accountType: UserAccountType.Undeclared,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          preferredCurrency: (user.preferredCurrency) ? user.preferredCurrency : Currency.Undeclared,
          secret: (user.isSocialUser) ? "xxsocialxx" : user.secret,
          modifiedDate: firebase.firestore.FieldValue.serverTimestamp()

        }).catch((e) => {
          throw new Error('Error writing new ticket to database');
        });
      }

     }

     async deleteUserAccount(id: string): Promise<any> {
      try{
        // Delete Tickets for account
        var deleteTicketsSnapshot = firebase.firestore().collection('tickets').where('user', '==', this.account.email);

        await deleteTicketsSnapshot.get().then((docs) => {
          docs.forEach((doc) => firebase.firestore().collection('tickets').doc(doc.id).delete());
        })

        // Delete Favorites for account
        firebase.firestore().collection('favorites').doc(this.account.email).delete();

        // Delete Account
        return firebase.firestore().collection('users').doc(id).delete();
      }
      catch(e) {
        this.toastr.error('Error ocurred deleting user account')
      }
     }



  // +--------------------------------------+
  // |    Account methods begin             |
  // +--------------------------------------+

  //changed from type SocialUser to any user to accomodate email logins; could be problem if adding new providers that don't conform to standard interface
  public setUserAccount(user: any, isSocialUser?: boolean): void {
    if (user) {
      this.account.id = user.id;
      this.account.firstName = user.firstName;
      this.account.lastName = user.lastName;
      this.account.email = user.email;
      this.account.photo = user.photoUrl;
      this.account.accountType = (user.accountType) ? user.accountType: UserAccountType.Undeclared;
      this.account.isAuthenticated = true;
      this.account.preferredCurrency = (user.preferredCurrency) ? user.preferredCurrency : Currency.Undeclared;
      this.account.isSocialUser = isSocialUser;
      this.account.secret = user.secret;
    }
  }

  public getUserAccount(): IUserModel {
    return this.account;
  }

  public signOut(): void {

    // TODO: I think we are signing out even though we haven't signed a google social user in...
    // therefore, should only call this if account is a google account, otherwise... just wipe account and router back to login

    if (this.account.isSocialUser) {
      this.authService.signOut().then(() => this.account = new IUserModel());
    }
    else {
      this.account = new IUserModel();
    }
  }
}
