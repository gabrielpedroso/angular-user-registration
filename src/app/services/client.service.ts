import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  addClient(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/clients', data);
  }
}
