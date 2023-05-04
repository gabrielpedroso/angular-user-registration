import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  addClient(data: IClient): Observable<IClient> {
    return this.http.post<IClient>('http://localhost:3000/clients', data);
  }

  fetch(): Observable<IClient[]> {
    return this.http.get<IClient[]>('http://localhost:3000/clients');
  }
}
