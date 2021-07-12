import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  durations = [
    "1 week",
    "1 month",
    "6 months",
    "1 year"
  ]

  price: number = 0;

  // 1 week = 4 lv
  // 1 month = 8 lv
  // 6 months = 15 lv
  // 1 year = 25 lv 
  // year (14-18 || >60w || >65m) -> price /= 2

  submitData() {
    console.log('Submit works')
  }

  ticketForm = this.fb.group({
    profile: this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      idCardNumber: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
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
      type: ['', Validators.required]
    })
  });



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.ticketForm.controls['ticket'].valueChanges.subscribe((value) => { console.log(value.duration) });

    //this.ticketForm.controls['ticket'].value.duration;

    this.ticketForm.controls['ticket'].valueChanges.subscribe((value) => { this.price = (this.calcTicket()) });

    // this.ticketForm.controls['ticket'].valueChanges.subscribe(console.log)
    // this.ticketForm.valueChanges.subscribe()

    //this.ticketForm.controls['ticket'].value.duration.valueChanges  .subscribe(console.log);

  }

  // calcTicket(price: number, duration: string, type: string) {
  //   price = this.calcByDuration(duration);
  //   price = this.calcByType(type,this.ticketForm.controls['ticket'].value.age,"male");
  //   return price;
  // }

  calcTicket() {
    let duration: string = this.ticketForm.controls['ticket'].value.duration;
    let type: string = this.ticketForm.controls['ticket'].value.type;
    let age: number = this.ticketForm.controls['ticket'].value.age;
    let gender: string = this.ticketForm.controls['ticket'].value.gender;

    this.price = this.calcByDuration(duration);
    this.price = this.calcByType(type, age, gender);
    return this.price;
  }

  calcByDuration(duration: string) {
    return (duration === "1 month") ? 8 : (duration === "1 week") ? 4 : (duration === "6 months") ? 15 : (duration === "1 year") ? 25 : 0;
  }
  calcByType(type: string, age: number, gender: string) {
    return (age >= 14 && age <= 18 && type === "child") || (age >= 60 && gender === "male" && type === "retired" || age >= 65 && gender === "female" && type === "retired") ? this.price /= 2 : this.price = this.price;
  }

}
