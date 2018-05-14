import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * @todo Add mat-error if first password is missing
 * @todo Add mat-error if passwords do not match
 */
@Component({
  selector: 'plateauxapp-password-with-confirmation',
  template: `
    <div [formGroup]="form">
      <div [formGroupName]="name">
        <mat-form-field>
          <input type="password" [formControlName]="fieldName1" matInput placeholder="Votre mot de passe" required autocomplete="off">
        </mat-form-field>
        <mat-form-field>
          <input type="password" [formControlName]="fieldName2" matInput placeholder="Confirmez-le" autocomplete="off">
        </mat-form-field>
        <p [hidden]="passwordMatching">Les mots de passe ne sont pas identiques</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordWithConfirmationComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() name = 'password';
  @Input() fieldName1 = 'password1';
  @Input() fieldName2 = 'password2';

  get passwordMatching() {
    return !(this.form.get(this.name) as FormGroup).hasError('passwordNotMatching');
  }

  ngOnInit() {

    (this.form.get(this.name) as FormGroup).setValidators([(group) => {

      const password1 = group.get(this.fieldName1) as FormControl;
      const password2 = group.get(this.fieldName2) as FormControl;

      return password1.value === password2.value ? null : { passwordNotMatching: true };

    }]);

  }

}
