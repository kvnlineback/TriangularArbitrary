import { Identifiers } from '@angular/compiler';
import { User } from 'firebase';
import { Currency, UserAccountContext, UserAccountType } from '../Enums/Enums';

export class IUserModel {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
    isAuthenticated: boolean;
    accountType: UserAccountType;
    preferredCurrency: Currency;
    secret: string;
    confirmSecret: string;
    accountContext: UserAccountContext = UserAccountContext.create;
    createDate: Date;
    modifiedDate: Date;
    isSocialUser: boolean;

    constructor(id?: string, email?: string, firstName?: string, lastName?: string, photo?: string,
                accountType?: UserAccountType, preferredCurrency?: Currency, secret?: string,
                accountContext: UserAccountContext = UserAccountContext.create,
                createDate? : Date, modifiedDate?: Date, isSocialUser?: boolean){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.isAuthenticated = false;
        this.accountType = accountType;
        this.preferredCurrency = preferredCurrency;
        this.secret = secret;
        this.accountContext = accountContext;
        this.createDate = createDate;
        this.modifiedDate = modifiedDate;
        this.isSocialUser = isSocialUser;
    }

    //yep, intense level of security
    setAuthentication(status: boolean){
        this.isAuthenticated = status;
    }
}
