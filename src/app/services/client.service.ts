import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) { }

  addClient(data: IClient): Observable<IClient> {
    return this.http.post<IClient>(`${this.baseUrl}`, data);
  }

  fetch(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.baseUrl}?id=${id}`);

  }

  update(data: IClient): Observable<IClient> {
    return this.http.put<IClient>(`${this.baseUrl}/${data.id}`, data);
  }
}
