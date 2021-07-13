import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { Ticket } from '../Ticket'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:5000/formData'

  constructor(private http: HttpClient) { }

  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket, httpOptions);
  }
}
