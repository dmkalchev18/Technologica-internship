import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TicketService } from './services/ticket.service';
import { Ticket } from './Ticket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

tickets: Ticket[] = [];

constructor(private ticketService: TicketService) {}

  addTicket(ticket:Ticket) {
   this.ticketService.addTicket(ticket).subscribe((ticket)=>(this.tickets.push(ticket)))
  }
}
