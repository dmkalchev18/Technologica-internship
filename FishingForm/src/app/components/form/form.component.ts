import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Ticket } from 'src/app/Ticket';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  @Output() onAddTicket: EventEmitter<Ticket> = new EventEmitter()

  durations = [
    "1 week",
    "1 month",
    "6 months",
    "1 year"
  ]

  types = [
    "Child",
    "Standart",
    "Retired"
  ]

  price: number = 0;

  // 1 week = 4 lv
  // 1 month = 8 lv
  // 6 months = 15 lv
  // 1 year = 25 lv 
  // year (14-18 || >=60w || >=65m) -> price /= 2

  onSubmit() {
    const newTicket = this.ticketForm.value;
    this.onAddTicket.emit(newTicket)
  }

  submitData() {
  }

  ticketForm = this.fb.group({
    profile: this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      idCardNumber: ['', Validators.required],
      identificationNumber: ['', Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        country: ['', Validators.required],
        area: ['', Validators.required],
        municipality: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
      }),
    }),
    ticket: this.fb.group({
      duration: ['', Validators.required],
      type: ['', Validators.required],
      price: this.price
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.ticketForm.controls['ticket'].valueChanges.subscribe((value) => { this.price = (this.calcTicket()) });

  }

  calcTicket() {
    let duration: string = this.ticketForm.controls['ticket'].value.duration;
    let type: string = this.ticketForm.controls['ticket'].value.type; 

    // console.log((this.ticketForm.controls['profile'] as FormGroup).controls['firstName'].hasError('required'));
    console.log(this.ticketForm.get('profile.firstName')?.hasError('required'));

    this.price = this.calcByDuration(duration);
    this.price = this.calcByType(type);
    return this.price;
  }

  calcByDuration(duration: string) {
    return (duration === "1 week") ? 4 : (duration === "1 month") ? 8 : (duration === "6 months") ? 15 : (duration === "1 year") ? 25 : 0;
  }
  calcByType(type: string) {
    return (type === "Child"|| type === "Retired")  ? this.price /= 2 : this.price = this.price;
  }

}
