import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { IClient } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  displayedColumns = ['name', 'cpf', 'registrationDate', 'monthlyIncome'];
  clients$: Observable<IClient[]>;
  dataSource: MatTableDataSource<IClient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ClientService,
    public router: Router) {
    this.clients$ = this.service.fetch();
  }

  ngOnInit(): void {
    this.clients$.subscribe((result: IClient[]) => {
      this.dataSource = new MatTableDataSource<IClient>(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToDetail(id: string) {
    this.router.navigate([`editar-cliente/${id}`]);
  }
}
