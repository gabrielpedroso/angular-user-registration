import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

import { ClientService } from 'src/app/services/client.service';

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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl({ value: '', disabled: !this.isAddMode }, [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      monthlyIncome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
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
  } 

  backToList() {
    console.log('Voltou');
  }
}
