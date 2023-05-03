import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private service: ClientService) { }

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

    this.service.addClient(this.userForm.value).subscribe({
      next: (val: any) => {
        console.log('Client added successfully');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
