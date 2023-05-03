import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      monthlyIncome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.userForm.get('name')!;
  }

  get cpf() {
    return this.userForm.get('cpf')!;
  }

  submit() {
    if (this.userForm.invalid) return;

    console.log(this.userForm.value);
  }
}
