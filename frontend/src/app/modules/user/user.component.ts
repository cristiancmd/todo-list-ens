import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  credentials: FormGroup
  submited = false;
  wrongCredentials = false;
  private session = false;

  constructor(
    private form: FormBuilder,
    private router: Router,
    private _userSvc: UserService
  ) {
    this.credentials = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  getSession(): boolean {
    if (this.session) return true;
    return false;
  }



  login() {
    this.submited = true
    if (this.credentials.invalid) {
      return;
    }
    const cred: any = {
      username: this.credentials.value.username,
      password: this.credentials.value.password
    }
    const data = this._userSvc.login(cred)
    if (!data) {
      this.wrongCredentials = true;
      this.credentials.reset()
    } else {
      this.wrongCredentials = false;
      this._userSvc.saveSessionData(data);
      this.session = true;
      this.router.navigate(['/home']);
    }

  }



}
