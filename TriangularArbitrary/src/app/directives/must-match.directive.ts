import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup, Form } from '@angular/forms';

@Directive({
  selector: '[mustMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true }]
})
export class MustMatchDirective {

  @Input('mustMatch') mustMatch: string[] = [];

  validate(formGroup: FormGroup) : ValidationErrors {

    const password = formGroup.controls[this.mustMatch[0]];
    const confirmPassword = formGroup.controls[this.mustMatch[1]];

    if(!password || ! confirmPassword || !this.mustMatch){
      return null;
    }

    if(confirmPassword.errors && !confirmPassword.errors.mustMatch){
      return null;
    }

    if(password.value != confirmPassword.value){
      confirmPassword.setErrors({mustMatch: true});
    }else{
      confirmPassword.setErrors(null);
    }

  }

}
