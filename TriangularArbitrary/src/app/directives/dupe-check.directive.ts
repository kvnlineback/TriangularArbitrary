import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

import { MustNotMatch } from './mustNotMatch';

@Directive({
  selector: '[mustNotMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DupeCheckDirective, multi: true }]
})
export class DupeCheckDirective {
  @Input('mustNotMatch') mustNotMatch: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors {
      return MustNotMatch(this.mustNotMatch[0], this.mustNotMatch[1])(formGroup);
  }

}
