import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { ClientService } from 'src/app/services/client.service';
import { Validation } from 'src/app/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  id: string;
  isAddMode: boolean;

  constructor(
    private service: ClientService,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])),
      cpf: new FormControl({ value: '', disabled: !this.isAddMode }, Validators.compose([
        Validators.required,
        Validation.ValidateCpf,
      ])),
      dateOfBirth: new FormControl('', Validators.compose([
        Validators.required,
        Validation.Over18yearsOld,
        Validation.LessThan60yearsOld,
      ])),
      monthlyIncome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      registrationDate: new FormControl(new Date().toLocaleDateString('pt-Br')),
    });

    if (!this.isAddMode) {
      this.service.getById(this.id)
          .pipe(first())
          .subscribe(x => {
            const client = x.shift();
            this.userForm.patchValue({
              id: client?.id,
              name: client?.name,
              cpf: client?.cpf,
              dateOfBirth: client?.dateOfBirth,
              monthlyIncome: client?.monthlyIncome,
              email: client?.email,
            });
          });
    }
  }

  get name() {
    return this.userForm.get('name')!;
  }

  get cpf() {
    return this.userForm.get('cpf')!;
  }

  submit() {
    if (this.userForm.invalid) return;

    if (this.isAddMode) {
      this.service.addClient(this.userForm.value).subscribe({
        next: (val: any) => {
          console.log('Client added successfully');
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.service.update(this.userForm.getRawValue()).subscribe({
        next: (val: any) => {
          console.log('Client added successfully');
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    this.goToClientList();
  } 

  backToList() {
    this.goToClientList();
  }

  goToClientList() {
    this.router.navigate(['lista-clientes']);
  }
}
